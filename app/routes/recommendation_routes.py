from fastapi import APIRouter
from app.schemas.recommendation_schema import RecommendationInput, RecommendationTask
from app.services.recommendation_service import recommend_tasks

router = APIRouter()

@router.post("/recommendations", response_model=list[RecommendationTask])
def get_recommendations(data: RecommendationInput):
    tasks = recommend_tasks(data)
    return tasks
