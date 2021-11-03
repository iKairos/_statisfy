from collections import Counter
from itertools import groupby
from operator import itemgetter
from scipy import stats as sp
import pandas as pd 
import numpy as np

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
    n = len(x)

    if n != len(y):
        raise ValueError(f"Dataset size is not equal. Size {len(x)} not equal to {len(y)}.")

    numerator_sum = 0
    term1_sum = 0 
    term2_sum = 0

    for i in range(n):
        numerator_sum += (x[i] - mean(x)) * (y[i] - mean(y))

        term1_sum += (x[i] - mean(x)) ** 2
        term2_sum += (y[i] - mean(y)) ** 2
    
    r = numerator_sum / (term1_sum * term2_sum) ** 0.5
    
    t = r * np.sqrt((n-2)/(1-r**2))

    p = 2 * sp.t.sf(np.abs(t), n-2)
    
    return r, p

def spearmanrho(x, y):
    n = len(x)

    if n != len(y):
        raise ValueError(f"Dataset size is not equal. Size {len(x)} not equal to {len(y)}.")

    df_x = pd.DataFrame(x)
    df_x['rank'] = df_x.rank(ascending=False)

    df_y = pd.DataFrame(y)
    df_y['rank'] = df_y.rank(ascending=False)

    ranked_x = []
    ranked_y = []

    for data, rank in df_x.iterrows():
        ranked_x.append((rank[0],rank['rank']))
    
    for data, rank in df_y.iterrows():
        ranked_y.append((rank[0],rank['rank']))

    d_squared_sum = 0

    for i in range(len(x)):
        d_squared = (ranked_x[i][1] - ranked_y[i][1]) ** 2

        d_squared_sum += d_squared
    
    rho = 1 - ((6*d_squared_sum)/((n)**3 - n))

    t = rho * np.sqrt((n-2)/(1-rho**2))

    p = 2 * sp.t.sf(np.abs(t), n-2)
    
    return 1 - ((6*d_squared_sum)/((n)**3 - n)), p

# =========================================================================