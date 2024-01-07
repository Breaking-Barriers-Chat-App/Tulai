
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import requests



app = Flask(__name__)
CORS(app)
client = OpenAI()

# Endpoint to handle requests from the Chrome extension
@app.route('/get-prompt', methods=['POST'])
def get_prompt():
    data = request.json
    prompt = data.get('prompt')
    completion = client.chat.completions.create(
        model="gpt-4-1106-preview",
        messages=[
            {"role": "user", "content": prompt},
        ]
    )
    return jsonify(completion.choices[0].message.content)

if __name__ == '__main__':
    app.run(debug=True)
