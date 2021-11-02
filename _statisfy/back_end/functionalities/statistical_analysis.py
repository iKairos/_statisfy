from collections import Counter
from itertools import groupby
from operator import itemgetter

# UNIVARIATE STATISTICAL ANALYSIS
def mean(x):
        return sum(x) / len(x)
    
def median(x):
    s = sorted(x)
    i = ((len(s) + 1) // 2) - 1
    m = None
    if len(s) % 2 == 0:
        m = (s[i] + s[i+1]) / 2
    else:
        m = s[i]
    
    return m

def mode(x):
    c = Counter(iter(x)).most_common()
    i, j = next(groupby(c, key=itemgetter(1)), (0, []))
    return tuple(map(itemgetter(0), j))

def stdev(x):
    sum = 0 

    for i in x:
        sum += (i - mean(x)) ** 2

    return (sum / (len(x) - 1)) ** 0.5

def variance(x):
    return stdev(x) ** 2

# =========================================================================

# RELATIONSHIP / ASSOCIATION STATISTICAL ANALYSIS

def pearsonr(x, y):
    if len(x) != len(y):
        raise ValueError(f"Dataset size is not equal. Size {len(x)} not equal to {len(y)}.")
    
    length = len(x)

    numerator_sum = 0
    term1_sum = 0 
    term2_sum = 0

    for i in range(length):
        numerator_sum += (x[i] - mean(x)) * (y[i] - mean(y))

        term1_sum += (x[i] - mean(x)) ** 2
        term2_sum += (y[i] - mean(y)) ** 2
    
    return numerator_sum / (term1_sum * term2_sum) ** 0.5

# =========================================================================