from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.dialects.sqlite import JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class EmotionLog(Base):
    __tablename__ = "emotion_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    anger_level = Column(Integer)  # 1-10
    mood_tags = Column(String)     # lưu comma-separated hoặc JSON
    context = Column(String)       # vd: "sau khi hoàn thành task X"
