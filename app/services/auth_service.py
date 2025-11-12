from sqlalchemy.orm import Session
from app.models.user import User

def get_or_create_user(db: Session, google_data: dict):
    user = db.query(User).filter(User.email == google_data["email"]).first()
    if not user:
        user = User(
            google_id=google_data["sub"],
            name=google_data["name"],
            email=google_data["email"],
            picture=google_data.get("picture"),
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    return user
