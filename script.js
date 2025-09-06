const taskInput = document.getElementById("taskInput");

const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");

// Load saved tasks
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    createTaskElement({ text: taskText, done: false });
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
        createTaskElement(task);
    });
}

function createTaskElement(task) {
  const li = document.createElement("li");

  li.innerHTML = `
    <span class="${task.done ? 'done' : ''}">${task.text}</span>
    <div>
      <button class="editBtn">✏️</button>
      <button class="deleteBtn">❌</button>
    </div>
  `;

  // Toggle done
  li.querySelector("span").addEventListener("click", () => {
    li.querySelector("span").classList.toggle("done");
    saveTasks();
  });

  // Edit task
  li.querySelector(".editBtn").addEventListener("click", () => {
    const span = li.querySelector("span");
    taskInput.value = span.textContent;
    taskInput.focus();

    // Temporarily change addBtn to "Update"
    addBtn.textContent = "Update";

    // Remove any previous update handler
    addBtn.onclick = null;

    addBtn.onclick = function updateTask() {
      const newText = taskInput.value.trim();
      if (newText !== "") {
        span.textContent = newText;
        saveTasks();
      }
      taskInput.value = "";
      addBtn.textContent = "Add";
      addBtn.onclick = addTask;
    };
    if (newText !== null && newText.trim() !== "") {
      span.textContent = newText.trim();
      saveTasks();
    }
  });

  // Delete task with animation
  li.querySelector(".deleteBtn").addEventListener("click", () => {
    li.classList.add("removing");
    setTimeout(() => {
      li.remove();
      saveTasks();
    }, 300); // wait for animation
  });

  taskList.appendChild(li);

  // Animate task entry
  setTimeout(() => li.classList.add("show"), 50);
}
