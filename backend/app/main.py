from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from database import engine
from sqlalchemy import text
from schemas import UserCreate
from routes import router
from pathlib import Path

app = FastAPI()

BASE_DIR = Path(__file__).resolve().parents[2]
FRONTEND_DIR = BASE_DIR / "frontend"

app.mount(
    "/static",
    StaticFiles(directory=FRONTEND_DIR),
    name="static"
)

app.include_router(router)

@app.get("/")
def info():
    return {
        "message": "Welcome to LearnHub!"
        }





# Run the application using the command below in your terminal
# uvicorn app.Main:app --reload