import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBEmRheNCEiRGcLOJBb8FoaEYmrdaGYKv0",
    authDomain: "signup-login-form-754b4.firebaseapp.com",
    projectId: "signup-login-form-754b4",
    storageBucket: "signup-login-form-754b4.firebasestorage.app",
    messagingSenderId: "273901785995",
    appId: "1:273901785995:web:c23081abf9a599a471958e",
    measurementId: "G-3SJG6WDSXF"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

// Get references to HTML elements
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');

// Add todo item to Firebase Realtime Database
addTodoBtn.addEventListener('click', () => {
  let todoText = todoInput.value.trim();
  if (todoText) {
    set(ref(db, 'todos'), { text: todoText });
    todoInput.value = '';
  }
});

// Display todo items from Firebase Realtime Database
onValue(ref(db, 'todos'), (snapshot) => {
  todoList.innerHTML = '';
  const todoText = snapshot.val().text;
  const li = document.createElement('li');
  li.textContent = todoText;
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete this todo item?')) {
      remove(ref(db, 'todos'));
    }
  });
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
});
