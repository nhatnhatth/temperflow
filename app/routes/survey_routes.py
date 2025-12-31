from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.survey_schema import SurveyQuestionSchema, SurveySubmitSchema
from app.services.survey_service import get_all_questions, save_survey, get_user_answers
from typing import List
from app.schemas.survey_schema import SurveyAnswerWithDate

router = APIRouter()

@router.get("/questions", response_model=list[SurveyQuestionSchema])
def list_survey_questions(db: Session = Depends(get_db)):
    return get_all_questions(db)

@router.post("/answers")
def submit_survey(survey: SurveySubmitSchema, user_id: str, db: Session = Depends(get_db)):
    session = save_survey(db, user_id, [a.dict() for a in survey.answers])
    return {"message": "Survey saved", "session_id": session.id}

@router.get("/user/{user_id}/answers", response_model=List[SurveyAnswerWithDate])
def list_user_answers(user_id: str, db: Session = Depends(get_db)):
    return get_user_answers(db, user_id)