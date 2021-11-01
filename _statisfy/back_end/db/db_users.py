from .db_backbone import DatabaseBackbone
from secret import CONN_STRING

class UsersBackbone(DatabaseBackbone):
    def __init__(self):
        self.conn_string = CONN_STRING
    
    def register_user(self, **kwargs):
        try:
            self.append_row(
                "users", 
                _id = kwargs['_id'],
                first_name = kwargs['first_name'],
                middle_name = kwargs['middle_name'],
                last_name = kwargs['last_name'],
                username = kwargs['username'],
                password_hash = kwargs['password_hash'],
                email_address = kwargs['email_address'],
                nickname = kwargs['nickname'],
                educ_level = kwargs['educ_level'],
                major = kwargs['major'],
                occupation = kwargs['occupation'],
                profile_picture = kwargs['profile_picture']
            )

            return True
        except Exception as e:
            print(e)
            return False
    
    def get_user(self, uid):
        try:
            fetched = self.fetch_row("users", _id = uid)

            return fetched
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