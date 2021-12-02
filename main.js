document.querySelector("form").onsubmit = (s) => s.preventDefault();
const taskText = document.querySelector(".input");
const addTask = document.querySelector(".add");
const tasksArea = document.querySelector(".tasks");

//Event Listeners
document.addEventListener("DOMContentLoaded", showTasks);
addTask.addEventListener("click", addTodo);
tasksArea.addEventListener("click", deleteCheckTask);

//Adding Tasks
function addTodo() {
  if (taskText.value != "") {
    const div = document.createElement("div");
    // Task Disc
    const taskDisc = document.createElement("h3");
    taskDisc.textContent = taskText.value;
    taskDisc.classList.add("task-disc");
    div.appendChild(taskDisc);
    //Save Task to LocalStorage
    saveLocalTask(taskText.value);
    //Complete Button
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = '<i class="fas fa-check-square"></i>';
    completeBtn.classList.add("check-btn");
    div.appendChild(completeBtn);
    //Delete Button
    const delBtn = document.createElement("button");
    delBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    delBtn.classList.add("del-btn");
    div.appendChild(delBtn);
    tasksArea.appendChild(div);
    taskText.value = "";
  }
}

//Deleting Or Check Task
function deleteCheckTask(e) {
  const item = e.target;
  //Delete
  if (item.classList[0] === "del-btn") {
    const task = item.parentElement;
    task.remove();
    removeFromLocal(task);
  }
  //Checked
  if (item.classList[0] === "check-btn") {
    const task = item.parentElement;
    task.classList.toggle("done");
  }
}

//Local Storage
function saveLocalTask(task) {
  //Check Local Storage
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Show Tasks
function showTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task) => {
    const div = document.createElement("div");
    // Task Disc
    const taskDisc = document.createElement("h3");
    taskDisc.textContent = task;
    taskDisc.classList.add("task-disc");
    div.appendChild(taskDisc);
    //Complete Button
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = '<i class="fas fa-check-square"></i>';
    completeBtn.classList.add("check-btn");
    div.appendChild(completeBtn);
    //Delete Button
    const delBtn = document.createElement("button");
    delBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    delBtn.classList.add("del-btn");
    div.appendChild(delBtn);
    tasksArea.appendChild(div);
  });
}

//Remove From LocalStorage
function removeFromLocal(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  const taskIndex = task.children[0].innerText;
  tasks.splice(tasks.indexOf(taskIndex), 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
