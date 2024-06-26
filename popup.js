// To-do List implementation
let lastTaskID = parseInt(localStorage.getItem('lastTaskID')) || 0;

// reset taskId to prevent overflow
if (lastTaskID > 10000) {
  lastTaskID = 0;
  localStorage.setItem('lastTaskID', lastTaskID);
}
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