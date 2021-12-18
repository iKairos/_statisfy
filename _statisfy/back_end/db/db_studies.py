from .db_backbone import DatabaseBackbone
from secret import CONN_STRING

class StudiesBackbone(DatabaseBackbone):
    def __init__(self):
        self.conn_string = CONN_STRING
    
    def new_study(self, **kwargs):
        try:
            res = self.append_row(
                "studies",
                _id = kwargs['_id'],
                study_name = kwargs['study_name'],
                research_id = kwargs['research_id'],
                created_by = kwargs['created_by'],
                test_type = kwargs['test_type'],
                created_at = kwargs['created_at'],
                study_description = kwargs['study_description']
            )

            for col in kwargs['columns']:
                self.add_column(kwargs['_id'], col)

            return True, res
        except Exception as e:
            print(e)
            return False
    
    def is_registered(self, rid):
        try:
            fetched = self.fetch_row("studies", _id = rid)

            return False if len(fetched[0]) == 0 else True
        except Exception as e :
            print(e)  
            return False
    
    def get_study_name(self, rid):
        try:
            fetched = self.fetch_row(
                "studies",
                _id = rid
            )[1]

            return fetched
        except Exception as e:
            print(e)
            return False

    def get_study_description(self, rid):
        try:
            fetched = self.fetch_row(
                "studies",
                _id = rid
            )[6]

            return fetched
        except Exception as e:
            print(e)
            return False

    def get_research_id(self, rid):
        try:
            fetched = self.fetch_row(
                "studies",
                _id = rid
            )[2]

            return fetched
        except Exception as e:
            print(e)
            return False
            
    def get_author(self, rid):
        try:
            fetched = self.fetch_row(
                "studies",
                _id = rid
            )[3]

            return fetched
        except Exception as e:
            print(e)
            return False

    def get_test_type(self, rid):
        try:
            fetched = self.fetch_row(
                "studies",
                _id = rid
            )[4]

            return fetched
        except Exception as e:
            print(e)
            return False

    def get_created_at(self, rid):
        try:
            fetched = self.fetch_row(
                "studies",
                _id = rid
            )[5]

            return fetched
        except Exception as e:
            print(e)
            return False
    
    def get_columns(self, rid):
        try:
            fetched = self.fetch_row(
                "dataset_columns",
                _id = rid
            )[0]

            return fetched
        except Exception as e:
            print(e)
            return False
    
    def set_study_name(self, rid, name):
        try:
            self.update_data(
                "studies",
                "study_name",
                name,
                _id = rid
            )

            return True
        except Exception as e:
            print(e)
            return False
    
    def add_column(self, rid, column):
        try:
            self.append_row(
                "dataset_columns",
                research_id = rid,
                _column = column
            )

            return True
        except Exception as e:
            print(e)
            return False