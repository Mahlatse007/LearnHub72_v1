from fastapi import FastAPI
from fastapi import APIRouter
from fastapi.responses import FileResponse
from database import engine
from sqlalchemy import text
from schemas import UserCreate
from pathlib import Path
from fastapi.responses import FileResponse

BASE_DIR = Path(__file__).resolve().parents[2]
FRONTEND_DIR = BASE_DIR / "frontend"

router = APIRouter()

@router.get("/home")
def home():
    return FileResponse(FRONTEND_DIR / "index.html")

@router.get("/login")
def login():
    return FileResponse(FRONTEND_DIR / "login.html")

@router.get("/admin")
def admin():
    return FileResponse(FRONTEND_DIR / "admin.html")

# =========================
# USERS
# =========================

#Fetching all users from the database
@router.get("/users")
def get_users():
    with engine.connect() as connection:
        sql = text("SELECT * FROM users")
        result = connection.execute(sql)
        users = [dict(row._mapping) for row in result]

    return users

@router.post("/users/add-users")
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

# =========================
# TUTORS
# =========================


# =========================
# BOOKINGS
# =========================