from db import db_studies

class Study:
    def __init__(self, study_id):
        self.db = db_studies.StudiesBackbone()
        self.id = study_id 
    
    @property
    def is_registered(self):
        return self.db.is_registered(self.id)

    @property
    def name(self):
        return self.db.get_study_name(self.id)
    
    @property
    def description(self):
        return self.db.get_study_description(self.id)
    
    @property 
    def research_parent(self):
        return self.db.get_research_id(self.id)
    
    @property 
    def author(self):
        return self.db.get_author(self.id)
    
    @property 
    def test_type(self):
        return self.db.get_test_type(self.id)
    
    @property 
    def created_at(self):
        return self.db.get_created_at(self.id)
    
    @property 
    def columns(self):
        return self.db.get_columns(self.id)
    
    @property
    def variables(self):
        return self.db.get_variables(self.id)
    
    def set_study_name(self, name):
        return self.db.set_study_name(self.id, name)
    
    def add_column(self, column):
        return self.db.add_column(self.id, column)
    
    @staticmethod
    def new_study(**kwargs):
        db = db_studies.StudiesBackbone()
        return db.new_study(
            _id = kwargs['_id'],
            study_name = kwargs['study_name'],
            research_id = kwargs['research_id'],
            created_by = kwargs['created_by'],
            test_type = kwargs['test_type'],
            created_at = kwargs['created_at'],
            columns = kwargs['columns'],
            study_description = kwargs['study_description'],
            variables = kwargs['variables']
        )