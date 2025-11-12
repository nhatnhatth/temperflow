from pydantic import BaseModel
from typing import List

class EmotionFeedback(BaseModel):
    user_id: int
    emotions: List[str]  # multiple choice