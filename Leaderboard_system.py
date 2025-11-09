leaderboard = {}

def update_leaderboard(user_name, total_score):
    leaderboard[user_name] = total_score
    sorted_lb = dict(sorted(leaderboard.items(), key=lambda x: x[1], reverse=True))
    return sorted_lb

def get_top_players(limit=5):
    return list(leaderboard.items())[:limit]