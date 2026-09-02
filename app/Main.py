from fastapi import FastAPI
from fastapi.responses import FileResponse

app = FastAPI()

@app.get("/")
def info():
    return {
        "message": "Welcome to LearnHub!"
        }


@app.get("/home")
def home():
    return FileResponse("app/index.html")


#Fetching all users from the database
@app.get("/users")
def get_users():
    with engine.connect() as connection:
        result = connection.execute("SELECT * FROM users")
        users = [dict(row) for row in result] 
    return users    

# Run the application using the command below in your terminal
# uvicorn app.Main:app --reload