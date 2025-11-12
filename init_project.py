# init_project.py
import os

folders = [
    "app",
    "app/routes",
    "app/services",
]
files = {
    "app/__init__.py": "",
    "app/main.py": "from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get('/')\ndef root():\n    return {'message': 'Temperflow API running!'}",
    "app/models.py": "# SQLAlchemy models here",
    "app/schemas.py": "# Pydantic schemas here",
    "app/deps.py": "# Dependencies here",
    "app/auth_google.py": "# Google OAuth config here",
    "app/routes/auth.py": "# /auth endpoints",
    "app/routes/survey.py": "# /survey endpoints",
    "app/routes/analytics.py": "# /analytics endpoints",
    "app/services/tasks_generator.py": "# logic tạo task ở đây",
    "requirements.txt": "fastapi\nuvicorn[standard]\nauthlib\npython-dotenv\nsqlalchemy\nalembic\npsycopg2-binary\npydantic\npyjwt\nhttpx\n",
    "Dockerfile": "FROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nEXPOSE 8000\nCMD ['uvicorn', 'app.main:app', '--host', '0.0.0.0', '--port', '8000']",
    ".env": "SECRET_KEY=changeme\nGOOGLE_CLIENT_ID=\nGOOGLE_CLIENT_SECRET=\nGOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback\nDATABASE_URL=sqlite:///./dev.db",
}

for f in folders:
    os.makedirs(f, exist_ok=True)

for path, content in files.items():
    with open(path, "w", encoding="utf-8") as fp:
        fp.write(content)

print("✅ Project structure generated successfully!")
