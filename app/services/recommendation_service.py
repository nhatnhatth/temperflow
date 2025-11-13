import random
import requests
import json
import logging
from app.schemas.recommendation_schema import RecommendationTask, RecommendationInput

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

API_KEY = "AIzaSyAOYmNFubyVqVDCJphp5CMYvNRTh7_wbsc"  # Gemini API Key

def recommend_tasks(data: RecommendationInput) -> list[RecommendationTask]:
    """
    Trả về danh sách task gốc dựa trên thời gian + 1 task Gemini dựa trên survey.
    Ghi log task Gemini ra console.
    """
    # --- Task gốc ---
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
        selected.append(min(TASKS, key=lambda t: t["duration"]))

    # --- Task Gemini ---
    print(f"[Gemini Input] Data: {data}")

    if data:
        print("[Gemini] Gọi API Gemini để tạo task cá nhân hóa...")

        # Chuyển data thành dict nếu là object
        data_dict = vars(data) if not isinstance(data, dict) else data

        prompt = (
            f"Đưa ra các lời khuyên giúp user thư giãn hoặc cải thiện tâm trạng dựa trên các thông tin sau:\n"
            f"{data_dict}\n"
            f"Hãy trả về JSON chuẩn: {{\"title\": ..., \"description\": ..., \"type\": ..., \"duration\": ...}}"
        )

        url = "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate"
        headers = {"Authorization": f"Bearer {API_KEY}"}
        payload = {"prompt": {"text": prompt}, "temperature": 0.7, "maxOutputTokens": 200}

        try:
            response = requests.post(url, json=payload, headers=headers, timeout=10)
            response.raise_for_status()
            result = response.json()
            text = result["candidates"][0]["content"][0]["text"]
            print(f"[Gemini Response] {text}")
            
            # Chuyển JSON từ string sang dict
            ai_task = json.loads(text)

        except Exception as e:
            logger.warning(f"Gemini API error: {e}")
            ai_task = {
                "title": "Ngồi thiền nhanh",
                "description": "Dành 3 phút ngồi thiền tập trung hơi thở",
                "type": "thư giãn",
                "duration": 3
            }

        # Thêm task Gemini vào danh sách
        selected.append(ai_task)
        print(f"[Gemini Task] {ai_task['title']} - {ai_task['description']} ({ai_task['type']}, {ai_task['duration']} phút)")


    return [RecommendationTask(**t) for t in selected]
