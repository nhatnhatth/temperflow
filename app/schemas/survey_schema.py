from pydantic import BaseModel
from typing import List

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
