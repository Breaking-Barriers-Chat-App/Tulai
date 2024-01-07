# BreakingBarriersChat

# Purpose

This chrome extension was built to help break language barriers by providing a simple way to translate text for different use cases. One example of this could be translating a slang term in english to a similar slang term in French, or a way to understand the semantics of what someone said. 

# Running this application

1. Intall python 3.12. 

2. Run "pip install -r requirements.txt" in this directory

3. Add your openAPI key to the server.py file in line 11. Example: 'client = OpenAI(api_key="yourkey")'

4. Run Server using "python3 server.py"

5. Go to manage extensions in chrome, enable developer mode, press load unpacked and select this directory

6. You can now highlight text you see and run the application

