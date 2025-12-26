////////// DOM Elements
const themeToggleButton = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const gridViewButton = document.getElementById('gridView');
const listViewButton = document.getElementById('listView');
const booksContainer = document.getElementById('books-container');
const searchInput = document.getElementById('search-box');
const nextPageButton = document.getElementById('next');
const previousPageButton = document.getElementById('prev');

////////// Global variables
let currentPage = 1;

////////// Functions

// Function to fetch books from API
async function getBooks(pageNumber) {
  try {
    const url = `https://api.freeapi.app/api/v1/public/books?page=${pageNumber}`;
    const response = await fetch(url);
    const data = await response.json();
    return data?.data?.data || [];
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}

// Function to display books on the webpage
async function renderBooks(books) {
  booksContainer.innerHTML = '';

  books.forEach(book => {
    const bookCard = createBookCard(book);
    booksContainer.appendChild(bookCard);
  });

  // Update pagination buttons and current page display
  document.getElementById('currentPage').textContent = currentPage;
  previousPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = books.length < 10;
}

// Function to create a book card element
function createBookCard(book) {
  const card = document.createElement('a');
  card.classList.add('book-card');
  card.href = book.volumeInfo.infoLink;
  card.target = '_blank';

  card.innerHTML = `
    <div class="img-container">
      <img
        src="${book.volumeInfo.imageLinks?.thumbnail || 'fallback-image.jpg'}"
        alt="${book.volumeInfo.title}">
    </div>
    <div class="text-container">
      <h3>${book.volumeInfo.title}</h3>
      <p><strong>Author:</strong> ${
        book.volumeInfo.authors?.join(', ') || 'Unknown'
      }</p>
      <p><strong>Publisher:</strong> ${
        book.volumeInfo.publisher || 'Unknown'
      }</p>
      <p><strong>Published:</strong> ${
        book.volumeInfo.publishedDate || 'Unknown'
      }</p>
    </div>
  `;
  return card;
}

// Function to toggle the theme of the webpage
function toggleColorTheme() {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Function to filter books by name
function filterBooksByName(event) {
  const searchTerm = event.target.value.toLowerCase();
  const bookElements = document.querySelectorAll('.text-container h3');

  bookElements.forEach(bookElement => {
    const bookCard = bookElement.parentElement.parentElement;
    bookCard.style.display = '';
    const bookTitle = bookElement?.innerHTML.toLowerCase() || '';

    if (!bookTitle.startsWith(searchTerm)) {
      bookCard.style.display = 'none';
    }
  });
}

// Function to go to next page
async function loadNextPage() {
  const nextPageNumber = currentPage + 1;
  const books = await getBooks(nextPageNumber);

  if (books.length === 0) return;

  currentPage = nextPageNumber;
  await renderBooks(books);
  booksContainer.scrollIntoView({ behavior: 'smooth' });
}

// Function to go to previous page
async function loadPreviousPage() {
  if (currentPage > 1) {
    const prevPageNumber = currentPage - 1;
    const books = await getBooks(prevPageNumber);

    if (books.length > 0) {
      currentPage = prevPageNumber;
      await renderBooks(books);
    }
    booksContainer.scrollIntoView({ behavior: 'smooth' });
  }
}

// Function to sort books by title in ascending order (A-Z)
async function sortBooksByTitleAscending() {
  const books = await getBooks(currentPage);
  books.sort((a, b) => {
    const titleA = a.volumeInfo.title.toLowerCase();
    const titleB = b.volumeInfo.title.toLowerCase();
    return titleA.localeCompare(titleB);
  });
  renderBooks(books);
}

// Function to sort books by title in descending order (Z-A)
async function sortBooksByTitleDescending() {
  const books = await getBooks(currentPage);
  books.sort((a, b) => {
    const titleA = a.volumeInfo.title.toLowerCase();
    const titleB = b.volumeInfo.title.toLowerCase();
    return titleB.localeCompare(titleA);
  });
  renderBooks(books);
}

// Function to sort books by published date (oldest first)
async function sortBooksByDateOldestFirst() {
  const books = await getBooks(currentPage);
  books.sort((a, b) => {
    const dateA = new Date(a.volumeInfo.publishedDate || 0);
    const dateB = new Date(b.volumeInfo.publishedDate || 0);
    return dateA.getTime() - dateB.getTime();
  });
  renderBooks(books);
}

// Function to sort books by published date (newest first)
async function sortBooksByDateNewestFirst() {
  const books = await getBooks(currentPage);
  books.sort((a, b) => {
    const dateA = new Date(a.volumeInfo.publishedDate || 0);
    const dateB = new Date(b.volumeInfo.publishedDate || 0);
    return dateB.getTime() - dateA.getTime();
  });
  renderBooks(books);
}

// Function to handle sort selection from dropdown
function handleSortSelection(element) {
  const selectedText = element.textContent;
  document.getElementById('selectedSort').textContent = selectedText;

  switch (selectedText) {
    case 'Title (A-Z)':
      sortBooksByTitleAscending();
      break;
    case 'Title (Z-A)':
      sortBooksByTitleDescending();
      break;
    case 'Date (Oldest)':
      sortBooksByDateOldestFirst();
      break;
    case 'Date (Newest)':
      sortBooksByDateNewestFirst();
      break;
    default:
      getBooks(currentPage).then(books => renderBooks(books));
  }
}

// Check for saved theme preference and apply it
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);

//////////// Event Listeners

document.addEventListener('DOMContentLoaded', () => {
  // Fetch and display books when the page loads
  getBooks(currentPage).then(books => renderBooks(books));

  // Toggle theme when the button is clicked
  themeToggleButton.addEventListener('click', toggleColorTheme);

  // Filter books based on search input
  searchInput.addEventListener('input', filterBooksByName);

  // Switch to grid view
  gridViewButton.addEventListener('click', () => {
    gridViewButton.classList.add('active');
    listViewButton.classList.remove('active');
    booksContainer.classList.remove('list-view');
    booksContainer.classList.add('grid-view');
  });

  // Switch to list view
  listViewButton.addEventListener('click', () => {
    listViewButton.classList.add('active');
    gridViewButton.classList.remove('active');
    booksContainer.classList.remove('grid-view');
    booksContainer.classList.add('list-view');
  });

  // Go to next page
  nextPageButton.addEventListener('click', loadNextPage);
  // Go to Previous page
  previousPageButton.addEventListener('click', loadPreviousPage);
});
