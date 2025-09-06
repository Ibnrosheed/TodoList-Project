const taskInput = document.getElementById("taskInput");

const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");

// Load saved tasks
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);

function addTask(){
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");

    li.innerHTML = `
        <span> ${taskText}</span>
        <button class = "deleteBtn">X</button>
    `

    // Mark done on click

    li.querySelector("span").addEventListener("click", () => {
        li.querySelector("span").classList.toggle("done");
        saveTasks();
    });

    //Delete button

    li.querySelector(".deleteBtn").addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    taskList.appendChild(li);
    taskInput.value = "";
    saveTasks();
}

// Save tasks to local storage

function saveTasks(){
    const tasks = [];

    taskList.querySelectorAll("li").forEach(li => {
        tasks.push ({
            text: li.querySelector("span").textContent,
            done: li.querySelector("span").classList.contains("done")
        
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${task.done ? 'done' : ''}">${task.text}</span>
            <button class="deleteBtn">X</button>
        `;

        li.querySelector("span").addEventListener("click", () => {
            li.querySelector("span").classList.toggle("done");
            saveTasks();
        });

        li.querySelector(".deleteBtn").addEventListener("click", () => {
            li.remove();
            saveTasks();
        });

        taskList.appendChild(li);
    });
}