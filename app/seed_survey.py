from app.database import SessionLocal, engine, Base
from app.models.survey_question import SurveyQuestion

# Tạo DB tables nếu chưa có
Base.metadata.create_all(bind=engine)

# Tạo session DB
db = SessionLocal()

# Danh sách câu hỏi mẫu
questions = [
    {"question_text": "What is your current anger level (1–10)?", "type": "level"},
    {"question_text": "How many minutes are you willing to spend to calm down?", "type": "time"},
    {"question_text": "Where are you currently located?", "type": "where"},
]

# Chèn vào DB
for q in questions:
    existing = db.query(SurveyQuestion).filter(SurveyQuestion.question_text == q["question_text"]).first()
    if not existing:
        question = SurveyQuestion(**q)
        db.add(question)

db.commit()
db.close()
print("Survey questions seeded successfully!")
