from __main__ import app 
from flask import request, jsonify
from flask.helpers import send_file
from flask_cors import cross_origin
from functionalities.statistical_analysis import freq_dist
from functionalities.statistical_analysis import anderson_test
from scipy import stats
import pandas as pd
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
            file = data['filepath']

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
            try:
                if df[i].dtypes != 'O':
                    mean = round(float(df[i].mean()), 2) # temporary fix
                    std = round(float(df[i].std()), 2)
                    median = round(float(df[i].median()), 2)
                    normal = anderson_test(df[i])
                    vis = freq_dist(df[i])
                    q1 = df[i].quantile(0.25)
                    q3 = df[i].quantile(0.75)
                    iqr = q3 - q1
                    lower_lim = q1 - 1.5 * iqr
                    upper_lim = q3 + 1.5 * iqr
                    outliers_15_low = (df[i] < lower_lim)
                    outliers_15_up = (df[i] > upper_lim)
                    outliers = int(len(df[i][outliers_15_low | outliers_15_up]))
                    type = "numerical"
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
                'distribution': "Normal" if normal[0] < normal[1][0] else "Not Normal",
                'outliers': outliers,
                'type': type,
                'vis': vis
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
        directory = os.path.join(os.path.dirname(os.path.realpath(__file__)), '..\\temp\\datasets\\')

        df = pd.read_csv(directory+filename)
        #df = df.head(50) if df.shape[0] > 50 else df
        df = df.fillna('')

        return {
            'code': 'DATASET_GET_SUCCESS',
            'data': df.to_dict(orient='records'),
            'filename': filename,
            'filesize': os.path.getsize(directory+filename),
            'directory': directory+filename
        }
    except Exception as e:
        return {
            'code': 'DATASET_GET_FAIL',
            'error': str(e)
        }