from sqlalchemy import Column, Integer, String
from app.database import Base

class SurveyQuestion(Base):
    __tablename__ = "survey_questions"

    id = Column(Integer, primary_key=True, index=True)
    question_text = Column(String, nullable=False)
    type = Column(String, default="text")
