from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.utils.google_auth import verify_google_token
from app.utils.jwt_handler import create_access_token
from app.services.auth_service import get_or_create_user
from app.models.google_login_body import GoogleLoginRequest

import logging

logger = logging.getLogger("uvicorn")

router = APIRouter()

@router.post("/google")
def login_with_google(req: GoogleLoginRequest, db: Session = Depends(get_db)):
    id_token = req.id_token
    logger.info("Received ID token (first 20 chars): %s", id_token[:20])

    google_data = verify_google_token(id_token)
    if not google_data:
        raise HTTPException(status_code=401, detail="Invalid Google token")

    user = get_or_create_user(db, google_data)
    jwt_token = create_access_token({"sub": user.email})
    return {"name": user.name, "mail": user.email, "picture": user.picture}
