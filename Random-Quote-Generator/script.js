////////// DOM elements
const newQuoteButton = document.getElementById('new-quote-btn');
const quoteContent = document.getElementById('quote-content');
const actionIconsContainer = document.querySelector('.action-icons');
const copyButton = document.getElementById('copy-btn');
const tweetButton = document.getElementById('tweet-btn');
const exportButton = document.getElementById('export-btn');
const themeToggleButton = document.getElementById('theme-toggle-btn');

////////// API URL
const apiUrl = 'https://api.freeapi.app/api/v1/public/quotes/quote/random';

////////// Functions

// Function to fetch a random quote from the API
async function fetchRandomQuote() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching quote:', error);
    return null;
  }
}

// Function to display the quote on the page
async function displayQuote() {
  try {
    const quote = await fetchRandomQuote();
    if (!quote) {
      quoteContent.innerHTML = `<p id="quote-text">Failed to load quote. Please try again!</p>`;
    } else {
      quoteContent.innerHTML = `<p id="quote-text"><span>“</span>${
        quote.content
      }<span>”</span></p>
         <p id="quote-author">- ${quote.author || 'Anonymous'}</p>`;
      quoteContent.style.backgroundImage = `url('https://picsum.photos/600/400?${Date.now()})`; // Date.now() is a common technique to prevent browser caching
      quoteContent.style.backgroundSize = 'cover';
      quoteContent.style.backgroundPosition = 'center';
      actionIconsContainer.style.display = 'flex';
    }
  } catch (error) {
    console.error(error);
  }
}

// Function to copy text to clipboard
function copyQuoteToClipboard() {
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');

  if (!quoteText || !quoteAuthor) {
    console.error('Quote or author not found!');
    return;
  }

  const textToCopy = `${quoteText.textContent} - ${quoteAuthor.textContent}`;

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => alert('Quote copied to clipboard!'))
    .catch(() => alert('Failed to copy quote.'));
}

// Function to share quote on Twitter
function shareOnTwitter() {
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');

  if (!quoteText || !quoteAuthor) {
    console.error('Quote or author not found!');
    return;
  }

  const tweetText = `${quoteText.textContent} - ${quoteAuthor.textContent} ✨\n\n#Inspiration #Motivation #Quotes`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweetText
  )}`;
  window.open(twitterUrl, '_blank');
}

// Function to download quote using canvas(https://html2canvas.hertzen.com/getting-started)
function exportQuoteAsImage() {
  html2canvas(quoteContent)
    .then(function (canvas) {
      // create a temp achor elem
      const link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = 'quote.png';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(error => {
      console.error('Error in exporting quote:', error);
      alert('Failed to export quote. Please try again.');
    });
}

// Change theme between dark and light mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  themeToggleButton.innerHTML = isDarkMode
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

////////// Event listeners
document.addEventListener('DOMContentLoaded', displayQuote);
newQuoteButton.addEventListener('click', displayQuote);
copyButton.addEventListener('click', copyQuoteToClipboard);
tweetButton.addEventListener('click', shareOnTwitter);
themeToggleButton.addEventListener('click', toggleDarkMode);
exportButton.addEventListener('click', exportQuoteAsImage);

// Check for browser theme preference
const isBrowserDarkMode =
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;
if (isBrowserDarkMode) {
  document.body.classList.add('dark-mode');
}
themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>';
