// Following snippet to select text taken from https://stackoverflow.com/questions/68542700/getting-selected-text-in-a-chrome-extension
// Author: Kiaran



document.getElementById("context-btn").onclick = async () => {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true}); // get the active tab in the current window
    let result; // the highlighted text
    // get the highlighted text try/catch is used to ignore an unsupported page like chrome://extensions 
    try {
      [{result}] = await chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: () => getSelection().toString(),
      });
    } catch (e) {
      return; // ignoring an unsupported page like chrome://extensions
    }

    // if the highlighted text is empty, return and do nothing
    document.getElementById("yourText").value =  result; // set the highlighted text to the input box
    document.getElementById("context").innerHTML = ''; // clear the context box
    const myLanguage = document.getElementById("myLanguage").value; // get the language of the highlighted text
    const recipientLanguage = document.getElementById("recpLanguage").value; // get the language of the context box


    // this is the prompt that will be sent to the AI to get the context of the highlighted/selected text
    var promptString = 'Speak to me in ' + myLanguage + ' and tell me in slang the context of the following words that are written in ' + recipientLanguage + ':' + result;

    // send the prompt to the AI and get the response
    var contextualString = await queryOpenAI(promptString);
    // display the response in the context box
    const contextRes = document.getElementById("context").appendChild(document.createTextNode(contextualString));
    console.log('AI Response: success');
  };

  // for the slang-btn and formal-btn, the highlighted text is not needed


  document.getElementById("slang-btn").onclick = async () => {
    const myWords = document.getElementById("yourText").value; // get the text from the input box
    document.getElementById("context").innerHTML = ''; // clear the context box
    const myLanguage = document.getElementById("myLanguage").value; // get the language of the highlighted text
    const recipientLanguage = document.getElementById("recpLanguage").value; // get the language of the context box


    // the prompt that will be sent to the AI to get the slang translation of the selected text
    var promptString = 'I wrote the following words in my language, ' + myLanguage + '. Now, translate it in ' + recipientLanguage + ' slang. Do not add any explanation, just reply the actual translation:' + myWords;

    // send the prompt to the AI and get the response
    var contextualString = await queryOpenAI(promptString);

    // display the response in the context box
    const contextRes = document.getElementById("context").appendChild(document.createTextNode(contextualString));
    console.log('AI Response: success');
  };

  // formal-btn is similar to slang-btn, except for the prompt 
  document.getElementById("formal-btn").onclick = async () => {
    const myWords = document.getElementById("yourText").value;
    document.getElementById("context").innerHTML = '';
    const myLanguage = document.getElementById("myLanguage").value;
    const recipientLanguage = document.getElementById("recpLanguage").value;


    // the prompt that will be sent to the AI to get the formal translation of the selected text
    var promptString = 'I wrote the following words in my language, ' + myLanguage + '. Now, translate it in formal ' + recipientLanguage + '. Do not add any explanation, just reply the actual translation:' + myWords;

    var contextualString = await queryOpenAI(promptString);
    const contextRes = document.getElementById("context").appendChild(document.createTextNode(contextualString));
    console.log('AI Response: success');
  };

  // culture button same functionality as slang-btn and formal-btn, except for the prompt as well
  document.getElementById("culture-btn").onclick = async () => {
    document.getElementById("context").innerHTML = '';
    const myLanguage = document.getElementById("myLanguage").value;
    const recipientLanguage = document.getElementById("recpLanguage").value;
    var topic = document.getElementById("culture").value;
    var country = document.getElementById("country").value;

    // here we are getting the topic and country from the user and sending it to the AI to get the cultural context of the country
    var promptString = 'Speak to me using my language, ' + myLanguage + '. Now, tell me about the country ' + country + '\'s ' + topic;

    var contextualString = await queryOpenAI(promptString);
    const contextRes = document.getElementById("context").appendChild(document.createTextNode(contextualString));
    console.log('AI Response: success');
  };


// queryOpenAI is a function that sends the prompt to the AI and gets the response
async function queryOpenAI(promptString) {
   try {
    const response = await fetch('http://localhost:5000/get-prompt', { // we are using localhost because we are running the AI locally
          method: 'POST', // method: POST means we are sending data to the AI
          
          // we are sending the prompt as a JSON object to the AI
          headers: {
            'Content-Type': 'application/json',
          },
          // the prompt is sent as a JSON object with the key "prompt" and the value is the promptString
          body: JSON.stringify({
            "prompt": promptString // promptString is the prompt that we are sending to the AI
          })
    });
    // the response is received as a JSON object
        const data = await response.json();
        return data; // return the response
  } catch { // if the AI is not working, return "Raining cats" for the context box to debug
        console.error("openAI is not working");
        return "Raining cats";
  }
}

