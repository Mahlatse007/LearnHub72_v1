from fastapi import FastAPI
from fastapi.responses import FileResponse

from app.database import engine, Base
from app import models

Base.metadata.create_all(bind=engine)
app = FastAPI()

@app.get("/")
def info():
    return {
        "message": "Welcome to LearnHub!"
        }


@app.get("/home")
def home():
    return FileResponse("app/index.html")

# Run the application using the command below in your terminal
# uvicorn app.Main:app --reload