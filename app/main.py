from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import (
    auth_routes,
    survey_routes,
    recommendation_routes,
)
from app.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Temperflow API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

app.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])
app.include_router(survey_routes.router, prefix="/survey", tags=["Survey"])
app.include_router(recommendation_routes.router, prefix="", tags=["Recommendation"])

@app.get("/")
def root():
    return {"message": "Temperflow API running 🚀"}
