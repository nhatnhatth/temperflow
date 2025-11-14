from sqlalchemy import Column, Integer, String
from app.database import Base

class User(Base):
    __tablename__ = "users"

    google_id = Column(String, primary_key=True, unique=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    picture = Column(String)
