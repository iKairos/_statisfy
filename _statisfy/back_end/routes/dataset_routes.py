from __main__ import app 
from flask import request, jsonify
from flask.helpers import send_file
from flask_cors import cross_origin
from db.db_blob import BlobDatabase
from functionalities.statistical_analysis import freq_dist
from functionalities.statistical_analysis import anderson_test
from scipy import stats
import pandas as pd
import urllib.request
import numpy as np
import os

@app.route("/api/dataset/process", methods = ['POST'])
@cross_origin()
def dataset_details():
    try:
        file = None
        data = request.form
        try:
            file = request.files['file']
        except:
            file = BlobDatabase.get_dataset(data['filepath'])

        df = pd.read_csv(file, delimiter=data['delimiter'])
        
        details = []

        for i in df.columns:
            mean = "NA"
            std = "NA"
            median = "NA"
            max = "NA"
            min = "NA"
            normal = "NA"
            vis = "NA"
            type = "NA"
            outliers = "NA"
            skew = "NA"
            kurtosis = "NA"
            try:
                if df[i].dtypes != 'O':
                    mean = round(float(df[i].mean()), 2) # temporary fix
                    std = round(float(df[i].std()), 2)
                    median = round(float(df[i].median()), 2)
                    normal = anderson_test(df[i])
                    normal = "Normal" if normal[0] < normal[1][4] else "Not Normal"
                    vis = freq_dist(df[i])
                    low = df[i].quantile(0.10)
                    hi = df[i].quantile(0.90)
                    outliers = int(len(df[i][(df[i] < low) | (df[i] > hi)]))
                    type = "numerical"
                    skew = round(float(df[i].skew()), 2)
                    kurtosis = round(float(df[i].kurtosis()), 2)
                else:
                    vis = df[i].value_counts()
                    vis = vis.to_dict()
                    type = "object"
                try:
                    max = float(df[i].max())
                    min = float(df[i].min())
                except:
                    max = df[i].max()
                    min = df[i].min()
            except Exception as e:
                pass

            details.append({
                'column': i,
                'null_count': int(df.isna().sum()[i]),
                'mean': mean,
                'std': std,
                'median': median,
                'max': max,
                'min': min,
                'distribution': normal,
                'outliers': outliers,
                'type': type,
                'vis': vis,
                'skew': skew,
                'kurtosis': kurtosis
            })

        return {
            'size': int(df.size),
            'rows': int(df.shape[0]),
            'columns': int(df.shape[1]),
            'details': details
        }
    except Exception as e:
        return {
            'error': str(e),
            'code': 'DATASET_PROCESS_FAIL'
        }
    
@app.route("/api/dataset/get/<filename>/<cols>", methods=['GET'])
@cross_origin()
def get_dataset(filename,cols):
    try:
        df = pd.read_csv(BlobDatabase.get_dataset(filename))
        df = df.fillna('')

        return {
            'code': 'DATASET_GET_SUCCESS',
            'data': df.to_dict(orient='records'),
            'filename': filename,
            'filesize': urllib.request.urlopen('https://statisfyblobstorage.blob.core.windows.net/datasets/66692512_AEGISDataset.csv').length,
            'directory': filename
        }
    except Exception as e:
        return {
            'code': 'DATASET_GET_FAIL',
            'error': str(e)
        }