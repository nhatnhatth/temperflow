from pydantic import BaseModel

class TaskInput(BaseModel):
    task_id: int

class TaskHistory(BaseModel):
    task_id: int
    title: str
    status: str
    timestamp: str