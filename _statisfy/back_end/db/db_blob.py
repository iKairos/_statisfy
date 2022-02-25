from azure.storage.blob import ContainerClient
from secret import AZURE_DATASETS_CONTAINER, AZURE_STORAGE_CONN_STRING

class BlobDatabase:
    def upload_dataset(name, blob):
        try:
            dataset_client = ContainerClient.from_connection_string(AZURE_STORAGE_CONN_STRING, AZURE_DATASETS_CONTAINER)

            blob_client = dataset_client.get_blob_client(name)
            blob_client.upload_blob(blob)
        except Exception as e:
            raise e 
    
    def get_dataset(name):
        try:
            dataset_client = ContainerClient.from_connection_string(AZURE_STORAGE_CONN_STRING, AZURE_DATASETS_CONTAINER)

            blob_client = dataset_client.get_blob_client(name)

            return blob_client.url
        except Exception as e :
            raise e 