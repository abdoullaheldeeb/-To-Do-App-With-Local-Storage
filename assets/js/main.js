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

// Trigger Get Data Local Stroage Function
getDataFromLocalStorage();


// Add Task
submit.onclick = function () {
    if (input.value !== "") {
        addTasksToArray(input.value); //Add Task To Array To Of Tasks
        input.value = ""; //Empty Input Field
    }
}

// Click on Tasks Element
tasksDiv.addEventListener("click", (e) => {
    // Delete Button 
    if (e.target.classList.contains("del")) {
        // Remove Task from Local Storage 
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        // Remove Element From Page 
        e.target.parentElement.remove();
    }
    // task Element
    if (e.target.classList.contains("task")){
        // Toggle Compalted For Task
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        // toogle Done Class
        e.target.classList.toggle("done");
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
    // console.log(arrayOFTasks);
    // Add Taks To Page 
    addElementsToPageFrom(arrayOFTasks);
    // Add Tasks p Local Storage
    addDateToLocalStorageFrom(arrayOFTasks);
    // For Testing 
    // console.log(arrayOFTasks);
    // console.log(JSON.stringify(arrayOFTasks));
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
// Append Button clear All
let clearAllBtn = document.createElement("button");
clearAllBtn.className = "del";
clearAllBtn.appendChild(document.createTextNode("AllDelete"));
container.appendChild(clearAllBtn)
// clear All Btn
clearAllBtn.onclick = function () {
    arrayOFTasks = []; 
    localStorage.removeItem("tasks"); 
    tasksDiv.innerHTML = ""; 
    clearAllBtn.remove();
};

function addDateToLocalStorageFrom(arrayOFTasks){
    window.localStorage.setItem("tasks", JSON.stringify(arrayOFTasks));
    // Add input all del
    
}



function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
        
    }
}


function deleteTaskWith(taskId) {
    // for Explain Only
    // for (let i = 0; i < arrayOFTasks.length; i++){
    //     console.log(`${arrayOFTasks[i].id} === ${taskId}`);
    // }
    arrayOFTasks = arrayOFTasks.filter((task) => task.id != taskId);
    addDateToLocalStorageFrom(arrayOFTasks);
}


function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOFTasks.length; i++){
        if (arrayOFTasks[i].id == taskId ) {
            arrayOFTasks[i].completed == false ? (arrayOFTasks[i].completed = true) : (arrayOFTasks[i].completed = false)
        }
    }
    addDateToLocalStorageFrom(arrayOFTasks);
}

