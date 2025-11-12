from sqlalchemy.orm import Session
from app.models.survey_question import SurveyQuestion
from app.models.survey_answer import SurveyAnswer
from app.models.survey_session import SurveySession

def get_all_questions(db: Session):
    return db.query(SurveyQuestion).all()

def save_survey(db: Session, user_id: int, answers: list):
    session = SurveySession(user_id=user_id)
    db.add(session)
    db.commit()
    db.refresh(session)

    for ans in answers:
        survey_answer = SurveyAnswer(
            session_id=session.id,
            question_id=ans["question_id"],
            answer=ans["answer"]
        )
        db.add(survey_answer)
    db.commit()
    return session
