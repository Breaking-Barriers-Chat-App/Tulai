# Description: This file contains the Flask server that handles requests from the Chrome extension.
# It takes in a prompt from the Chrome extension and uses OpenAI's API to generate a response.
# The response is then sent back to the Chrome extension.

# import flask and flask_cors to handle requests from the Chrome extension
# import OpenAI to use the API 
# import requests to make requests to the API
# import jsonify to send the response back to the Chrome extension
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import requests


# Initialize the Flask server and the OpenAI client
app = Flask(__name__)
CORS(app) # Allow CORS so that requests from the Chrome extension can be handled
client = OpenAI()

# Endpoint to handle requests from the Chrome extension
@app.route('/get-prompt', methods=['POST']) # Only accept POST requests from the Chrome extension
def get_prompt(): 
    data = request.json # Get the prompt from the Chrome extension
    prompt = data.get('prompt') # Get the prompt from the JSON data
    completion = client.chat.completions.create( # Use the OpenAI API to generate a response
        model="gpt-4-1106-preview", # state the model to use which is chatgpt 4 
        messages=[ # state the prompt to use
            {"role": "user", "content": prompt},
        ]
    )
    return jsonify(completion.choices[0].message.content) # return the response of the API to the Chrome extension

if __name__ == '__main__':
    app.run(debug=True)
