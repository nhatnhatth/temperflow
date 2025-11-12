from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.feedback_schema import EmotionFeedback

router = APIRouter()

@router.post("/feedback/emotion")
def submit_emotion_feedback(feedback: EmotionFeedback, db: Session = Depends(get_db)):
    # TODO: lưu vào bảng emotion feedback nếu muốn
    # hiện tại chỉ trả confirm
    return {"message": "Feedback received", "emotions": feedback.emotions}
