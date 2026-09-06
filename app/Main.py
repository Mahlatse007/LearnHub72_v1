from fastapi import FastAPI
from fastapi.responses import FileResponse
from app.database import engine
from sqlalchemy import text
from app.schemas import UserCreate

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
        sql = text("SELECT * FROM users")
        result = connection.execute(sql)
        users = [dict(row._mapping) for row in result]

    return users

@app.post("/userss")
def create_user(user: UserCreate):

    with engine.connect() as connection:

        result = connection.execute(
            text("""
                INSERT INTO users (firstname, lastname, email, password, role)
                VALUES (:firstname, :lastname, :email, :password, :role)
                RETURNING id, firstname, lastname, email, role, is_active
            """),
            {
                "firstname": user.firstname,
                "lastname": user.lastname,
                "email": user.email,
                "password": user.password,
                "role": user.role
            }
        )

        new_user = result.fetchone()

        connection.commit()                                                                                                                                 

        new_user = result.fetchone()

        connection.commit()

    return dict(new_user._mapping)














# Run the application using the command below in your terminal
# uvicorn app.Main:app --reload