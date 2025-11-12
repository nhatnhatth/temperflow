from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.task_schema import TaskInput, TaskHistory
from app.services.task_service import start_task, complete_task, get_task_history, get_random_motivation

router = APIRouter()

@router.post("/tasks/start")
def api_start_task(task: TaskInput, db: Session = Depends(get_db)):
    user_id = 1  # TODO: lấy từ JWT sau
    return start_task(db, user_id, task.task_id)

@router.post("/tasks/complete")
def api_complete_task(task: TaskInput, db: Session = Depends(get_db)):
    user_id = 1
    task_entry = complete_task(db, user_id, task.task_id)
    motivation = get_random_motivation(db)
    return {"task": task_entry, "motivation": motivation.text if motivation else ""}

@router.get("/tasks/history", response_model=list[TaskHistory])
def api_task_history(db: Session = Depends(get_db)):
    user_id = 1
    tasks = get_task_history(db, user_id)
    return [
        TaskHistory(
            task_id=t.task_id,
            title=t.task.title,
            status=t.status,
            timestamp=str(t.timestamp)
        ) for t in tasks
    ]

@router.get("/motivations/random")
def api_random_motivation(db: Session = Depends(get_db)):
    motivation = get_random_motivation(db)
    return {"text": motivation.text if motivation else ""}
