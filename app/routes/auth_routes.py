from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.utils.google_auth import verify_google_token
from app.utils.jwt_handler import create_access_token
from app.services.auth_service import get_or_create_user

router = APIRouter()

@router.post("/google")
def login_with_google(id_token: str, db: Session = Depends(get_db)):
    google_data = verify_google_token(id_token)
    if not google_data:
        raise HTTPException(status_code=401, detail="Invalid Google token")

    user = get_or_create_user(db, google_data)
    jwt_token = create_access_token({"sub": user.email})
    return {"access_token": jwt_token, "user": user.email}
