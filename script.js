// console.log('Testing');
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const buttonTwitter = document.getElementById('twitter');
const buttonNewQuote = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let quote = [];
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
function currentQuote() {
    loading();
    const newQ = quote[Math.floor(Math.random() * quote.length)];
    // checking
    if (!newQ.author) {
        authorText.textContent = 'unknown';
    }
    else {
        authorText.textContent ='-' +newQ.author+'-';
    }
    // check quote length 
    if (newQ.text.length > 90) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = newQ.text;
    complete();
}
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl)
        quote = await response.json();
        currentQuote();
    } catch (error) {
        alert('Somethig went wrong')

    }
}
// twet button
function tweetPost() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText
        .textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}
/*
function facebookPost() {
    const fbpost = `https://www.facebook.com/plugins/post.php?text=dkfdgkjs`;
    window.open(fbpost, '_blank');
}*/
// event 
buttonNewQuote.addEventListener('click', currentQuote);
buttonTwitter.addEventListener('click', tweetPost);
getQuotes();