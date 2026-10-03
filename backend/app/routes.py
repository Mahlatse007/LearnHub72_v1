from fastapi import FastAPI
from fastapi import APIRouter
from fastapi.responses import FileResponse
from database import engine
from sqlalchemy import text
from schemas import UserCreate
from pathlib import Path
from fastapi.responses import FileResponse
from schemas import UserLogin

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

@router.get("/register")
def register():
    return FileResponse(FRONTEND_DIR / "register.html")


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


# =========================
# REGISTER USERS
# =========================

@router.post("/users/add-users")
def create_user(user: UserCreate):

    with engine.connect() as connection:

        result = connection.execute(
            text("""
                INSERT INTO users (first_name, last_name, id_number, email, password, role, username, address, contact_numbers)
                VALUES (:firstname, :lastname, :idnumber, :email, :password, :role, :username, :address, :contactnumber)
                RETURNING id, first_name, last_name, id_number, email, role, username, address, contact_numbers
            """),
            {
                "firstname": user.firstname,
                "lastname": user.lastname,
                "idnumber": user.idnumber,
                "email": user.email,
                "password": user.password,
                "role": user.role,
                "username": user.username,
                "address": user.address,
                "contactnumber": user.contactnumber     
            }
        )

        new_user = result.fetchone()

        connection.commit()                                                                                                                                 

        new_user = result.fetchone()

        connection.commit()

#Fetching a specific user from the database
@router.post("/login")
def login_user(user: UserLogin):

    with engine.connect() as connection:

        result = connection.execute(
            text("""
                SELECT
                    id,
                    first_name,
                    last_name,
                    email,
                    role,
                    username,
                    is_active,
                    password
                FROM users
                WHERE email = :email
            """),
            {
                "email": user.email
            }
        )

        existing_user = result.fetchone()

    if existing_user is None:
        return {
            "message": "User does not exist"
        }

    if existing_user.password != user.password:
        return {
            "message": "Incorrect password"
        }

    return {
        "message": "Login successful",
        "user": {
            "id": existing_user.id,
            "first_name": existing_user.first_name,
            "last_name": existing_user.last_name,
            "email": existing_user.email,
            "role": existing_user.role,
            "username": existing_user.username,
            "is_active": existing_user.is_active
        }

# =========================
# TUTORS
# =========================


# =========================
# BOOKINGS
# =========================