from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class SurveySession(Base):
    __tablename__ = "survey_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.google_id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")
