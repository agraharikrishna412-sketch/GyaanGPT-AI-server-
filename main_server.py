from flask import Flask, request, jsonify
from progress_tracker import update_progress, get_user_progress
from leaderboard_system import update_leaderboard, get_top_players
from question_paper_generator import generate_question_paper
from ai_user_chat import handle_user_message
from ai_learning_recommender import recommend_learning_path

app = Flask(__name__)

@app.route("/chat", methods=["POST"])
def chat():
    msg = request.json.get("message", "")
    return jsonify({"reply": handle_user_message(msg)})

@app.route("/question-paper", methods=["GET"])
def question_paper():
    subject = request.args.get("subject", "math")
    paper = generate_question_paper(subject)
    return jsonify(paper)

@app.route("/progress", methods=["POST"])
def progress():
    data = request.json
    msg = update_progress(data["user_id"], data["subject"], data["score"])
    return jsonify({"status": msg})

@app.route("/leaderboard", methods=["GET"])
def leaderboard():
    return jsonify(get_top_players())

@app.route("/recommend", methods=["GET"])
def recommend():
    user_id = request.args.get("user_id", "default")
    user_data = get_user_progress(user_id)
    plan = recommend_learning_path(eval(user_data)) if user_data else []
    return jsonify({"plan": plan})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)