const contextBtn = document.getElementById("context-btn")

contextBtn.addEventListener("click", async function(){
    var highlightedText = window.getSelection().toString();
    if (highlightedText.length > 0) {
        console.log(window.getSelection().toString())
    // Additional actions with the AI response
    }
    
})