from pydantic import BaseModel

class UserCreate(BaseModel):
    firstname: str
    lastname: str
    id: int
    email: str
    password: str
    role: str