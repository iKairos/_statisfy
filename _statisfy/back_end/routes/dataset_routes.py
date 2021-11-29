from __main__ import app 
from flask import request
from flask_cors import cross_origin
import pandas as pd

@app.route("/api/dataset/process", methods = ['POST'])
@cross_origin()
def dataset_details():
    file = request.files['file']
    
    df = pd.read_csv(file)
    
    null_count = []

    for i in df.columns:
        null_count.append((i, int(df.isna().sum()[i])))

    return {
        'size': int(df.size),
        'rows': int(df.shape[0]),
        'columns': int(df.shape[1]),
        'null_count': null_count
    }