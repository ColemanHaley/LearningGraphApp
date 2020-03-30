import pickle
groundTruth = {}

# use get_groundTruth to get the dictionary.
# the dictionary has two nested dictionaries:
# first layer is a1, a2, a3, a4, a5, which means the assignment1 through assignment5
# second layer is p1, p2, p3, which means the problem1 through problem3
# the result is a list of ground truth topics for those problems

groundTruth["a1"] = {}
groundTruth["a1"]["p1"] = ["vector semantics"]
groundTruth["a1"]["p2"] = ["vector semantics"]

groundTruth["a2"] = {}
groundTruth["a2"]["p1"] = ["vector semantics"]
groundTruth["a2"]["p2"] = ["vector semantics"]

groundTruth["a3"] = {}
groundTruth["a3"]["p1"] = ["neural nets"]
groundTruth["a3"]["p2"] = ["neural nets", "dependency parsing"]

groundTruth["a4"] = {}
groundTruth["a4"]["p1"] = ["neural nets", "machine translation"]
groundTruth["a4"]["p2"] = ["neural nets", "machine translation", "language modelling"]

groundTruth["a5"] = {}
groundTruth["a5"]["p1"] = ["neural nets", "language modelling"]
groundTruth["a5"]["p2"] = ["neural nets", "language modelling"]
groundTruth["a5"]["p3"] = ["neural nets", "language modelling", "vector semantics"]

def get_groundTruth():
	return groundTruth