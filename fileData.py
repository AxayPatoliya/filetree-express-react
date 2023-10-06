from flask import Flask, jsonify
import os

app = Flask(__name__)

# Recursive function to list files and directories with contents
def list_files_and_directories(folder_path, parent_url):
    file_details = []
    for entry in os.listdir(folder_path):
        entry_path = os.path.join(folder_path, entry)
        entry_info = {
            "name": entry,
            "is_directory": os.path.isdir(entry_path),
            "url": os.path.join(parent_url, entry),
        }
        if entry_info["is_directory"]:
            entry_info["contents"] = list_files_and_directories(entry_path, entry_info["url"])
        else:
            entry_info["size"] = os.path.getsize(entry_path)
        file_details.append(entry_info)
    return file_details

@app.route("/getFiles")
def get_files():
    folder_path = "C://kafka_project//flask-routings//kafka_flask"  # Change this to the folder you want to list

    try:
        file_details = list_files_and_directories(folder_path, folder_path)
        return jsonify(file_details)
    except Exception as e:
        print(str(e))
        return jsonify({"error": "Unable to retrieve file list"}), 500

if __name__ == "__main__":
    app.run(debug=True)
