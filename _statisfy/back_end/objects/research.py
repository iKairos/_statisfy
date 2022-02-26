from db import db_researches
from db import db_authors

class Research:
    def __init__(self, rid):
        self.db = db_researches.ResearchesBackbone()
        self.rdb = db_authors.AuthorsBackbone()
        self.rid = rid 
    
    @property
    def research_name(self):
        return self.db.get_research_name(self.rid)
    
    @property
    def research_description(self):
        return self.db.get_research_description(self.rid)
    
    @property
    def dataset_directory(self):
        return self.db.get_dataset(self.rid)
    
    @property
    def test_type(self):
        return self.db.get_test_type(self.rid)
    
    @property
    def authors(self):
        return self.rdb.get_authors(self.rid)
    
    @property
    def is_registered(self):
        return self.db.is_registered(self.rid)
    
    @property
    def delimiter(self):
        return self.db.get_delimiter(self.rid)
    
    @property
    def created_at(self):
        return self.db.get_created_at(self.rid)
    
    @property 
    def studies(self):
        return self.db.get_studies(self.rid)

    def set_research_name(self, new_name):
        return self.db.set_research_name(self.rid, new_name)
    
    def set_research_description(self, new_description):
        return self.db.set_research_description(self.rid, new_description)
    
    def set_dataset(self, new_dataset):
        return self.db.set_dataset(self.rid, new_dataset)
    
    def set_delimiter(self, new_delimiter):
        return self.db.set_delimiter(self.rid, new_delimiter)

    def register_research(**kwargs):
        db = db_researches.ResearchesBackbone()

        return db.register_research(
            _id = kwargs['_id'],
            research_name = kwargs['research_name'],
            research_description = kwargs['research_description'],
            dataset = kwargs['dataset'],
            author = kwargs['author'],
            delimiter = kwargs['delimiter'],
            created_at = kwargs['created_at']
        )
    
    def delete_research(self):
        return self.db.delete_research(self.rid)