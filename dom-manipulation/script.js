const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];


function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();
  
    if (newQuoteText === "" || newQuoteCategory === "") {
      alert("Please enter both a quote and a category.");
      return;
    }
  
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
  
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    updateQuoteDisplay();  // Ensure the display updates immediately
}


function updateQuoteDisplay() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = ""; // Clear previous quotes

    quotes.forEach(quote => {
        const quoteElement = document.createElement("p");
        quoteElement.innerHTML = "${quote.text}" - <strong>${quote.category}</strong>;
        quoteDisplay.appendChild(quoteElement);
    });
}