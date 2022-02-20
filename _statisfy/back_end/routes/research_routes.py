from __main__ import app
from random import randint 
from flask import request
from flask_cors import cross_origin
from objects.study import Study
from objects.user import User
from objects.research import Research
from os.path import dirname, realpath
from functionalities.statistical_analysis import *
from functionalities.interpretation import interpret
import pandas as pd
import warnings
import os

warnings.filterwarnings('ignore')

@app.route("/api/research/<id>")
@cross_origin()
def fetch_research(id):
    research = Research(id)
        
    if not research.is_registered:
        return {
            'error': 'Research does not exist.',
            'code': 'RESEARCH_NOT_EXIST'
        }
    
    data = {
        '_id': id, 
        'research_name': research.research_name,
        'research_description': research.research_description,
        'dataset': research.dataset_directory,
        'authors': [{'uid': u, 'username': User(u).username} for u in research.authors],
        'delimiter': research.delimiter,
        'created_at': research.created_at
    }
    
    return {
        'data' : data,
        'code': "RESEARCH_GET_SUCCESS",
    }

@app.route("/api/researches", methods=["POST"])
@cross_origin()
def fetch_researches():
    try:
        data = request.get_json()

        user = User(data['_id'])
        
        researches = []
 
        for i in user.research_papers:
            research = Research(i)
            
            researches.append({
                'id': i,
                'research_name': research.research_name,
                'research_description': research.research_description,
                'created_at': research.created_at
            })
        
        return {
            'code': 'RESEARCHES_GET_SUCCESS',
            'researches': researches
        }
        
    except Exception as e:
        return {
            'code': 'RESEARCHES_GET_FAIL',
            'error': str(e)
        }
    

@app.route("/api/research/new", methods=["POST"])
@cross_origin()
def add_research():
    try:
        data = request.form

        uuid = randint(10000000, 99999999)
            
        research = Research(uuid)
        
        while research.is_registered:
            uuid = randint(10000000, 99999999)

            research = Research(uuid)

            if not research.is_registered:
                break

        file = request.files['dataset']

        UPLOADS_PATH = os.path.join(dirname(realpath(__file__)), '..\\temp\\datasets\\'+ f"{uuid}_{file.filename}")
        
        file.save(UPLOADS_PATH)

        res = Research.register_research(
            _id = uuid,
            research_name = data['research_name'],
            research_description = data['research_description'],
            dataset = f"{uuid}_{file.filename}",
            delimiter = data['delimiter'],
            author = data['author'],
            created_at = data['created_at']
        )

        if not res[0]:
            return {
                'message': res[1],
                'code': 'RESEARCH_SAVE_UNEXPECTED_FAILURE',
                'type': 'error'
            }
        
        return {
            'message': 'Research saved successfully.',
            'code': 'RESEARCH_SAVE_SUCCESS',
            'type': 'success',
            'uuid': uuid
        }
    except Exception as e:
        return {
            'error': str(e),
            'code': 'RESEARCH_SAVE_INTERNAL_FAILURE',
            'type': 'error'
        }

@app.route("/api/research/study/new", methods=["POST"])
@cross_origin()
def add_study():
    try:
        data = request.get_json()

        uuid = randint(10000000, 99999999)
            
        study = Study(uuid)
        
        while study.is_registered:
            uuid = randint(10000000, 99999999)

            study = Study(uuid)

            if not study.is_registered:
                break

        compute_res = None
        interpretation = []
        
        research = Research(data['research_id'])
        
        df = pd.read_csv(os.path.join(dirname(realpath(__file__)), '..\\temp\\datasets\\' + research.dataset_directory), delimiter=research.delimiter)
        
        columns = data['columns']
        options = data['options']

        changes = []
        null_deleted = 0 
        null_replaced = 0
        outlier_deleted = 0
        outlier_replaced = 0
        for col in columns:
            for option in options:
                if option['column'] == col:
                    if option['null_option']['method'] == 'delete':
                        init_rows = int(df.shape[0])
                        df.dropna(subset=[col], inplace=True)
                        null_deleted = init_rows - int(df.shape[0])
                    elif option['null_option']['method'] == 'replace':
                        init_na = df[col].isna().sum()
                        if option['null_option']['replace_by'] == 'mean':
                            df[col].fillna(df[col].mean(), inplace=True)
                        elif option['null_option']['replace_by'] == 'median':
                            df[col].fillna(df[col].median(), inplace=True)
                        elif option['null_option']['replace_by'] == 'mode':
                            df[col].fillna(df[col].mode(), inplace=True)
                        null_replaced = init_na - df[col].isna().sum()
                    elif option['null_option']['method'] == 'nothing':
                        pass
                    if df[col].isnull().values.any():
                        return {
                            'code': 'STUDY_DATA_HAS_NULL',
                            'error': f'Statisfy detected null values on the variable {col} which may be detrimental to the computation process. Please clean your dataset first.'
                        }
                    
                    low = df[col].quantile(0.10)
                    hi = df[col].quantile(0.90)

                    if option['outlier_option']['method'] == 'delete':
                        index = df[col][(df[col] < low) | (df[col] > hi)].index 
                        init_rows = int(df.shape[0])
                        df.drop(index, inplace=True)
                        outlier_deleted = init_rows - int(df.shape[0]) 
                    elif option['outlier_option']['method'] == 'replace':
                        init_outliers = len(df[col][(df[col] < low) | (df[col] > hi)])
                        if option['outlier_option']['method'] == 'mean':
                            df[col] = np.where(df[col] < low, df[col].mean(), df[col])
                            df[col] = np.where(df[col] > hi, df[col].mean(), df[col])
                        elif option['outlier_option']['method'] == 'median':
                            df[col] = np.where(df[col] < low, df[col].median(), df[col])
                            df[col] = np.where(df[col] > hi, df[col].median(), df[col])
                        elif option['outlier_option']['method'] == 'mode':
                            df[col] = np.where(df[col] < low, df[col].mode(), df[col])
                            df[col] = np.where(df[col] > hi, df[col].mode(), df[col])
                        outlier_replaced = init_outliers - (init_outliers - len(df[col][(df[col] < low) | (df[col] > hi)]))
                    elif option['null_option']['method'] == 'nothing':
                        pass
            changes.append(
                {
                    'column': col,
                    'null_deleted': null_deleted,
                    'null_replaced': null_replaced,
                    'outlier_deleted': outlier_deleted,
                    'outlier_replaced': outlier_replaced
                }
            )
            null_deleted = 0 
            null_replaced = 0
            outlier_deleted = 0
            outlier_replaced = 0

        if data['test_type'] == 'Pearson R Correlation Test':
            if len(columns) != 2:
                return {
                    'code': 'STUDY_WRONG_VAR_COUNT',
                    'error': 'Pearson R only accepts two variables. Please make sure to only select two columns to analyze.'
                }
                
            compute_res = pearsonr(df[columns[0]], df[columns[1]])

        Study.new_study(
            _id = uuid,
            study_name = data['study_name'],
            research_id = data['research_id'],
            created_by = data['created_by'],
            test_type = data['test_type'],
            created_at = data['created_at'],
            columns = data['columns'],
            study_description = data['study_description'],
            variables = compute_res,
            options = data['options'],
            changes = changes
        )

        return {
            'code': 'STUDY_ADD_SUCCESS',
            'message': 'Study is successfully registered and computed.',
        }

    except Exception as e:
        raise e

@app.route("/api/research/study/fetch", methods=["POST"])
@cross_origin()
def get_studies():
    try:
        data = request.form 

        research = Research(data['research_id'])
        
        res_data = []
        
        for i in research.studies:
            i = list(i)
            i.append(list(Study(i[0]).columns))
            i.append(list(Study(i[0]).variables))
            i.append(interpret(Study(i[0]).test_type, list(Study(i[0]).variables)))
            temp = []
            for col in Study(i[0]).columns:
                temp.append(Study(i[0]).clean_stats(col))
            i.append(temp)
            res_data.append(list(i))

        return {
            'code': 'STUDY_GET_SUCCESS',
            'data': list(res_data),
        }
    except Exception as e:
        raise e