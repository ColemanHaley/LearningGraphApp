import torch
from transformers import GPT2Tokenizer, GPT2Model, BertForMaskedLM, GPT2LMHeadModel
import numpy as np
from torch.nn.functional import softmax

tokenizer = GPT2Tokenizer.from_pretrained('gpt2')

model = GPT2LMHeadModel.from_pretrained('gpt2')
model.eval()

def get_predictions(topic, problem):

    # topic : string type, 
    # problem : string type

    score = 1.0

    tokenized_topic = tokenizer.tokenize(topic)
    tokenized_problem = tokenizer.tokenize(problem)

    # Convert token to vocabulary indices
    indexed_topic = tokenizer.convert_tokens_to_ids(tokenized_topic)
    indexed_problem = tokenizer.convert_tokens_to_ids(tokenized_problem)

    # Convert inputs to PyTorch tensors
    topic_tensor = torch.tensor([indexed_topic])

    for each_word in indexed_problem:
        with torch.no_grad():
            outputs = model(topic_tensor)
            predictions = outputs[0]

        temp = predictions[0,-1,:]
        result = softmax(temp)
        score *= result[each_word]
        topic_tensor = torch.cat((topic_tensor, torch.LongTensor([each_word]).unsqueeze(0)), 1)

    return score.item()
    # print('are')
    # print(result[are])
    # print('is')
    # print(result[iss])
    # print(result[are] > result[iss])

topics = ['this is a wug. now there are two of them. the slurbs ', 'this is a slurb. the wugs to the cabinet  ']
problems = ["and there is a book", "what we need to do is"]
# predictions: list of list : each element is a list of scores corresponding to the each topic
predictions = []
result = []

# loop over the lists of topics and problems 
for each_problem in problems:
    scores = []
    for each_topic in topics:
        scores.append(get_predictions(each_topic, each_problem))
    predictions.append(scores)

# Take an argmax to find the best topic, or we can find multiple topics further :: TODO
for each in predictions:
    result.append(torch.argmax(torch.Tensor(each)))

result = [topics[i] for i in result]
print(result)
