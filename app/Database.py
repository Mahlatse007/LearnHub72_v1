import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

load_dotenv()

DB_HOST = os.getenv("learnhub_db_host")
DB_PORT = os.getenv("learnhub_db_port")
DB_NAME = os.getenv("learnhub_db_name")
DB_USER = os.getenv("learnhub_db_user")
DB_PASSWORD = os.getenv("learnhub_db_password") 

#postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE
DATABASE_URL = (
    f"postgresql://{DB_USER}:{DB_PASSWORD}"
    f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)

engine = create_engine(DATABASE_URL, echo=True)

# Test the connection
try:
       with engine.connect() as connection:
        print("Database connection successful!")
except Exception as e:
    print(f"Error connecting to the database: {e}")