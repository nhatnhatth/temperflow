from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.survey_schema import SurveyQuestionSchema, SurveySubmitSchema
from app.services.survey_service import get_all_questions, save_survey

router = APIRouter()

@router.get("/questions", response_model=list[SurveyQuestionSchema])
def list_survey_questions(db: Session = Depends(get_db)):
    return get_all_questions(db)

@router.post("/answers")
def submit_survey(survey: SurveySubmitSchema, user_id: int = 1, db: Session = Depends(get_db)):
    # user_id ở đây tạm hardcode; sau này dùng JWT auth
    session = save_survey(db, user_id, [a.dict() for a in survey.answers])
    return {"message": "Survey saved", "session_id": session.id}
