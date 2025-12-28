import random
import logging
import google.generativeai as genai
from app.schemas.recommendation_schema import RecommendationTask, RecommendationInput

logger = logging.getLogger("uvicorn")

# Cấu hình API Gemini
genai.configure(api_key="AIzaSyAF1svbzpYBFLOsHdoS5qtMe8QwJuwKEhA")

model = genai.GenerativeModel("gemini-2.5-flash")

TASKS = [
    {"title": "Deep Breathing", "duration": 1, "description": "Take deep breaths for 1 minute", "type": "relaxation"},
    {"title": "Drink Water", "duration": 1, "description": "Drink a glass of water to calm your body", "type": "awareness"},
    {"title": "Neck and Shoulder Stretch", "duration": 2, "description": "Rotate your neck and relax your shoulders", "type": "movement"},
    {"title": "Light Walk", "duration": 2, "description": "Walk around the room to relax", "type": "movement"},
    {"title": "4-Count Breathing", "duration": 3, "description": "Inhale for 4 seconds, exhale for 4 seconds", "type": "relaxation"},
    {"title": "Listen to Soft Music", "duration": 3, "description": "Listen to calming music to stabilize your emotions", "type": "relaxation"},
    {"title": "Quick Emotion Writing", "duration": 4, "description": "Write down your current feelings", "type": "awareness"},
    {"title": "Full Body Stretch", "duration": 4, "description": "Stretch your arms, legs, and back", "type": "movement"},
    {"title": "Take a Walk Outside", "duration": 5, "description": "Go outside and breathe fresh air", "type": "movement"},
    {"title": "Short Meditation", "duration": 5, "description": "Sit quietly and focus on your breathing", "type": "relaxation"},
    {"title": "Call a Close Friend", "duration": 6, "description": "Talk to someone you trust", "type": "social"},
    {"title": "Doodle Freely", "duration": 7, "description": "Draw freely without any goal", "type": "creativity"},
    {"title": "Muscle Stretching", "duration": 8, "description": "Basic full-body muscle stretching", "type": "movement"},
    {"title": "Listen to a Podcast", "duration": 9, "description": "Listen to a positive or relaxing podcast", "type": "awareness"},
    {"title": "Water the Plants", "duration": 10, "description": "Take care of plants to calm your mind", "type": "relaxation"},
    {"title": "Write a Journal", "duration": 11, "description": "Write down things you are grateful for", "type": "awareness"},
    {"title": "Read a Few Pages", "duration": 12, "description": "Read something light or inspiring", "type": "awareness"},
    {"title": "Cook a Simple Dish", "duration": 15, "description": "Prepare a simple meal", "type": "creativity"},
    {"title": "Watch Funny Videos", "duration": 18, "description": "Watch humorous clips to laugh freely", "type": "relaxation"},
    {"title": "Short Exercise Session", "duration": 20, "description": "Light exercise to release energy", "type": "movement"},
]

def recommend_tasks(data: RecommendationInput):
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

    # --- PROMPT GỬI GEMINI ---
    selected_titles = ", ".join([t["title"] for t in selected])
    prompt = f"""
    The user has an anger level of {data.anger_level}, {data.free_time} minutes of free time,
    is currently at {data.location}, and feels: {data.emotions}.
    The suggested activities are: {selected_titles}.
    Write 1–2 sentences of advice to help improve their mental well-being.
    """

    try:
        ai_response = model.generate_content(prompt)
        extra_advice = ai_response.text
    except Exception as e:
        logger.error("Gemini API Error: %s", e)
        extra_advice = "Take a moment to listen to your body and gently relax."

    # 1. Tạo task của Assistant trước
    assistant_task = RecommendationTask(
        id=999, # Nếu model của bạn cần ID, hãy thêm vào
        title="Additional Advice from Gemini Assistant",
        duration=0,
        description=extra_advice,
        type="Assistant",
    )

    # 2. Tạo danh sách các task được chọn từ TASKS
    other_tasks = [RecommendationTask(**t) for t in selected]

    # 3. Gộp Assistant vào ĐẦU danh sách
    result = [assistant_task] + other_tasks

    return result