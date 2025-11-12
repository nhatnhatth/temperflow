from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class EmotionLogInput(BaseModel):
    user_id: int
    anger_level: int
    mood_tags: Optional[List[str]] = []
    context: Optional[str] = None

class EmotionLogOutput(BaseModel):
    timestamp: datetime
    anger_level: int
    mood_tags: List[str]
    context: Optional[str]

class EmotionStats(BaseModel):
    date: str
    avg_anger: float
    count: int
