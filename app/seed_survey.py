from app.database import SessionLocal, engine, Base
from app.models.survey_question import SurveyQuestion

# Tạo DB tables nếu chưa có
Base.metadata.create_all(bind=engine)

# Tạo session DB
db = SessionLocal()

# Danh sách câu hỏi mẫu
questions = [
    {"question_text": "Mức độ tức giận hiện tại của bạn (1–10)", "type": "number"},
    {"question_text": "Bạn có bao nhiêu phút sẵn sàng để làm dịu cơn giận?", "type": "number"},
    {"question_text": "Bạn đang ở địa điểm nào?", "type": "text"},
    {"question_text": "Chọn những cảm xúc bạn đang có (ví dụ: vui, buồn, lo lắng, bình tĩnh)", "type": "choice"},
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
