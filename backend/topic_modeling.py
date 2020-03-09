import os
from gensim import corpora, models

import spacy
import math

nlp = spacy.load("en_core_web_sm")

# class GutenbergCorpusBOW(object):
#     def __iter__(self):
#         for document in os.listdir('Gutenberg/txt'):
#             splitdoc = []
#             for line in open('Gutenberg/txt/' + document):
#                 splitdoc.extend(line.lower().split())
#             yield dictionary.doc2bow(splitdoc)
#     def __len__(self):
#         return len(os.listdir('Gutenberg/txt'))


from nltk.corpus import stopwords
import nltk
from gensim.corpora import Dictionary
from gensim.models.ldamodel import LdaModel

nltk.download("wordnet")

stopwords.words("english").extend(["one", "would", "said", "man"])
stoplist = stopwords.words("english")  # use list made by NLTK ppls


def process(docs):
    processed_docs = []
    for doc in nlp.pipe(docs, n_threads=4, batch_size=100):
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


docs = []
for file in os.listdir("resources/"):
    with open("resources/" + file) as doc:
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

lda = LdaModel(corpus, num_topics=5)

with open("questions/q1_mt.txt") as doc:
    txt = doc.read()
    p = lda[dictionary.doc2bow(process([txt])[0])]
    print(p)
    for file in os.listdir("topics/"):
        with open("topics/" + file) as doc2:
            txt = doc2.read()
            q = lda[dictionary.doc2bow(process([txt])[0])]
            print(q)
            kl = 0
            for y, w1 in p:
                for x, w0 in q:
                    if x == y:
                        kl += w0 * w1
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

            print(file)
            print(kl)


with open("questions/q1_mt.txt") as doc:
    txt = doc.read()
    print()
