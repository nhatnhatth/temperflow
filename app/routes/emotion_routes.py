from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.emotion_schema import EmotionLogInput, EmotionLogOutput, EmotionStats
from app.services.emotion_service import log_emotion, get_emotion_logs, get_emotion_stats

router = APIRouter()

@router.post("/emotion/log", response_model=EmotionLogOutput)
def api_log_emotion(data: EmotionLogInput, db: Session = Depends(get_db)):
    log = log_emotion(db, data)
    return EmotionLogOutput(
        timestamp=log.timestamp,
        anger_level=log.anger_level,
        mood_tags=log.mood_tags.split(",") if log.mood_tags else [],
        context=log.context
    )

@router.get("/emotion/stats", response_model=List[EmotionStats])
def api_emotion_stats(user_id: int, period: str = "day", db: Session = Depends(get_db)):
    return get_emotion_stats(db, user_id, period)

@router.get("/emotion/chart")
def api_emotion_chart(user_id: int, period: str = "day", db: Session = Depends(get_db)):
    # trả dữ liệu dạng {labels: [...], data: [...]}, tiện frontend vẽ biểu đồ
    stats = get_emotion_stats(db, user_id, period)
    labels = [s["date"] for s in stats]
    data = [s["avg_anger"] for s in stats]
    return {"labels": labels, "data": data}
