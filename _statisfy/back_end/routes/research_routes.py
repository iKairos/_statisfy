from __main__ import app 
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
            'authors': research.authors
        }
    }