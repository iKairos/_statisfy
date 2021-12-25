from __main__ import app
from random import randint 
from flask import request
from flask_cors import cross_origin
from objects.study import Study
from objects.user import User
from objects.research import Research
from os.path import dirname, realpath
from functionalities.statistical_analysis import *
import pandas as pd
import os

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
        data = request.form 

        uuid = randint(10000000, 99999999)
            
        study = Study(uuid)
        
        while study.is_registered:
            uuid = randint(10000000, 99999999)

            study = Study(uuid)

            if not study.is_registered:
                break
        
        compute_res = None
        
        research = Research(data['research_id'])
        
        df = pd.read_csv(os.path.join(dirname(realpath(__file__)), '..\\temp\\datasets\\' + research.dataset_directory), delimiter=research.delimiter)
        
        columns = data['columns'].split(',')
        
        if data['test_type'] == 'Pearson R Correlation Test':
            if len(columns) != 2:
                return {
                    'code': 'STUDY_WRONG_VAR_COUNT',
                    'error': 'Pearson R only accepts two variables. Please make sure to only select two columns to analyze.'
                }
                
            compute_res = pearsonr(df[columns[0]], df[columns[1]])
            print(compute_res)
        
        Study.new_study(
            _id = uuid,
            study_name = data['study_name'],
            research_id = data['research_id'],
            created_by = data['created_by'],
            test_type = data['test_type'],
            created_at = data['created_at'],
            columns = data['columns'],
            study_description = data['study_description'],
            variables = compute_res
        )

        return {
            'code': 'STUDY_ADD_SUCCESS',
            'message': 'Study is successfully registered and computed.',
        }

    except Exception as e:
        return {
            'code': 'STUDY_ADD_FAIL',
            'error': str(e)
        }

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
            res_data.append(list(i))

        return {
            'code': 'STUDY_GET_SUCCESS',
            'data': list(res_data),
        }
    except Exception as e:
        return {
            'code': 'STUDY_GET_FAIL',
            'error': str(e)
        }