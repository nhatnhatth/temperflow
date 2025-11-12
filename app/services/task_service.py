from sqlalchemy.orm import Session
from app.models.task import Task
from app.models.user_task import UserTask
from app.models.motivation import Motivation
import random
from datetime import datetime

def start_task(db: Session, user_id: int, task_id: int):
    user_task = UserTask(user_id=user_id, task_id=task_id, status="started")
    db.add(user_task)
    db.commit()
    db.refresh(user_task)
    return user_task

def complete_task(db: Session, user_id: int, task_id: int):
    task_entry = db.query(UserTask).filter(
        UserTask.user_id==user_id, UserTask.task_id==task_id
    ).first()
    if task_entry:
        task_entry.status = "completed"
        task_entry.timestamp = datetime.utcnow()
        db.commit()
        db.refresh(task_entry)
        return task_entry
    return None

def get_task_history(db: Session, user_id: int):
    return db.query(UserTask).filter(UserTask.user_id==user_id).all()

def get_random_motivation(db: Session):
    all_motivations = db.query(Motivation).all()
    return random.choice(all_motivations) if all_motivations else None
