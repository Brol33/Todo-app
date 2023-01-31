let taskId = 0;

let lastTaskID = parseInt(localStorage.getItem('lastTaskID')) || 0;
// retrieve existing list of task from LocalStorage
let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

/*
// Retrieve todoList and display it
todoList = JSON.parse(localStorage.getItem('todoList'));

if (todoList) {
  // iterate over todoList and create element to display task
  for (let i = 0; i < todoList.length; i++) {
    let taskId = todoList[i].taskId
    let taskName = todoList[i].task
    let isCompleted = todoList[i].completed
    
  }
}*/

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

  // add li item to span class
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
  })

  // listens for checkbox and strikes through the item
  newTask.addEventListener('change', (e) => {
    e.preventDefault();
    console.log("TICKED");
    if (span.style.textDecoration == 'line-through') {
      span.style.textDecoration = 'none';
    } else {
      span.style.textDecoration = 'line-through';
    };
  });

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
  
  // append new task to task list
  todoList.push(task);

  // convert task object to JSON string
  let tasksString = JSON.stringify(todoList);

  // store lastTaskID and new task
  localStorage.setItem('lastTaskID', lastTaskID);
  localStorage.setItem("todoList", tasksString);

});






