from .db_backbone import DatabaseBackbone
from secret import CONN_STRING

class UsersBackbone(DatabaseBackbone):
    def __init__(self):
        self.conn_string = CONN_STRING
    
    def register_user(self, **kwargs):
        try:
            res = self.append_row(
                "users", 
                _id = kwargs['_id'],
                first_name = kwargs['first_name'],
                middle_name = kwargs['middle_name'],
                last_name = kwargs['last_name'],
                username = kwargs['username'],
                password_hash = kwargs['password_hash'],
                email_address = kwargs['email_address'],
                created_at = kwargs['created_at']
            )

            return True, res
        except Exception as e:
            return False, e
    
    def is_registered(self, uid):
        try:
            fetched = self.fetch_row("users", _id = uid)
            
            return False if len(fetched) == 0 else True
        except Exception as e :
            print(e)  
            return False
    
    def get_user(self, by, value):
        try:
            fetched = None 

            if by == 'uid':
                fetched == self.fetch_row_string_strict("users", _id = value)
            elif by == 'uname':
                fetched = self.fetch_row_string_strict("users", username = value)
            elif by == 'email':
                fetched = self.fetch_row_string_strict("users", email_address = value)
            else:
                raise ValueError("Either uid or uname argument is needed.")

            return None if len(fetched) == 0 else fetched[0]
        except Exception as e :
            print(e)  
            return False

    def get_first_name(self, uid):
        try:
            fetched = self.fetch_row("users", _id = uid)[0]

            return fetched[1]
        except Exception as e:
            print(e)  
            return False
    
    def get_middle_name(self, uid):
        try:
            fetched = self.fetch_row("users", _id = uid)[0]

            return fetched[2]
        except Exception as e:
            print(e)  
            return False
    
    def get_last_name(self, uid):
        try:
            fetched = self.fetch_row("users", _id = uid)[0]

            return fetched[3]
        except Exception as e:
            print(e)  
            return False
    
    def get_username(self, uid):
        try:
            fetched = self.fetch_row("users", _id = uid)[0]

            return fetched[4]
        except Exception as e:
            print(e)  
            return False
    
    def get_password_hash(self, uid):
        try:
            fetched = self.fetch_row("users", _id = uid)[0]

            return fetched[5]
        except Exception as e:
            print(e)  
            return False
    
    def get_email_address(self, uid):
        try:
            fetched = self.fetch_row("users", _id = uid)[0]

            return fetched[6]
        except Exception as e:
            print(e)  
            return False
    
    def get_nickname(self, uid):
        try:
            fetched = self.fetch_row("users", _id = uid)[0]

            return fetched[7]
        except Exception as e:
            print(e)  
            return False
    
    def get_educ_level(self, uid):
        try:
            fetched = self.fetch_row("users", _id = uid)[0]

            return fetched[8]
        except Exception as e:
            print(e)  
            return False
    
    def get_major(self, uid):
        try:
            fetched = self.fetch_row("users", _id = uid)[0]

            return fetched[9]
        except Exception as e:
            print(e)  
            return False
    
    def get_occupation(self, uid):
        try:
            fetched = self.fetch_row("users", _id = uid)[0]

            return fetched[10]
        except Exception as e:
            print(e)  
            return False
    
    def get_profile_pic_directory(self, uid):
        try:
            fetched = self.fetch_row("users", _id = uid)[0]

            return fetched[11]
        except Exception as e:
            print(e)  
            return False
    
    def get_created_at(self, uid):
        try:
            fetched = self.fetch_row("users", _id = uid)[0]

            return fetched[12]
        except Exception as e:
            print(e)  
            return False
    
    def set_first_name(self, uid, new):
        try:
            self.update_data(
                "users",
                "first_name",
                new,
                _id = uid
            )

            return True
        except Exception as e:
            print(e)
            return False

    def set_middle_name(self, uid, new):
        try:
            self.update_data(
                "users",
                "middle_name",
                new,
                _id = uid
            )

            return True
        except Exception as e:
            print(e)
            return False

    def set_last_name(self, uid, new):
        try:
            self.update_data(
                "users",
                "last_name",
                new,
                _id = uid
            )

            return True
        except Exception as e:
            print(e)
            return False

    def set_username(self, uid, new):
        try:
            self.update_data(
                "users",
                "username",
                new,
                _id = uid
            )

            return True
        except Exception as e:
            print(e)
            return False

    def set_password_hash(self, uid, new):
        try:
            self.update_data(
                "users",
                "password_hash",
                new,
                _id = uid
            )

            return True
        except Exception as e:
            print(e)
            return False

    def set_email_address(self, uid, new):
        try:
            self.update_data(
                "users",
                "email_address",
                new,
                _id = uid
            )

            return True
        except Exception as e:
            print(e)
            return False

    def set_nickname(self, uid, new):
        try:
            self.update_data(
                "users",
                "nickname",
                new,
                _id = uid
            )

            return True
        except Exception as e:
            print(e)
            return False

    def set_educ_level(self, uid, new):
        try:
            self.update_data(
                "users",
                "educ_level",
                new,
                _id = uid
            )

            return True
        except Exception as e:
            print(e)
            return False

    def set_major(self, uid, new):
        try:
            self.update_data(
                "users",
                "major",
                new,
                _id = uid
            )

            return True
        except Exception as e:
            print(e)
            return False
            
    def set_occupation(self, uid, new):
        try:
            self.update_data(
                "users",
                "occupation",
                new,
                _id = uid
            )

            return True
        except Exception as e:
            print(e)
            return False

    def set_profile_picture(self, uid, new):
        try:
            self.update_data(
                "users",
                "profile_picture",
                new,
                _id = uid
            )

            return True
        except Exception as e:
            print(e)
            return False

    def set_created_at(self, uid, new):
        try:
            self.update_data(
                "users",
                "created_at",
                new,
                _id = uid
            )

            return True
        except Exception as e:
            print(e)
            return False