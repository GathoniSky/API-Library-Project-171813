console.log('DOM fully loaded');
console.log('bookForm:', bookForm);
console.log('bookListUl:', bookListUl);

// ----------------------------
// LOGIN FORM HANDLER
// ----------------------------
const loginForm = document.getElementById('loginForm');

if (loginForm) {
loginForm.addEventListener('submit', function(e) {
e.preventDefault(); // Prevent page reload

// Create JS object from input values
const user = {
username: document.getElementById('username').value,
password: document.getElementById('password').value
};

console.log('JS Object:', user); // View in console

// Show feedback message
const messageDiv = document.getElementById('message');
messageDiv.innerText = `Hello ${user.username}, you are ready to continue!`;

// Convert to JSON
const userJSON = JSON.stringify(user);
console.log('JSON String:', userJSON);

// Redirect to landing page
setTimeout(() => {
window.location.href = 'landing.html';
}, 1000);
});
}
// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

const bookForm = document.getElementById('bookForm');
const bookListUl = document.querySelector('#bookList ul');

// Fetch all books from Laravel API
async function fetchBooks() {
try {
const response = await fetch('http://127.0.0.1:8000/api/books');
const books = await response.json();

bookListUl.innerHTML = '';

books.forEach(book => {
const li = document.createElement('li');
li.innerText = `${book.title} by ${book.author} (${book.year})`;

const deleteBtn = document.createElement('button');
deleteBtn.innerText = 'Delete';
deleteBtn.style.marginLeft = '10px';
deleteBtn.addEventListener('click', () => deleteBook(book.id));

li.appendChild(deleteBtn);
bookListUl.appendChild(li);
});
} catch (error) {
console.error('Error fetching books:', error);
}
}

// Add new book
if (bookForm) {

bookForm.addEventListener('submit', async (e) => {
e.preventDefault();

const book = {
title: document.getElementById('title').value,
author: document.getElementById('author').value,
year: document.getElementById('year').value
};

try {
await fetch('http://127.0.0.1:8000/api/books', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(book)
});

bookForm.reset();
fetchBooks();
} catch (error) {
console.error('Error adding book:', error);
}
});
}

// Delete book
async function deleteBook(id) {
try {

await fetch(`http://127.0.0.1:8000/api/books/${id}`, {
method: 'DELETE'
});
fetchBooks();
} catch (error) {
console.error('Error deleting book:', error);
}
}

// Initial load
if (bookListUl) fetchBooks();
});