// timer implementation
let interval;
let timer;
let remainingTime;
var currentDuration = 3000;

// Timer Functions
function startTimer(duration, display) {
  // duration in seconds
  if (interval) {
    console.log("timer is already running");
    console.log(interval);
    return;
  }
  // convert minutes to seconds
  timer = duration
  interval = setInterval(function() {
    // calculate minutes and seconds
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60

    // adding leading zeroes
    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds

    // update display
    display.textContent = minutes + ":" + seconds;

    // decrement timer by 1 second and stop
    if (timer-- < 0) {
      playTimerSound();
      clearInterval(interval);
    }
  }, 1000);

}

// Stops timer, stores duration left and resets interval
function pauseTimer() {
  clearInterval(interval);
  interval = null;
  remainingTime = timer;
}

// Stops current timer and starts timer again
function resetTimer(duration, display) {
  clearInterval(interval);
  interval = null;
  startTimer(duration, display)
}

function playTimerSound() {
  const audio = new Audio('audio/Alarm04.wav');
  audio.play();
}
// To-do List implementation
let taskId = 0;
let lastTaskID = parseInt(localStorage.getItem('lastTaskID')) || 0;

// retrieve existing list of task from LocalStorage
let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
console.log(localStorage.getItem("todoList"));

// Retrieve todoList and display it
todoList = JSON.parse(localStorage.getItem('todoList'));

// iterate over todoList and create element to display task
if (todoList) {
  for (let i = 0; i < todoList.length; i++) {
    let currentTaskId = todoList[i].taskId;
    let taskName = todoList[i].task;
    let isCompleted = todoList[i].completed;
    
    // create tasks
    const listElement = document.createElement('li');
    listElement.setAttribute('id', currentTaskId);

    const inputElement = document.createElement('input');
    inputElement.type = "checkbox";
    listElement.appendChild(inputElement);
    inputElement.checked = isCompleted;

    const spanElement = document.createElement('span');
    spanElement.contentEditable = true;
    spanElement.classList.add('editable');
    spanElement.textContent = taskName;

    listElement.appendChild(spanElement);

    const deleteElement = document.createElement('button');
    deleteElement.classList.add('delete-buttons');
    const delText = document.createTextNode("Delete");
    deleteElement.appendChild(delText);

    listElement.appendChild(deleteElement);
    if (isCompleted === true) {
      spanElement.style.textDecoration = 'line-through';
    } else {
      spanElement.style.textDecoration = 'none';
    }

    document.getElementById('tasks-list').appendChild(listElement);
  }
};

// Implementation of delete, edit and check
const taskList = document.getElementById("tasks-list");
if (taskList) {
  // add event listeners to task lists 
  taskList.addEventListener('click', function(event) {
    // Deletes tasks when delete button is clicked
    let parent = event.target.parentElement;
    if (event.target.matches('.delete-buttons')) {
      parent.remove();
      // get latest todolist
      let wantedTaskID = parseInt(event.target.parentElement.getAttribute('id'));
      todoList = JSON.parse(localStorage.getItem('todoList')) || [];
      
      // delete from localStorage
      let updatedTasks = todoList.filter(task => task.taskId !== wantedTaskID);
      localStorage.setItem('todoList', JSON.stringify(updatedTasks));
    } 
    
    // listens for checkbox and strikes through the item
    if (event.target.type === 'checkbox') {
      let span = parent.querySelector('span');
  
      // get current task and toggle the completed property 
      let wantedTaskID = parseInt(parent.getAttribute('id'));
      todoList = JSON.parse(localStorage.getItem('todoList')) || [];
      let taskIndex = todoList.findIndex(task => task.taskId === wantedTaskID);
      todoList[taskIndex].completed = !todoList[taskIndex].completed;
  
      // update local storage with updated todolist
      localStorage.setItem('todoList', JSON.stringify(todoList));
  
      if (todoList[taskIndex].completed) {
        span.style.textDecoration = 'line-through';
      } else {
        span.style.textDecoration = 'none';
      }
    }
  });
  // Updating edited tasks
  taskList.addEventListener("input", function(event) {
    if (event.target.matches("span.editable")) {
      // get taskId from parent element
      let curTaskId = parseInt(event.target.parentElement.getAttribute("id"));
      // find index of task object in the todoList array
      let taskIndex = todoList.findIndex(task => task.taskId === curTaskId);
      // update task description in todoList array
      todoList[taskIndex].task = event.target.textContent;
      // update storage
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
  });
}

// Implementation of adding new task
const form = document.getElementById("form");
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // get input of task from user
    const input = document.getElementById('new-task').value;
  
    // create li to store checkbox in
    const li = document.createElement('li');
    li.setAttribute('id', lastTaskID);
  
    // create new input element of type checkbox
    const newTask = document.createElement('input');
    newTask.type = "checkbox";
  
    li.appendChild(newTask);
  
    // add span element to li
    const span = document.createElement('span');
    span.contentEditable = true;
    span.classList.add('editable');
    span.textContent = input;
  
    li.appendChild(span);
  
    // create delete button
    const deleteButton = document.createElement('button');
    // add delete button to class delete-buttons
    deleteButton.classList.add('delete-buttons');
    const deleteText = document.createTextNode("Delete");
  
    deleteButton.appendChild(deleteText);
  
    li.appendChild(deleteButton);
  
    // add checkbox wrapped by li to ul
    document.getElementById('tasks-list').appendChild(li);
  
    // clear input
    document.getElementById('new-task').value='';
  
    // add task to localstorage
    // create task object
    let task = {
      taskId: lastTaskID++,
      task: input,
      completed: false
    };
    
    // get latest todoList
    todoList = JSON.parse(localStorage.getItem('todoList')) || [];
  
    // append new task to task list
    todoList.push(task);
  
    // convert task object to JSON string
    let tasksString = JSON.stringify(todoList);
  
    // store lastTaskID and new task
    localStorage.setItem('lastTaskID', lastTaskID);
    localStorage.setItem("todoList", tasksString);
  });
}

// Implementation of timer and buttons
let timerStringDiv = document.getElementById("timer-string");

document.getElementById("start-button").addEventListener("click", function() {
  const timerString = timerStringDiv.textContent;
  const minutesSeconds = timerString.split(":");
  const duration = parseInt(minutesSeconds[0]) * 60 + parseInt(minutesSeconds[1]);
  startTimer(duration, timerStringDiv);
})
document.getElementById("pause-button").addEventListener("click", pauseTimer);
document.getElementById("reset-button").addEventListener("click", function() {
  resetTimer(currentDuration, timerStringDiv);
})
document.getElementById("setting-form").addEventListener("submit", function(e) {
  // prevent page reload
  e.preventDefault();
  // Check if input is valid int
  var timerInput = document.getElementById("timer-input").value;
  if (isNaN(parseInt(timerInput))) {
    alert("Please enter a duration in minutes");
    return;
  }
  // timerInput in minutes, convert to seconds
  currentDuration = parseInt(timerInput, 10) * 60;
  var updatedDuration = parseInt(timerInput, 10) * 60;
  // calculate minutes and seconds
  let minutes = Math.floor(updatedDuration / 60);
  let seconds = updatedDuration % 60;

  // adding leading zeroes
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // update display
  document.getElementById("timer-string").textContent = minutes + ":" + seconds;
})

// Setting buttons implementation
var modal = document.getElementById("settings-modal");
var settingsBtn = document.getElementById("setting-button");
var saveBtn = document.getElementById('save-button');

settingsBtn.onclick = function() {
  modal.style.display = "block";
}

saveBtn.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
