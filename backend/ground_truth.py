import pickle
groundTruth = {}

# use get_groundTruth to get the dictionary.
# the dictionary has two nested dictionaries:
# first layer is a1, a2, a3, a4, a5, which means the assignment1 through assignment5
# second layer is p1, p2, p3, which means the problem1 through problem3
# the result is a list of ground truth topics for those problems

groundTruth["a1"] = {}
groundTruth["a1"]["p1"] = ["vector_semantics.txt"]
groundTruth["a1"]["p2"] = ["vector_semantics.txt"]

groundTruth["a2"] = {}
groundTruth["a2"]["p1"] = ["vector_semantics.txt"]
groundTruth["a2"]["p2"] = ["vector_semantics.txt"]

groundTruth["a3"] = {}
groundTruth["a3"]["p1"] = ["neural_nets.txt"]
groundTruth["a3"]["p2"] = ["neural_nets.txt", "dependency_parsing.txt"]

groundTruth["a4"] = {}
groundTruth["a4"]["p1"] = ["neural_nets.txt", "machine_translation.txt"]
groundTruth["a4"]["p2"] = ["neural_nets.txt", "machine_translation.txt", "language_modelling.txt"]

groundTruth["a5"] = {}
groundTruth["a5"]["p1"] = ["neural_nets.txt", "language_modelling.txt"]
groundTruth["a5"]["p2"] = ["neural_nets.txt", "language_modelling.txt"]
groundTruth["a5"]["p3"] = ["neural_nets.txt", "language_modelling.txt", "vector_semantics.txt"]

def get_groundTruth():
	return groundTruth
