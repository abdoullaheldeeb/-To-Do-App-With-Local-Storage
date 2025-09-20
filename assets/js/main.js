// get Variables
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let container = document.querySelector(".container");

// Empty Array To Store The Tasks
let arrayOFTasks = [];

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
    arrayOFTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data Local Storage Function
updateUI();

// Add Task
submit.onclick = function () {
    if (input.value !== "") {
        addTasksToArray(input.value); 
        input.value = ""; 
    }
}

// Click on Tasks Element
tasksDiv.addEventListener("click", (e) => {
    // Delete Button 
    if (e.target.classList.contains("del")) {
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    }
    // task Element
    if (e.target.classList.contains("task")){
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
    } 
});

function addTasksToArray(taskText){
    // Task Data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    // Push task To Array Of Tasks
    arrayOFTasks.push(task);
    addDateToLocalStorageFrom(arrayOFTasks);
    updateUI();
}


function addElementsToPageFrom(arrayOFTasks){
    // Empty Tasks Div
    tasksDiv.innerHTML = "";
    // looping On Array Of tasks
    arrayOFTasks.forEach((task) =>{
        // create Min Div 
        let div = document.createElement("div");
        div.className = "task";
        // Check If task Is Done 
        if (task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        // crate Delete Button delete
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        // Append Button To Main Div
        div.appendChild(span);
        // Add task Div TO tasks Container
        tasksDiv.appendChild(div);
    });
}


function addDateToLocalStorageFrom(arrayOFTasks){
    window.localStorage.setItem("tasks", JSON.stringify(arrayOFTasks));
}


function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        arrayOFTasks = tasks; 
        addElementsToPageFrom(tasks);
    }
}


function deleteTaskWith(taskId) {
    arrayOFTasks = arrayOFTasks.filter((task) => task.id != taskId);
    addDateToLocalStorageFrom(arrayOFTasks);
    updateUI();
}


function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOFTasks.length; i++){
        if (arrayOFTasks[i].id == taskId ) {
            arrayOFTasks[i].completed == false 
              ? (arrayOFTasks[i].completed = true) 
              : (arrayOFTasks[i].completed = false);
        }
    }
    addDateToLocalStorageFrom(arrayOFTasks);
    updateUI();
}


function updateUI() {
    addElementsToPageFrom(arrayOFTasks);

    // remove delete old clear-all button 
    let oldBtn = document.querySelector(".clear-all");
    if (oldBtn) oldBtn.remove();

    // Add button of tasks
    if (arrayOFTasks.length > 0) {
        let clearAllBtn = document.createElement("button");
        clearAllBtn.className = "clear-all del";
        clearAllBtn.appendChild(document.createTextNode("AllDelete"));
        container.appendChild(clearAllBtn);

        // clearAllBtn onclick
        clearAllBtn.onclick = function () {
            arrayOFTasks = []; 
            addDateToLocalStorageFrom(arrayOFTasks); 
            tasksDiv.innerHTML = ""; 
            clearAllBtn.remove();
        };
    }
}
