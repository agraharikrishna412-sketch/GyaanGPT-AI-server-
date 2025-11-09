import json
from datetime import datetime

def backup_data(data, filename="backup.json"):
    with open(filename, "w") as f:
        json.dump(data, f, indent=2)
    return f"✅ Backup saved as {filename} at {datetime.now().strftime('%H:%M:%S')}"

def restore_backup(filename="backup.json"):
    try:
        with open(filename, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return {}