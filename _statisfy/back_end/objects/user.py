from db import db_users
from db import db_authors
import jwt, datetime, bcrypt

class User:
    def __init__(self, uid = None):
        self.db = db_users.UsersBackbone()
        self.rdb = db_authors.AuthorsBackbone()
        self.uid = uid
    
    @property
    def first_name(self):
        return self.db.get_first_name(self.uid)
    
    @property
    def middle_name(self):
        return self.db.get_middle_name(self.uid)
    
    @property
    def last_name(self):
        return self.db.get_last_name(self.uid)
    
    @property
    def username(self):
        return self.db.get_username(self.uid)
    
    @property
    def password_hash(self):
        return self.db.get_password_hash(self.uid)
    
    @property
    def email_address(self):
        return self.db.get_email_address(self.uid)
    
    @property
    def nickname(self):
        return self.db.get_nickname(self.uid)
    
    @property
    def educ_level(self):
        return self.db.get_educ_level(self.uid)
    
    @property
    def major(self):
        return self.db.get_major(self.uid)
    
    @property
    def occupation(self):
        return self.db.get_occupation(self.uid)
    
    @property
    def profile_picture(self):
        return self.db.get_profile_pic_directory(self.uid)
    
    @property
    def is_registered(self):
        return self.db.is_registered(self.uid)
    
    @property
    def research_papers(self):
        return self.rdb.get_researches_author(self.uid)
    
    @property
    def created_at(self):
        return self.db.get_created_at(self.uid)
    
    @property
    def bio(self):
        return self.db.get_bio(self.uid)
    
    def set_first_name(self, new_first_name):
        return self.db.set_first_name(self.uid, new_first_name)
    
    def set_middle_name(self, new_middle_name):
        return self.db.set_middle_name(self.uid, new_middle_name)
    
    def set_last_name(self, new_last_name):
        return self.db.set_last_name(self.uid, new_last_name)
    
    def set_username(self, new_username):
        return self.db.set_username(self.uid, new_username)
    
    def set_password_hash(self, new_password_hash):
        return self.db.set_password_hash(self.uid, new_password_hash)
    
    def set_email_address(self, new_email_address):
        return self.db.set_email_address(self.uid, new_email_address)
    
    def set_nickname(self, new_nickname):
        return self.db.set_nickname(self.uid, new_nickname)
    
    def set_educ_level(self, new_educ_level):
        return self.db.set_educ_level(self.uid, new_educ_level)
    
    def set_major(self, new_major):
        return self.db.set_major(self.uid, new_major)
    
    def set_occupation(self, new_occupation):
        return self.db.set_occupation(self.uid, new_occupation)
    
    def set_profile_picture(self, new_profile_picture):
        return self.db.set_profile_picture(self.uid, new_profile_picture)
    
    def set_bio(self, new_bio):
        return self.db.set_bio(self.uid, new_bio)
    
    def check_availability(param, value):
        db = db_users.UsersBackbone()
        
        return True if db.get_user(param, value) is None else False
    
    def register_user(**kwargs):
        db = db_users.UsersBackbone()

        return db.register_user(
                _id = kwargs['_id'],
                first_name = kwargs['first_name'],
                middle_name = kwargs['middle_name'],
                last_name = kwargs['last_name'],
                username = kwargs['username'],
                password_hash = kwargs['password_hash'],
                email_address = kwargs['email_address'],
                created_at = kwargs['created_at']
            )
    
    def authenticate(username, password, secret_key):
        db = db_users.UsersBackbone()

        user = db.get_user("uname", username)

        if user is None:
            return False, "Username does not match any account.", None

        pword = user[5]

        if not bcrypt.checkpw(password.encode('utf-8'), pword.encode('utf-8')):
            return False, "Credentials failed to authenticate.", None
        
        try:
            payload = {
                'sub': user[0]
            } 
                                
            token = jwt.encode(
                payload,
                secret_key,
                algorithm='HS256'
            )
        except Exception as e:
            return False, f"Token generation failed returning with error message: {e}.", None
        
        return True, user[0], token
    
    @staticmethod
    def decode_auth_token(auth_token, secret_key):
        try:
            payload = jwt.decode(auth_token, secret_key, ['HS256'])

            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Token already expired.'
        except jwt.InvalidTokenError:
            return f'Token is not valid. Token value: {auth_token}'