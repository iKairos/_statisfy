from collections import Counter
from itertools import groupby
from operator import itemgetter
from scipy import stats as sp
from itertools import chain
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
    
    return rho, p

def chi_square(x, expected = None, alpha = 0.05):
    """
    Format
    ----------
    2D Array in which in each array is one row while the size of the inner array is the column number.
    
    The data and the expected array should be in this format:

    >>> format = [['val11','val12','val13'],['val21', 'val12', 'val13']...]
    """
    r = len(x)
    c = len(x[0])

    if expected:
        if r != len(expected) or c != len(expected[0]):
            raise ValueError("Row and column of original data is not equal to the row and column of the expected data.")
    else:
        expected = []

        column_sums = []
        row_sums = []
        
        for i in zip(*x):
            column_sums.append(sum(i))
        
        for row in x:
            row_sums.append(sum(row))
        
        rw = 0
        
        for row in x:
            temp = []
            col = 0

            for c in row:
                temp.append((column_sums[col] * row_sums[rw]) / sum(row_sums))
                col += 1
            
            expected.append(temp)
            rw += 1

    chi = 0

    rw = 0
    for row in x:
        col = 0
        for c in row:
            chi += (c - expected[rw][col])**2 / expected[rw][col]
            col += 1
        rw += 1
    
    df = len(x[0]) - 1

    p = sp.chi2.sf(chi, df)

    critical_value = sp.chi2.ppf(1-alpha, df)
    
    return chi, p, df, expected, critical_value

# =========================================================================

# SIGNIFICANT DIFFERENCE ANALYSIS

def one_way_anova(*x, alpha = 0.05):
    if len(x) < 2:
        raise ValueError("The number of data groups should be at least two or more.")
        
    N = sum(len(i) for i in x)

    n = set(len(i) for i in x)

    if len(n) > 1:
        raise ValueError("The length of each of the columns should be the same.")

    n = list(n)[0]
    
    a = len(x)

    df_between = a - 1
    df_within = N - a
    df_total = N - 1

    ss_between_sum = sum([sum(data) ** 2 for data in x])
    ss_between_t2 = sum([sum(data) for data in x]) ** 2
    
    ss_between = (ss_between_sum / n) - (ss_between_t2 / N)

    ss_within_sum_all = sum([data**2 for data in chain.from_iterable(x)])
    ss_within = ss_within_sum_all - (ss_between_sum / n)

    ss_total = ss_within_sum_all - (ss_between_t2 / N)

    ms_between = ss_between / df_between
    ms_within = ss_within / df_within

    f_statistic = ms_between / ms_within

    p = sp.f.sf(f_statistic, df_between, df_within)

    critical_value = sp.f.ppf(1 - alpha, df_between, df_within)

    return f_statistic, p, critical_value