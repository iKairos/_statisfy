from __main__ import app 
from flask import request
from flask_cors import cross_origin
import pandas as pd

@app.route("/api/dataset/process", methods = ['POST'])
@cross_origin()
def dataset_details():
    file = request.files['file']
    
    df = pd.read_csv(file)
    
    details = []

    for i in df.columns:
        mean = "NA"
        std = "NA"
        median = "NA"
        try:
            if df[i].dtypes != 'O':
                mean = float(df[i].mean())
                std = float(df[i].std())
                median = float(df[i].median())
        except:
            pass 

        details.append({
            'column': i,
            'null_count': int(df.isna().sum()[i]),
            'mean': mean,
            'std': std,
            'median': median
        })

    return {
        'size': int(df.size),
        'rows': int(df.shape[0]),
        'columns': int(df.shape[1]),
        'details': details
    }