// Description: content.js is the script responsible for the highlighted text functionality


const contextBtn = document.getElementById("context-btn")

// the contextBtn is the button that will be clicked to send the highlighted text to the AI
// the highlighted text will be sent to the AI and the AI will return a response
contextBtn.addEventListener("click", async function(){
    var highlightedText = window.getSelection().toString();
    if (highlightedText.length > 0) {
        console.log(window.getSelection().toString())
    // Additional actions with the AI response
    }
    
})