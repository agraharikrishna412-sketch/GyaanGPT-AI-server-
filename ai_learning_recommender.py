def recommend_learning_path(progress):
    plan = []
    for subject, records in progress.items():
        avg = sum([r["score"] for r in records]) / len(records)
        if avg < 60:
            plan.append(f"📚 Focus more on {subject} — average {avg:.1f}%")
        elif avg < 80:
            plan.append(f"👍 Good in {subject}, but can improve to reach 90%+.")
        else:
            plan.append(f"🔥 Excellent in {subject}! Keep revising weekly.")
    return plan