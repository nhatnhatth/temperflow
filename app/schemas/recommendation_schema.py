from pydantic import BaseModel
from typing import List, Optional

class RecommendationTask(BaseModel):
    title: str
    duration: int        
    description: str
    type: str

class RecommendationInput(BaseModel):
    anger_level: int
    free_time: int      
    location: Optional[str] = None
    emotions: Optional[List[str]] = []
