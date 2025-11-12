from pydantic import BaseModel
from typing import List, Optional

class RecommendationTask(BaseModel):
    title: str
    duration: int          # phút
    description: str
    type: str             # ví dụ: "vận động", "thư giãn", "nhận thức"

class RecommendationInput(BaseModel):
    anger_level: int       # 1–10
    free_time: int         # phút
    location: Optional[str] = None
    emotions: Optional[List[str]] = []
