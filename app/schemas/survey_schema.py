from pydantic import BaseModel
from typing import List
from datetime import datetime

class SurveyQuestionSchema(BaseModel):
    id: int
    question_text: str
    type: str

    class Config:
        orm_mode = True

class SurveyAnswerInput(BaseModel):
    question_id: int
    answer: str

class SurveySubmitSchema(BaseModel):
    answers: List[SurveyAnswerInput]

class SurveyAnswerWithDate(BaseModel):
    question_id: int
    answer: str
    answered_at: datetime

    class Config:
        orm_mode = True
