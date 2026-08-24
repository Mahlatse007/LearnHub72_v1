from fastapi import FastAPI
from fastapi.responses import FileResponse

app = FastAPI()

@app.get("/")
def home():
    return {
        "message": "Welcome to LearnHub!"
        }


@app.get("/home")
def about():
    return FileResponse("app/index.html")
# Run the application using the command below in your terminal
# uvicorn app.Main:app --reload