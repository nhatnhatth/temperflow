import requests
from app.config import settings

def verify_google_token(id_token: str):
    response = requests.get(
        f"https://oauth2.googleapis.com/tokeninfo?id_token={id_token}"
    )

    if response.status_code != 200:
        return None

    data = response.json()
    if data["aud"] != settings.GOOGLE_CLIENT_ID:
        return None
    return data
