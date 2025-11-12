from sqlalchemy import Column, Integer, String
from app.database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    duration = Column(Integer)  # phút
    description = Column(String)
    type = Column(String)       # "vận động", "thư giãn", "nhận thức"
