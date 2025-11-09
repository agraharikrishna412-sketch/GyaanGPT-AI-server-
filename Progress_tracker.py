import json
from datetime import datetime

progress_data = {}

def update_progress(user_id, subject, score):
    if user_id not in progress_data:
        progress_data[user_id] = {}
    if subject not in progress_data[user_id]:
        progress_data[user_id][subject] = []
    progress_data[user_id][subject].append({
        "score": score,
        "time": datetime.now().strftime("%Y-%m-%d %H:%M")
    })
    return "Progress updated successfully!"

def get_user_progress(user_id):
    return json.dumps(progress_data.get(user_id, {}), indent=2)