import random
from ai_core_engine import ai_generate_question, ai_predict_chances

def generate_question_paper(subject, num_questions=5):
    paper = []
    for _ in range(num_questions):
        q = ai_generate_question(subject)
        chance = ai_predict_chances(subject)
        paper.append({"question": q, "chance": f"{chance}%"})
    return {"subject": subject.title(), "questions": paper}