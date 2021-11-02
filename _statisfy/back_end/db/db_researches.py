from .db_backbone import DatabaseBackbone
from secret import CONN_STRING

class ResearchesBackbone(DatabaseBackbone):
    def __init__(self):
        self.conn_string = CONN_STRING
    
    def register_research(self, **kwargs):
        try:
            self.append_row(
                "researches",
                _id = kwargs['_id'],
                research_name = kwargs['research_name'],
                research_description = kwargs['research_description'],
                dataset = kwargs['dataset'],
                test_type = kwargs['test_type']
            )

            return True
        except Exception as e:
            print(e)
            return False
    
    def get_research_name(self, rid):
        try:
            fetched = self.fetch_row(
                "researches",
                _id = rid
            )[0]
            
            return fetched[1]
        except Exception as e:
            print(e)
            return False

    def get_research_description(self, rid):
        try:
            fetched = self.fetch_row(
                "researches",
                _id = rid
            )[0]

            return fetched[2]
        except Exception as e:
            print(e)
            return False

    def get_dataset(self, rid):
        try:
            fetched = self.fetch_row(
                "researches",
                _id = rid
            )[0]

            return fetched[3]
        except Exception as e:
            print(e)
            return False

    def get_test_type(self, rid):
        try:
            fetched = self.fetch_row(
                "researches",
                _id = rid
            )[0]

            return fetched[4]
        except Exception as e:
            print(e)
            return False
    
    def set_research_name(self, rid, new):
        try:
            self.update_data(
                "researches",
                "research_name",
                new,
                _id = rid
            )

            return True
        except Exception as e:
            print(e)
            return False

    def set_research_description(self, rid, new):
        try:
            self.update_data(
                "researches",
                "research_description",
                new,
                _id = rid
            )

            return True
        except Exception as e:
            print(e)
            return False

    def set_dataset(self, rid, new):
        try:
            self.update_data(
                "researches",
                "dataset",
                new,
                _id = rid
            )

            return True
        except Exception as e:
            print(e)
            return False

    def set_test_type(self, rid, new):
        try:
            self.update_data(
                "researches",
                "test_type",
                new,
                _id = rid
            )

            return True
        except Exception as e:
            print(e)
            return False