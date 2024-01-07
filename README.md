# BreakingBarriersChat

# Purpose

This chrome extension was built to help break language barriers by providing a simple way to translate text for different use cases. This extension is able to translate a slang term in english to a similar slang term in French, translating text to the formal meaning in another language, or just understand the semantics and context of what someone said in another language. There is also a way summarize a particular part of a countires culture so that users can understand it better when talking to someone from that country.

# Running this application

1. Intall python 3.12. 

2. Run "pip install -r requirements.txt" in this directory

3. Add your openAPI key to the server.py file in line 11. Example: 'client = OpenAI(api_key="yourkey")'

4. Run Server using "python3 server.py"

5. Go to manage extensions in chrome, enable developer mode, press load unpacked and select this directory

6. You can now highlight text fill out the options and then select one of the buttons in the bottom of the extension

