import torch
from transformers import GPT2Tokenizer, GPT2Model, BertForMaskedLM, GPT2LMHeadModel
import numpy as np
from torch.nn.functional import softmax
import sys

# gpu = sys.argv[1]
device = torch.device("cuda:0")
# device = torch.device("cpu")

tokenizer = GPT2Tokenizer.from_pretrained("distilgpt2")

model = GPT2LMHeadModel.from_pretrained("distilgpt2").to(device)
model.eval()


def get_predictions(topic, problem):

    # topic : string type,
    # problem : string type

    score = 0

    tokenized_topic = tokenizer.tokenize(topic)
    tokenized_problem = tokenizer.tokenize(problem)

    # Convert token to vocabulary indices
    indexed_topic = tokenizer.convert_tokens_to_ids(tokenized_topic)
    indexed_problem = tokenizer.convert_tokens_to_ids(tokenized_problem)

    # Convert inputs to PyTorch tensors
    topic_tensor = torch.tensor([indexed_topic]).to(device)

    for each_word in indexed_problem:
        print(each_word)
        with torch.no_grad():
            outputs = model(topic_tensor)
            predictions = outputs[0]

        temp = predictions[0, -1, :]
        result = softmax(temp)
        score -= torch.log(result[each_word])
        topic_tensor = torch.cat(
            (topic_tensor, torch.LongTensor([each_word]).to(device).unsqueeze(0)), 1
        )[:, 1:]

    return score
    # print('are')
    # print(result[are])
    # print('is')
    # print(result[iss])
    # print(result[are] > result[iss])


def get_predicted_topics():
    topics = []
    problems = []
    with open("../topics/dependency_parsing.txt", "r", encoding="utf8") as f:
        topics.append(f.read()[0:1024])
    with open("../topics/language_modelling.txt", "r", encoding="utf8") as f:
        topics.append(f.read()[0:1024])
    with open("../topics/machine_translation.txt", "r", encoding="utf8") as f:
        topics.append(f.read()[0:1024])
    with open("../topics/neural_nets.txt", "r", encoding="utf8") as f:
        topics.append(f.read()[0:1024])
    with open("../topics/vector_semantics.txt", "r", encoding="utf8") as f:
        topics.append(f.read()[0:1024])
    with open("../questions/q1_mt.txt", "r", encoding="utf8") as f:
        problems.append(f.read())
    # predictions: list of list : each element is a list of scores corresponding to the each topic
    predictions = []
    result = []

    problem_segments = []
    for each in problems:
        if len(each) > 1024:
            segs = []
            num_segs = len(each) // 1024
            for i in range(num_segs):
                segs.append(each[i * len(each) : (i + 1) * len(each)])
            segs.append(each[(i + 1) * len(each) :])
            problem_segments.append(segs)

    # loop over the lists of topics and problems
    for each_problem in problem_segments:
        if isinstance(each_problem, str):
            scores = []
            for each_topic in topics:
                print(topics.index(each_topic))
                scores.append(get_predictions(each_topic, each_problem))
            predictions.append(scores)
        else:
            scores = []
            for each_topic in topics:
                print(topics.index(each_topic))
                grade = 0.0
                for each_seg in each_problem:
                    print(each_seg, len(each_seg))
                    grade += get_predictions(each_topic, each_seg)
                scores.append(grade)
            predictions.append(scores)

    # Take an argmax to find the best topic, or we can find multiple topics further :: TODO
    for each in predictions:
        result.append(torch.argmax(torch.Tensor(each)))

    result = [topics[i] for i in result]
    print(result)
    return result


get_predicted_topics()
