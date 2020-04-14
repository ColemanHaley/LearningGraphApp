import os
from gensim import corpora, models
import ground_truth
from collections import defaultdict

import spacy
import math
import pickle

from nltk.corpus import stopwords
import nltk
from gensim.corpora import Dictionary
from gensim.models.ldamodel import LdaModel



nltk.download("wordnet")
nltk.download("stopwords")

stopwords.words("english").extend(["one", "would", "said", "man"])
stoplist = stopwords.words("english")
nlp = spacy.load("en_core_web_sm")  # use list made by NLTK ppls

labels = ["dependency_parsing.txt", "language_modelling.txt", "machine_translation.txt", "neural_nets.txt", "vector_semantics.txt"]

lmbda = 0.0001
def process(docs):
    processed_docs = []
    # print('Processing docs')
    # print(docs)
    for doc in nlp.pipe(docs, n_threads=32, batch_size=100):
        ents = doc.ents  # Named entities.
        doc = [token.lemma_ for token in doc if token.is_alpha and not token.is_stop]
        doc.extend([str(entity) for entity in ents if len(entity) > 1])
        processed_docs.append(doc)

    docs = processed_docs

    # import string
    #
    # docs = [
    #     [
    #         w
    #         for w in d.translate(str.maketrans("", "", string.punctuation)).split()
    #         if w not in stoplist
    #     ]
    #     for d in docs
    # ]

    from nltk.stem import WordNetLemmatizer

    lemmatizer = WordNetLemmatizer()
    docs = [[lemmatizer.lemmatize(w) for w in d] for d in docs]
    return docs


def build_model(num_models):
    print('Building model', flush=True)
    # class GutenbergCorpusBOW(object):
    #     def __iter__(self):
    #         for document in os.listdir('Gutenberg/txt'):
    #             splitdoc = []
    #             for line in open('Gutenberg/txt/' + document):
    #                 splitdoc.extend(line.lower().split())
    #             yield dictionary.doc2bow(splitdoc)
    #     def __len__(self):
    #         return len(os.listdir('Gutenberg/txt'))

    docs = []
    for file in os.listdir("resources/"):
        with open("resources/" + file, encoding='utf8') as doc:
            try:
                txt = doc.read()
            except:
                continue
        docs.append(txt)
    docs = process(docs)
    dictionary = Dictionary(docs)

    # Remove rare and common tokens.
    # Filter out words that occur too frequently or too rarely.
    max_freq = 0.5
    min_wordcount = 2
    dictionary.filter_extremes(no_below=min_wordcount, no_above=max_freq)
    # print(dictionary)
    # _ = dictionary[0]  # This sort of "initializes" dictionary.id2token.

    corpus = [dictionary.doc2bow(doc) for doc in docs]
    models = []
    for i in range(num_models):
        lda = LdaModel(corpus, num_topics=5)
        models.append(lda)
    
    with open("topic_models_mdl.pkl", "wb") as mfile:
        print("Writing topic_models_mdl.pkl", flush=True)
        pickle.dump((models, dictionary), mfile)


    # annotated questions
    # for assignment, questions in ground_truth.items():
    #     if assignment = "a2": # hold out assignment 2
    #         continue
    #     for q, labels in question.items():
    #         for label in labels:
    #             if label is not in p_class:
    #                 p_class[label] = {}
    #                 p_label[label] = 1
    #             else:
    #                 p_label[label] += 1
    #             if assignment not in observations[label]:
    #                 observations[label][assignment] = {}
    #             observations[label][assignment][q] = 1
    #             with open("../questions/"+assignment+"/"+q + ".txt") as q_file:
    #                 q_txt = q_file.read()
    #                 q_txt = process([q_txt])
    #                 for i, lda in enumerate(models):
    #                     if i not in p_class[label]:
    #                         p_class[label][i] = [[],[],[],[],[]]
    #                     theta = lda[dictionary.doc2bow(q_txt[0])]
    #                     for j, feature in enumerate(theta):
    #                         p_class[label][i][j].append(feature)

    # topics labelled
def predict(txt, models, dictionary, p_class, p_label):
    Z = sum([val for _, val in p_label.items()])
    txt = process([txt])
    results = {label: 0 for label in labels}
    for label in labels:
        for i, lda in enumerate(models):
            theta = lda[dictionary.doc2bow(txt[0])]
            for j, feature in theta:
                results[label] = feature * ((sum(p_class[label][i][j]) + lmbda) / (p_label[label]+10*lmbda)) * (p_label[label]/Z)
    norm = sum(results.values())
    results = {label: val/norm for label, val in results.items()}
    return results

def bayes_EM(models, dictionary):
    p_class = {}
    labels = ["dependency_parsing.txt", "language_modelling.txt", "machine_translation.txt", "neural_nets.txt", "vector_semantics.txt"]
    p_label = {}
    observations = {label: {} for label in labels}
    print('Building Bayes model', flush=True)
    for label in labels:
        with open("topics/"+label, encoding='utf8') as doc:
            try:
                txt = doc.read()
            except:
                continue
            if label not in p_class:
                p_class[label] = {}
                p_label[label] = 1
            else:
                p_label[label] += 1
            if "topics" not in observations[label]:
                observations[label]["topics"] = {}
            observations[label]["topics"][label] = 1
            txt = process([txt])
            for i, lda in enumerate(models):
                print(i, flush=True)
                if i not in p_class[label]:
                    p_class[label][i] = [[],[],[],[],[]]
                theta = lda[dictionary.doc2bow(txt[0])]
                for j, feature in theta:
                        p_class[label][i][j].append(feature)
    lmbda = 0.0001

    Z = sum([val for _, val in p_label.items()])
    for label, ms in p_class.items():
        for i, topics in enumerate(ms):
            for j in range(5):
                p_class[label][i][j] = [((sum(p_class[label][i][j]) + lmbda) / (p_label[label]+(10*lmbda))) * (p_label[label]/Z) / 2]

    # expectation maximization
    epochs = 10
    for label in labels:
        observations[label]["resources"] = {}
    for e in range(epochs):
        i = -1
        # expectation
        print("Expectation epoch "+str(e), flush=True)
        Z = sum([val for _, val in p_label.items()])
        for file in os.listdir("resources/"):
            with open("resources/" + file, encoding='utf8') as doc:
                try:
                    txt = doc.read()
                    i += 1
                except:
                    continue
                results = predict(txt, models, dictionary, p_class, p_label)
                for label in labels:
                    observations[label]["resources"][file] = results[label]
        # maximization
        # print(observations)
        print("Maximization epoch"+str(e), flush=True)
        for file in os.listdir("resources/"):
            with open("resources/" + file, encoding='utf8') as doc:
                try:
                    txt = doc.read()
                except:
                    continue
                txt = process([txt])
                for label in labels:
                    if label not in p_class:
                        p_class[label] = {}
                        p_label[label] = observations[label]["resources"][file]
                    else:
                        p_label[label] += observations[label]["resources"][file]
                    for i, lda in enumerate(models):
                        if i not in p_class[label]:
                            p_class[label][i] = [[],[],[],[],[]]
                        theta = lda[dictionary.doc2bow(txt[0])]
                        for j, feature in theta:
                            p_class[label][i][j].append(feature*observations[label]["resources"][file])
        #print(observations)
    with open("classifier.pkl", "wb") as mfile:
        pickle.dump((p_class, p_label), mfile)


def evaluate_bayes(num_lda_models):
    #try:
    #    with open("topic_models.pkl", "rb") as f:
    #        models, dictionary = pickle.load(f)
    #except:
    print('In evaluate bayes: model not found. Building it.', flush=True)
    build_model(num_lda_models)
    with open("topic_models_mdl.pkl", "rb") as f:
        models, dictionary = pickle.load(f)
    try:
        with open("classifier.pkl", "rb") as f:
            p_class, p_label = pickle.load(f)
    except:
        print('In evaluate bayes: classifier not found. Building it', flush=True)
        bayes_EM(models, dictionary)
        with open("classifier.pkl", "rb") as f:
            p_class, p_label = pickle.load(f)
    tp = defaultdict(int)
    fp = defaultdict(int)
    tn = defaultdict(int)
    fn = defaultdict(int)
    for assignment, questions in ground_truth.get_groundTruth().items():
        for question, ground in questions.items():
            with open('questions/' + assignment + "/" + question, encoding='utf8') as f:
                try:
                    txt = f.read()
                except:
                    continue
                results = predict(txt, models, dictionary, p_class, p_label)
                tops = sorted(results, key=results.get, reverse=True)[:len(ground)]
                for label in labels:
                    if label in tops and label in ground:
                        tp[label] += 1
                    elif label in tops and label not in ground:
                        fp[label] += 1
                    elif label in ground and label not in tops:
                        fn[label] += 1
                    else:
                        tn[label] += 1

    precision_dict = defaultdict(int)
    recall_dict = defaultdict(int)
    f1_dict = defaultdict(int)
    for label in labels:
        if tp[label] == 0:
            print(label, flush=True)
            continue
        precision_dict[label] = tp[label] / (fp[label]+tp[label])
        recall_dict[label] = tp[label] / (fn[label]+tp[label])
        f1_dict[label] = 2 * (precision_dict[label] * recall_dict[label]) / (precision_dict[label] + recall_dict[label])

    macro_precision = sum(precision_dict.values()) / 5
    macro_recall = sum(recall_dict.values()) / 5
    macro_f1 = sum(f1_dict.values()) / 5
    micro_precision = sum(tp.values()) / (sum(tp.values()) + sum(fp.values()))
    micro_recall = sum(tp.values()) / (sum(tp.values()) + sum(fn.values()))
    micro_f1 = 2 * (micro_precision * micro_recall) / (micro_recall + micro_precision)

    print("### PER-CLASS METRICS ###", flush=True)
    print("PRECIS  RECALL  F1    ", flush=True)
    for label in labels:
        print(f"{precision_dict[label]:6.4f}  {recall_dict[label]:6.4f}  {f1_dict[label]:6.4f}  {label.upper()}", flush=True)

    print()
    print("### AVERAGED METRICS ###", flush=True)
    print()
    print("MICRO AVERAGED", flush=True)
    print("PRECIS  RECALL  F1    ", flush=True)
    print(f"{micro_precision:6.4f}  {micro_recall:6.4f}  {micro_f1:6.4f}", flush=True)
    print()
    print("MACRO AVERAGED", flush=True)
    print("PRECIS  RECALL  F1    ", flush=True)
    print(f"{macro_precision:6.4f}  {macro_recall:6.4f}  {macro_f1:6.4f}", flush=True)

def evaluate_baseline(num_lda_models):
    #try:
        #with open("topic_models.pkl", "rb") as f:
        #    models, dictionary = pickle.load(f)
    #except:
    print('In evaluate baseline: model not found. Building it.', flush=True)
    build_model(num_lda_models)
    with open("topic_models_mdl.pkl", "rb") as f:
        models, dictionary = pickle.load(f)
    try:
        with open("classifier.pkl", "rb") as f:
            p_class, p_label = pickle.load(f)
    except:
        bayes_EM(models, dictionary)
    tp = defaultdict(int)
    fp = defaultdict(int)
    tn = defaultdict(int)
    fn = defaultdict(int)
    for assignment, questions in ground_truth.get_groundTruth().items():
        for question, ground in questions.items():
            with open('questions/' + assignment + "/" + question, encoding='utf8') as f:
                try:
                    txt1 = f.read()
                except:
                    continue
                txt1 = process([txt1])
                results = {}
                for file in os.listdir("topics/"):
                    with open("topics/" + file, encoding='utf8') as doc2:
                        txt = doc2.read()
                        # print("hey")
                        txt = process([txt])
                        # print(txt)
                        # print("ho")
                        kl = 0
                        for lda in models:
                            p = lda[dictionary.doc2bow(txt1[0])]
                            # print(p)
                            q = lda[dictionary.doc2bow(txt[0])]
                            # print(q)
                            for y, w1 in p:
                                for x, w0 in q:
                                    if x == y:
                                        kl += w0 * w1
                        results[file] = kl
                tops = sorted(results, key=results.get, reverse=True)[:len(ground)]
                for label in labels:
                    if label in tops and label in ground:
                        tp[label] += 1
                    elif label in tops and label not in ground:
                        fp[label] += 1
                    elif label in ground and label not in tops:
                        fn[label] += 1
                    else:
                        tn[label] += 1

    precision_dict = defaultdict(int)
    recall_dict = defaultdict(int)
    f1_dict = defaultdict(int)
    for label in labels:
        if tp[label] == 0:
            print(label, flush=True)
            continue
        precision_dict[label] = tp[label] / (fp[label]+tp[label])
        recall_dict[label] = tp[label] / (fn[label]+tp[label])
        f1_dict[label] = 2 * (precision_dict[label] * recall_dict[label]) / (precision_dict[label] + recall_dict[label])

    macro_precision = sum(precision_dict.values()) / 5
    macro_recall = sum(recall_dict.values()) / 5
    macro_f1 = sum(f1_dict.values()) / 5
    micro_precision = sum(tp.values()) / (sum(tp.values()) + sum(fp.values()))
    micro_recall = sum(tp.values()) / (sum(tp.values()) + sum(fn.values()))
    micro_f1 = 2 * (micro_precision * micro_recall) / (micro_recall + micro_precision)

    print("### PER-CLASS METRICS ###", flush=True)
    print("PRECIS  RECALL  F1    ", flush=True)
    for label in labels:
        print(f"{precision_dict[label]:6.4f}  {recall_dict[label]:6.4f}  {f1_dict[label]:6.4f}  {label.upper()}", flush=True)

    print()
    print("### AVERAGED METRICS ###", flush=True)
    print()
    print("MICRO AVERAGED", flush=True)
    print("PRECIS  RECALL  F1    ", flush=True)
    print(f"{micro_precision:6.4f}  {micro_recall:6.4f}  {micro_f1:6.4f}", flush=True)
    print()
    print("MACRO AVERAGED", flush=True)
    print("PRECIS  RECALL  F1    ", flush=True)
    print(f"{macro_precision:6.4f}  {macro_recall:6.4f}  {macro_f1:6.4f}", flush=True)










if __name__ == "__main__":
    for num_lda_models in range(1,10):
        print('FOR ' +str(num_lda_models)+ ' LDA MODELS: \n', flush=True)
        evaluate_baseline(num_lda_models)

def get_results(question):
    print('hi')
    try:
        with open("topic_models_mdl.pkl", "rb") as f:
            models, dictionary = pickle.load(f)
    except:
        print('heyo!')
        build_model()
        with open("topic_models_mdl.pkl", "rb") as f:
            models, dictionary = pickle.load(f)
    try:
        with open("classifier.pkl", "rb") as f:
            p_class, p_label = pickle.load(f)
    except:
        bayes_EM(models, dictionary)
        with open("classifier.pkl", "rb") as f:
            p_class, p_label = pickle.load(f)
    results = []
    #print(question)
    #txt1 = process([question.decode('utf-8')])
    results = predict(str(question, 'utf-8'), models, dictionary, p_class, p_label)
    return sorted(results, key=results.get, reverse=True)[:2]
    # for file in os.listdir("topics/"):
    #     with open("topics/" + file) as doc2:
    #         txt = doc2.read()
    #         # print("hey")
    #         txt = process([txt])
    #         # print(txt)
    #         # print("ho")
    #         kl = 0
    #         for lda in models:
    #             p = lda[dictionary.doc2bow(txt1[0])]
    #             # print(p)
    #             q = lda[dictionary.doc2bow(txt[0])]
    #             # print(q)
    #             for y, w1 in p:
    #                 for x, w0 in q:
    #                     if x == y:
    #                         kl += w0 * w1
    #         results.append((file, kl))
    #return sorted(results, key=lambda x: -x[1])[:2]
    # if not found:
    #     kl += 1
    # min_kl = math.inf
    # for x, w0 in p:
    #     found = False
    #     for y, w1 in q:
    #         if x == y:
    #             found = True
    #             kl += w0 * math.log(w0 / w1)
    #     if not found:
    #         kl += 1
