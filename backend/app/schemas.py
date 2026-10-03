from pydantic import BaseModel


class UserCreate(BaseModel):
    firstname: str
    lastname: str
    idnumber: str
    email: str
    role: str
    username: str
    address: str
    contactnumber: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str