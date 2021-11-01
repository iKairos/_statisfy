from .db_backbone import DatabaseBackbone
from secret import CONN_STRING

class AuthorsBackbone(DatabaseBackbone):
    def __init__(self):
        self.conn_string = CONN_STRING
    
    def add_author(self, uid, research_id, author_type):
        try:
            self.append_row(
                "research_authors",
                research_id = research_id,
                user_id = uid,
                author_type = author_type
            )

            return True
        except Exception as e:
            print(e)
            return False
    
    def get_researches_author(self, uid):
        try:
            fetched = self.fetch_row(
                "research_authors",
                user_id = uid
            )

            data = [i[0] for i in fetched]

            return data
        except Exception as e:
            print(e)
            return False