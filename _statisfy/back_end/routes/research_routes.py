from __main__ import app
from random import randint 
from flask import request
from flask_cors import cross_origin
from objects.user import User
from objects.research import Research
from os.path import dirname, realpath
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

    return {
        'data' : {
            '_id': id, 
            'research_name': research.research_name,
            'research_description': research.research_description,
            'dataset': research.dataset_directory,
            'test_type': research.test_type,
            'authors': [{'uid': u, 'username': User(u).username} for u in research.authors],
            'columns': research.columns,
            'delimiter': research.delimiter,
            'created_at': research.created_at
        },
        'code': "RESEARCH_GET_SUCCESS",
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
            dataset = UPLOADS_PATH,
            test_type = data['test_type'],
            columns = data['columns'].split(','),
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

