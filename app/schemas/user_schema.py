from pydantic import BaseModel

class UserBase(BaseModel):
    name: str
    email: str
    picture: str | None = None

class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True
