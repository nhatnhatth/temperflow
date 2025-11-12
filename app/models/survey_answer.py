from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class SurveyAnswer(Base):
    __tablename__ = "survey_answers"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("survey_sessions.id"))
    question_id = Column(Integer, ForeignKey("survey_questions.id"))
    answer = Column(String, nullable=False)

    session = relationship("SurveySession")
    question = relationship("SurveyQuestion")
