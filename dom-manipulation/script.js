
const API_URL = "https://jsonplaceholder.typicode.com/posts";

const quotes = JSON.parse(localStorage.getItem("quotes")) ||[
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Perseverance" },
  ];

  // Fetch quotes from the mock API
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        // Simulating server response with structured data
        const serverQuotes = data.slice(0, 5).map(item => ({
            text: item.title,
            category: "Server Data"
        }));

        mergeQuotes(serverQuotes);
    } catch (error) {
        console.error("Error fetching quotes:", error);
    }
}
// Merge local and server quotes while resolving conflicts
function mergeQuotes(serverQuotes) {
    const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
    
    // Avoid duplicates (compare text property)
    const mergedQuotes = [...new Map([...localQuotes, ...serverQuotes].map(q => [q.text, q])).values()];
    
    localStorage.setItem("quotes", JSON.stringify(mergedQuotes));
    updateQuoteDisplay();
}

// Post new quotes to server (Simulation)
async function postQuoteToServer(quote) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(quote),
        });
        const data = await response.json();
        console.log("Posted to server:", data);
    } catch (error) {
        console.error("Error posting quote:", error);
    }
}


  // Save quotes to localStorage
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}
// Populate category dropdown dynamically
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = ["all", ...new Set(quotes.map(q => q.category))];

  categoryFilter.innerHTML = categories
      .map(category => `<option value="${category}">${category}</option>`)
      .join("");

  // Restore last selected category
  const lastSelected = localStorage.getItem("selectedCategory") || "all";
  categoryFilter.value = lastSelected;
}

// Filter quotes based on selected category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory);
  updateQuoteDisplay();
}

 
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById("quoteDisplay").innerHTML = `<p>"${quote.text}" - <strong>${quote.category}</strong></p>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    createAddQuoteForm();
    const lastQuote = JSON.parse(sessionStorage.getItem("lastQuote"));
    if (lastQuote) {
        document.getElementById("quoteDisplay").innerHTML = `<p>"${lastQuote.text}" - <strong>${lastQuote.category}</strong></p>`;
    }
});

  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  
  function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();
  
    if (newQuoteText === "" || newQuoteCategory === "") {
      alert("Please enter both a quote and a category.");
      return;
    }
    postQuoteToServer(newQuote); // Simulate posting to server
  
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
  
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  
    updateQuoteDisplay();
    alert("Quote added successfully!");

    updateQuoteDisplay();
    populateCategories(); // Update the category dropdown
    alert("Quote added successfully!");
  }

  // Periodic syncing with the server (every 10 seconds)
setInterval(fetchQuotesFromServer, 10000);

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
    fetchQuotesFromServer();
    populateCategories();
    updateQuoteDisplay();
});
  
  function updateQuoteDisplay() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = "";
    quotes.forEach(quote => {
      const quoteElement = document.createElement("p");
      quoteElement.innerHTML = `"${quote.text}" - <strong>${quote.category}</strong>`;
      quoteDisplay.appendChild(quoteElement);
    });
  }
// Export quotes to JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
      try {
          const importedQuotes = JSON.parse(event.target.result);
          if (!Array.isArray(importedQuotes)) throw new Error("Invalid file format");
          quotes.push(...importedQuotes);
          saveQuotes();
          alert("Quotes imported successfully!");
      } catch (error) {
          alert("Error importing quotes: " + error.message);
      }
  };
  fileReader.readAsText(event.target.files[0]);
}
// Dynamically create the form when page loads
  function createAddQuoteForm() {
    const formContainer = document.createElement("div");
  
    const quoteInput = document.createElement("input");
    quoteInput.id = "newQuoteText";
    quoteInput.type = "text";
    quoteInput.placeholder = "Enter a new quote";
  
    const categoryInput = document.createElement("input");
    categoryInput.id = "newQuoteCategory";
    categoryInput.type = "text";
    categoryInput.placeholder = "Enter quote category";
  
    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";
    addButton.addEventListener("click", addQuote);
  
    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);
  
    document.body.appendChild(formContainer);
  }
  
  // Call this function when the page loads to dynamically create the form
  document.addEventListener("DOMContentLoaded", createAddQuoteForm);