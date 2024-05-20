let favoriteQuotes = [];

function getQuotes() {
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=displayQuotes';
    const script = document.createElement('script');
    script.src = apiUrl;
    document.body.appendChild(script);
}

function displayQuotes(quote) {
    const quoteContainer = document.getElementById("quote-container");
    quoteContainer.innerHTML = "";

    const card = document.createElement("div");
    card.classList.add("card");

    const quoteContent = document.createElement("div");
    quoteContent.classList.add("quote-content");

    const quoteText = document.createElement("p");
    quoteText.classList.add("quote-text");
    quoteText.textContent = quote.quoteText;

    const quoteFooter = document.createElement("div");
    quoteFooter.classList.add("quote-footer");

    const quoteAuthor = document.createElement("p");
    quoteAuthor.classList.add("quote-author");
    quoteAuthor.textContent = `- ${quote.quoteAuthor}`;

    const heartIcon = document.createElement("i");
    heartIcon.classList.add("far", "fa-heart");
    heartIcon.addEventListener("click", function() {
        toggleFavorite(quote);
        heartIcon.classList.toggle("fas");
    });

    quoteContent.appendChild(quoteText);
    quoteFooter.appendChild(quoteAuthor);
    quoteFooter.appendChild(heartIcon);

    card.appendChild(quoteContent);
    card.appendChild(quoteFooter);

    quoteContainer.appendChild(card);
}

function toggleFavorite(quote) {
    const index = favoriteQuotes.findIndex(q => q.quoteText === quote.quoteText);
    if (index === -1) {
        favoriteQuotes.push(quote);
    } else {
        favoriteQuotes.splice(index, 1);
    }
}

function getFavoriteQuotes() {
    const favoriteQuotesText = favoriteQuotes.map(quote => `"${quote.quoteText}" - ${quote.quoteAuthor}`).join('\n');
    downloadFile(favoriteQuotesText, 'favorite_quotes.txt');
}

function downloadFile(text, filename) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}
