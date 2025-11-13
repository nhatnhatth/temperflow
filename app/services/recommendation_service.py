import random
from app.schemas.recommendation_schema import RecommendationTask, RecommendationInput

import logging

logger = logging.getLogger("uvicorn")

TASKS = [
    {"title": "Thở sâu", "duration": 1, "description": "Hít thở sâu 1 phút", "type": "thư giãn"},
    {"title": "Uống nước", "duration": 1, "description": "Uống một cốc nước để làm dịu cơ thể", "type": "nhận thức"},
    {"title": "Giãn cổ vai", "duration": 2, "description": "Xoay cổ, thả lỏng vai", "type": "vận động"},
    {"title": "Đi bộ nhẹ", "duration": 2, "description": "Đi quanh phòng để thư giãn", "type": "vận động"},
    {"title": "Hít sâu đếm 4", "duration": 3, "description": "Hít vào 4 giây, thở ra 4 giây", "type": "thư giãn"},
    {"title": "Nghe nhạc nhẹ", "duration": 3, "description": "Nghe nhạc êm dịu giúp ổn định cảm xúc", "type": "thư giãn"},
    {"title": "Viết nhanh cảm xúc", "duration": 4, "description": "Ghi lại cảm xúc hiện tại", "type": "nhận thức"},
    {"title": "Vươn người", "duration": 4, "description": "Duỗi tay chân và lưng", "type": "vận động"},
    {"title": "Đi dạo", "duration": 5, "description": "Đi ra ngoài hít khí trời", "type": "vận động"},
    {"title": "Ngồi thiền ngắn", "duration": 5, "description": "Ngồi yên, tập trung vào hơi thở", "type": "thư giãn"},
    {"title": "Gọi cho bạn thân", "duration": 6, "description": "Nói chuyện với người bạn tin tưởng", "type": "xã hội"},
    {"title": "Vẽ nguệch ngoạc", "duration": 7, "description": "Vẽ tự do không cần mục tiêu", "type": "sáng tạo"},
    {"title": "Tập giãn cơ", "duration": 8, "description": "Giãn cơ toàn thân cơ bản", "type": "vận động"},
    {"title": "Nghe podcast", "duration": 9, "description": "Nghe podcast tích cực hoặc thư giãn", "type": "nhận thức"},
    {"title": "Tưới cây", "duration": 10, "description": "Chăm sóc cây xanh giúp tĩnh tâm", "type": "thư giãn"},
    {"title": "Viết nhật ký", "duration": 11, "description": "Ghi lại những điều khiến bạn biết ơn", "type": "nhận thức"},
    {"title": "Đọc vài trang sách", "duration": 12, "description": "Đọc sách nhẹ nhàng hoặc truyền cảm hứng", "type": "nhận thức"},
    {"title": "Nấu món nhỏ", "duration": 15, "description": "Chuẩn bị món ăn đơn giản", "type": "sáng tạo"},
    {"title": "Xem video hài", "duration": 18, "description": "Xem clip hài hước để cười thoải mái", "type": "thư giãn"},
    {"title": "Tập thể dục ngắn", "duration": 20, "description": "Bài tập nhẹ giúp giải tỏa năng lượng", "type": "vận động"},
]

def recommend_tasks(data: RecommendationInput) -> list[RecommendationTask]:
   
    available_tasks = TASKS.copy()
    random.shuffle(available_tasks)

    target = data.free_time
    selected = []
    total = 0

    while available_tasks and total < target:
        task = random.choice(available_tasks)
        available_tasks.remove(task)

        if total + task["duration"] <= target:
            selected.append(task)
            total += task["duration"]

    if not selected and TASKS:
        smallest = min(TASKS, key=lambda t: t["duration"])
        selected.append(smallest)

    return [RecommendationTask(**t) for t in selected]
