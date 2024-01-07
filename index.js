// Following snippet to select text taken from https://stackoverflow.com/questions/68542700/getting-selected-text-in-a-chrome-extension
// Author: Kiaran
//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


document.getElementById("context-btn").onclick = async () => {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    let result;
    try {
      [{result}] = await chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: () => getSelection().toString(),
      });
    } catch (e) {
      return; // ignoring an unsupported page like chrome://extensions
    }


    document.getElementById("yourText").value =  result;
    document.getElementById("context").innerHTML = '';
    const myLanguage = document.getElementById("myLanguage").value;
    const recipientLanguage = document.getElementById("recpLanguage").value;

    // const { Configuration, OpenAIApi } = require("openai");
    // const configuration = new Configuration({
    //   apiKey: "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",
    // });
    // const openai = new OpenAIApi(configuration);

    var promptString = 'Speak to me in ' + myLanguage + ' and tell me in slang the context of the following words that are written in ' + recipientLanguage + ':' + result;

    var contextualString = await queryOpenAI(promptString);
    const contextRes = document.getElementById("context").appendChild(document.createTextNode(contextualString));
    console.log('AI Response: success');
  };

  document.getElementById("slang-btn").onclick = async () => {
    const myWords = document.getElementById("yourText").value;
    document.getElementById("context").innerHTML = '';
    const myLanguage = document.getElementById("myLanguage").value;
    const recipientLanguage = document.getElementById("recpLanguage").value;

    var promptString = 'I wrote the following words in my language, ' + myLanguage + '. Now, translate it in ' + recipientLanguage + ' slang. Do not add any explanation, just reply the actual translation:' + myWords;

    var contextualString = await queryOpenAI(promptString);
    const contextRes = document.getElementById("context").appendChild(document.createTextNode(contextualString));
    console.log('AI Response: success');
  };

  document.getElementById("formal-btn").onclick = async () => {
    const myWords = document.getElementById("yourText").value;
    document.getElementById("context").innerHTML = '';
    const myLanguage = document.getElementById("myLanguage").value;
    const recipientLanguage = document.getElementById("recpLanguage").value;

    var promptString = 'I wrote the following words in my language, ' + myLanguage + '. Now, translate it in formal ' + recipientLanguage + '. Do not add any explanation, just reply the actual translation:' + myWords;

    var contextualString = await queryOpenAI(promptString);
    const contextRes = document.getElementById("context").appendChild(document.createTextNode(contextualString));
    console.log('AI Response: success');
  };

// async function callOpenAI(text) {
//   const apiKey = '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'; 
//   const context = 'Anong ibig sabihin nito sa Tagalog?: ';
//   var promptText = context.concat(text);
//   const response = await fetch('https://api.openai.com/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${apiKey}`
//     },
//     body: JSON.stringify({
//       model:"gpt-4-turbo",
//       prompt: promptText,
//       max_tokens: 150
//     })
//   });

//   const data = await response.json();
//   return data.choices[0].text.trim();
// }

// const getContext = async (prompt) => {
//   // Make a call to the createCompletion method of the OpenAIApi class
//   // and pass in an object with the desired parameters
//   const response = await openai.createCompletion({
//       model: 'gpt-4 turbo', // specify the model to use
//       prompt: prompt, // specify the prompt
//       temperature: 0.8, // specify the randomness of the generated text
//       max_tokens: 800, // specify the maximum number of tokens to generate
//   });

//   // Return the generated text from the response
//   return response.choices[0].text;
// }

// async function queryOpenAI(promptText) {
//   try{
//   const response = await fetch('http://localhost:5000/api/openai', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         prompt:promptText
//       })
//   });
//       const data = await response.json();
//       return data;  
//   }
//   catch{
//     console.error("openAI is not working");
//     return "Raining cats";
//   }
// }

// async function queryOpenAI(promptString) {
//   // try {
//     const response = await fetch('http://localhost:5000/get-prompt', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ promptString: promptString }),
//     })
//     .then(response => response.json())
//     .then(data => {
//       document.getElementById('context').value = data.choices[0].message.content;
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//         document.getElementById('context').value = "errrrrrr";
//     });
//   //   const data = await response.json();
//   //   return data.choices[0].message.content;
//   // } catch{
//   //       console.error("openAI is not working");
//   //       return "Raining cats";
//   // }
// }

async function queryOpenAI(promptString) {
   try {
    const response = await fetch('http://localhost:5000/get-prompt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "prompt": promptString
          })
    });
        const data = await response.json();
        return data;
  } catch {
        console.error("openAI is not working");
        return "Raining cats";
  }
}

