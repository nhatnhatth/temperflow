from sqlalchemy.orm import Session
from app.models.emotion_log import EmotionLog
from datetime import datetime
from collections import defaultdict

def log_emotion(db: Session, data: EmotionLog):
    log = EmotionLog(
        user_id=data.user_id,
        anger_level=data.anger_level,
        mood_tags=",".join(data.mood_tags),
        context=data.context
    )
    db.add(log)
    db.commit()
    db.refresh(log)
    return log

def get_emotion_logs(db: Session, user_id: int):
    return db.query(EmotionLog).filter(EmotionLog.user_id==user_id).order_by(EmotionLog.timestamp.asc()).all()

def get_emotion_stats(db: Session, user_id: int, period="day"):
    logs = get_emotion_logs(db, user_id)
    stats = defaultdict(list)

    for log in logs:
        if period == "day":
            key = log.timestamp.strftime("%Y-%m-%d")
        elif period == "week":
            key = log.timestamp.strftime("%Y-%U")  # year-weeknumber
        elif period == "month":
            key = log.timestamp.strftime("%Y-%m")
        else:
            key = log.timestamp.strftime("%Y-%m-%d")
        stats[key].append(log.anger_level)

    result = []
    for k, v in stats.items():
        result.append({
            "date": k,
            "avg_anger": sum(v)/len(v),
            "count": len(v)
        })
    return result
