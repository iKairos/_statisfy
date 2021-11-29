from .db_backbone import DatabaseBackbone
from secret import CONN_STRING

class TokenBackbone(DatabaseBackbone):
    def __init__(self):
        self.conn_string = CONN_STRING
    
    def token_expired(self, token):
        try:
            fetched = self.fetch_row_string_strict(
                "expired_tokens",
                token=str(token)
            )

            return True if len(fetched) == 1 else False
        except Exception as e:
            print(e)
            return e
    
    def expire_token(self, token):
        try:
            res = self.append_row(
                "expired_tokens",
                token=token
            )

            return res, True
        except Exception as e:
            return e