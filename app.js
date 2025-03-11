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

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const analytics = getAnalytics(app);
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// ✅ Add Task
window.addTask = () => {
    let task = taskInput.value.trim();
    if (task) push(ref(db, "tasks"), task);
    taskInput.value = "";
};

// ✅ Load Tasks
onValue(ref(db, "tasks"), (snapshot) => {
    taskList.innerHTML = "";
    let tasks = snapshot.val();
    if (!tasks) return;

    let keys = Object.keys(tasks);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let li = document.createElement("li");
        let btn = document.createElement("button");

        li.textContent = tasks[key];
        btn.textContent = "Delete";
        btn.onclick = () => remove(ref(db, "tasks/" + key));

        li.appendChild(btn);
        taskList.appendChild(li);
    }
});
