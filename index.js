// Following snippet to select text taken from https://stackoverflow.com/questions/68542700/getting-selected-text-in-a-chrome-extension
// Author: Kiaran
//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

document.getElementById("save-btn").onclick = async () => {
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
    document.body.append('Selection: ' + result);
    const aiResponse = await callOpenAI(highlightedText);

    document.body.append('Context: ' + aiResponse);
    // console.log('AI Response:', aiResponse);
  };

async function callOpenAI(text) {
  const apiKey = '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'; 
  const context = 'Anong ibig sabihin nito sa Tagalog?: ';
  var promptText = context.concat(text);
  const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: promptText,
      max_tokens: 150
    })
  });

  const data = await response.json();
  return data.choices[0].text;
}