import torch
from transformers import GPT2Tokenizer, GPT2Model, BertForMaskedLM, GPT2LMHeadModel
import numpy as np
from torch.nn.functional import softmax
import sys
gpu = sys.argv[1]
device = torch.device("cuda:" + str(gpu))

tokenizer = GPT2Tokenizer.from_pretrained('distilgpt2')

model = GPT2LMHeadModel.from_pretrained('distilgpt2').to(device)
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
        with torch.no_grad():
            outputs = model(topic_tensor)
            predictions = outputs[0]

        temp = predictions[0,-1,:]
        result = softmax(temp)
        score -= torch.log(result[each_word])
        topic_tensor = torch.cat((topic_tensor, torch.LongTensor([each_word]).to(device).unsqueeze(0)), 1)[:, 1:]

    return score.item()
    # print('are')
    # print(result[are])
    # print('is')
    # print(result[iss])
    # print(result[are] > result[iss])
    
topics = []
problems = []
with open("topics/dependency_parsing.txt", "r") as f:
    topics.append(f.read()[0:1024])
with open("topics/language_modelling.txt", "r") as f:
    topics.append(f.read()[0:1024])
with open("topics/machine_translation.txt", "r") as f:
    topics.append(f.read()[0:1024])
with open("topics/neural_nets.txt", "r") as f:
    topics.append(f.read()[0:1024])
with open("topics/vector_semantics.txt", "r") as f:
    topics.append(f.read()[0:1024])
with open("questions/q1_mt.txt", "r") as f:
    problems.append(f.read()[0:1024])
# predictions: list of list : each element is a list of scores corresponding to the each topic
predictions = []
result = []

# loop over the lists of topics and problems 
for each_problem in problems:
    scores = []
    for each_topic in topics:
        print(topics.index(each_topic))
        scores.append(get_predictions(each_topic, each_problem))
    predictions.append(scores)

# Take an argmax to find the best topic, or we can find multiple topics further :: TODO
for each in predictions:
    result.append(torch.argmax(torch.Tensor(each)))

result = [topics[i] for i in result]
print(topics)
print(predictions)
print(result)
