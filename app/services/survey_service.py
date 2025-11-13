from sqlalchemy.orm import Session
from app.models.survey_question import SurveyQuestion
from app.models.survey_answer import SurveyAnswer
from app.models.survey_session import SurveySession

def get_all_questions(db: Session):
    print("[LOG] Lấy tất cả câu hỏi từ DB")
    questions = db.query(SurveyQuestion).all()
    print(f"[LOG] Số câu hỏi: {len(questions)}")
    return questions

def save_survey(db: Session, user_id: int, answers: list):
    print(f"[LOG] Bắt đầu lưu khảo sát cho user_id={user_id}")
    session = SurveySession(user_id=user_id)
    db.add(session)
    db.commit()
    db.refresh(session)
    print(f"[LOG] Tạo session thành công, session_id={session.id}")

    for ans in answers:
        print(f"[LOG] Lưu câu trả lời: question_id={ans['question_id']}, answer={ans['answer']}")
        survey_answer = SurveyAnswer(
            session_id=session.id,
            question_id=ans["question_id"],
            answer=ans["answer"]
        )
        db.add(survey_answer)

    db.commit()
    print(f"[LOG] Tất cả câu trả lời đã được lưu cho session_id={session.id}")
    return session
