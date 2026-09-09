from fastapi import FastAPI
from fastapi.responses import FileResponse
from app.database import engine
from sqlalchemy import text
from app.schemas import UserCreate
from app.routes import router

app = FastAPI()
app.include_router(router)

@app.get("/")
def info():
    return {
        "message": "Welcome to LearnHub!"
        }





# Run the application using the command below in your terminal
# uvicorn app.Main:app --reload