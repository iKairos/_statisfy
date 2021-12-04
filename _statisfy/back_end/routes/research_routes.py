from __main__ import app
from random import randint 
from flask import request
from flask_cors import cross_origin
from objects.research import Research

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
        'research' : {
            '_id': id, 
            'research_name': research.research_name,
            'research_description': research.research_description,
            'dataset': research.dataset_directory,
            'test_type': research.test_type,
            'authors': research.authors,
            'columns': research.columns,
            'delimiter': research.delimiter
        }
    }

@app.route("/api/research/new", methods=["POST"])
@cross_origin()
def add_research():
    try:
        data = request.get_json()

        uuid = randint(10000000, 99999999)
            
        research = Research(uuid)
        
        while research.is_registered:
            uuid = randint(10000000, 99999999)

            research = Research(uuid)

            if not research.is_registered:
                break

        res = Research.register_research(
            _id = uuid,
            research_name = data['research_name'],
            research_description = data['research_description'],
            dataset = data['dataset'],
            test_type = data['test_type'],
            columns = data['columns'],
            delimiter = data['delimiter'],
            author = data['author']
        )

        if not res[0]:
            return {
                'message': res[1],
                'code': 'RESEARCH_SAVE_UNEXPECTED_FAILURE',
                'type': 'danger'
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
            'type': 'danger'
        }

