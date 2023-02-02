let taskId = 0;
//localStorage.clear();
let lastTaskID = parseInt(localStorage.getItem('lastTaskID')) || 0;
// retrieve existing list of task from LocalStorage
let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
console.log(localStorage.getItem("todoList"));

// Retrieve todoList and display it
todoList = JSON.parse(localStorage.getItem('todoList'));
// ##############################################################
// this create new tasks when refreshed but buttons dont work
// 
if (todoList) {
  // iterate over todoList and create element to display task
  for (let i = 0; i < todoList.length; i++) {
    let taskId = todoList[i].taskId
    let taskName = todoList[i].task
    let isCompleted = todoList[i].completed
    
    // create tasks
    const listElement = document.createElement('li');
    listElement.setAttribute('id', taskId);

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
    deleteElement.classList.add('delete-buttons')
    const delText = document.createTextNode("Delete");
    deleteElement.appendChild(delText);

    listElement.appendChild(deleteElement);
    console.log(isCompleted)
    if (isCompleted === true) {
      spanElement.style.textDecoration = 'line-through';
    } else {
      spanElement.style.textDecoration = 'none';
    }

    document.getElementById('tasks-list').appendChild(listElement);
  }
};
// add event listenrs to task lists for retrieved tasks
const taskList = document.getElementById("tasks-list");
taskList.addEventListener('click', function(event) {
  event.preventDefault();
  let parent = event.target.parentElement;
  if (event.target.matches('.delete-buttons')) {
    
    parent.remove();

    // get latest todolist
    let wantedTaskID = parseInt(event.target.parentElement.getAttribute('id'));
    todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    
    // delete from localStorage
    let updatedTasks = todoList.filter(task => task.taskId !== wantedTaskID);
    console.log(updatedTasks);
    localStorage.setItem('todoList', JSON.stringify(updatedTasks));
    console.log(localStorage.getItem("todoList"));
  } 
  
});

taskList.addEventListener('click', function(event) {
  event.preventDefault();
  let parent = event.target.parentElement;
  if (event.target.matches('input[type="checkbox"]')) {
    //event.target.checked = !event.target.checked;
    const span = parent.querySelector('span');
    console.log(event.target.checked);
    if (event.target.checked!=true)
      event.target.click();
    if (span.style.textDecoration == 'line-through') {
      span.style.textDecoration = 'none';
    } else {
      span.style.textDecoration = 'line-through';
    };
  }
});




document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();

  // get input of task from suer
  const input = document.getElementById('new-task').value;
  console.log(input)

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
  deleteButton.classList.add('delete-buttons')
  const deleteText = document.createTextNode("Delete");

  deleteButton.appendChild(deleteText);

  li.appendChild(deleteButton);
  
  // deletes li from which delete button is clicked
  deleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("deteletetetete");
    li.remove();
    let wantedTaskID = parseInt(li.getAttribute('id'));

    // get latest todolist
    todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    
    // delete from localStorage
    let updatedTasks = todoList.filter(task => task.taskId !== wantedTaskID);
    console.log(updatedTasks);
    localStorage.setItem('todoList', JSON.stringify(updatedTasks));
    console.log(localStorage.getItem("todoList"));
  })

  // listens for checkbox and strikes through the item
  console.log(newTask);
  console.log(newTask.parentElement);
  /*
  newTask.addEventListener('input', (e) => {
    e.preventDefault();
    console.log("TICKED");
    if (newTask.checked) {
      span.style.textDecoration = 'line-through';
    } else {
      span.style.textDecoration = 'none';
    };
  });*/

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
  console.log(tasksString);

  // store lastTaskID and new task
  localStorage.setItem('lastTaskID', lastTaskID);
  localStorage.setItem("todoList", tasksString);
  console.log(localStorage.getItem("todoList"));
});






