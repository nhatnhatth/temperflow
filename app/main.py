from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import (
    auth_routes,
    user_routes,
    survey_routes,
    recommendation_routes,
    task_routes,
    feedback_routes,
)
from app.database import Base, engine

# Tạo DB tables nếu chưa có
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Temperflow API")

# 🧩 Thêm CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],   # Cho phép GET, POST, PUT, DELETE,...
    allow_headers=["*"],   # Cho phép tất cả header
)

# Include các router
app.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])
app.include_router(user_routes.router, prefix="/user", tags=["User"])
app.include_router(survey_routes.router, prefix="/survey", tags=["Survey"])
app.include_router(recommendation_routes.router, prefix="", tags=["Recommendation"])
app.include_router(task_routes.router, prefix="", tags=["Task"])
app.include_router(feedback_routes.router, prefix="", tags=["Feedback"])

# (Tùy chọn) Endpoint kiểm tra nhanh
@app.get("/")
def root():
    return {"message": "Temperflow API running 🚀"}
