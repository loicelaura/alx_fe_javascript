const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Perseverance" },
  ];
  
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById("quoteDisplay").innerHTML = `<p>"${quote.text}" - <strong>${quote.category}</strong></p>`;
  }
  
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  
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
  
    updateQuoteDisplay();
    alert("Quote added successfully!");
  }
  
  function updateQuoteDisplay() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = "";
    quotes.forEach(quote => {
      const quoteElement = document.createElement("p");
      quoteElement.innerHTML = `"${quote.text}" - <strong>${quote.category}</strong>`;
      quoteDisplay.appendChild(quoteElement);
    });
  }
  