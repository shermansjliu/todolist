// import { format } from 'date-fns'
const date_fns = require('date-fns');
const PubSub = require('pubsub-js');
const tasks_container = document.querySelector('.tasks-container');
const listsContainer = document.querySelector('.projects-container');
const add_task_btn = document.querySelector('.add-task-btn');
const submit_task_btn = document.querySelector(".submit-task-btn");
const indicator_lst = [...document.querySelectorAll(".indicator")];



add_task_btn.addEventListener('click', function(){
  let input_due_date = document.querySelector("#inputDate");
  console.log(input_due_date);
  input_due_date.valueAsDate = new Date();
  setMinDate();
})

submit_task_btn.addEventListener('click', function (e) {
  submitTask();
})



function setMinDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }

  today = yyyy + '-' + mm + '-' + dd;
  document.querySelector("#inputDate").setAttribute("min", today);
}

function submitTask() {
  let input_task_name = document.querySelector("#inputTask");
  let input_priority = document.querySelector("#inputPriority");
  let input_due_date = document.querySelector("#inputDate");
  
  let input_list = document.querySelector("#inputList");

  PubSub.publish('submitTask', { task_name: input_task_name.value, due_date: input_due_date.value, priority: input_priority.value });
  input_task_name.value = "";
  input_due_date.value = new Date();
}




PubSub.subscribe('updateTasks', (tag, data) => {
  updateTasks(data);
});

function updateTasks(task) {

  //TODO make task_container flex box
  let priority_element = document.createElement("div");
  priority_element.style.height = "20px";
  priority_element.style.width = "20px";

  let indicator_element = document.createElement("div");
  indicator_element.classList.add("indicator");
  indicator_element.addEventListener('click', (e)=> {
    indicator_element.classList.toggle("completed-indicator");
    task_name.classList.toggle("completed-task");
  })

  let due_date_element = document.createElement("div");
  due_date_element.textContent = date_fns.format(new Date(task.due_date), "d MMM y");

  let task_name = document.createElement("div");
  task_name.classList.add('flex-grow-1');
  task_name.textContent = task.title;

  let new_task_container = document.createElement('div');
  new_task_container.appendChild(indicator_element);
  new_task_container.appendChild(task_name);
  new_task_container.appendChild(due_date_element);
  new_task_container.appendChild(priority_element);
  new_task_container.classList.add('task', 'd-flex', 'py-2', 'px-3');
  

  if (task.priority.localeCompare("high") == 0) {
    priority_element.style.backgroundColor = "red"
  }
  else if (task.priority.localeCompare("medium") == 0) {
    priority_element.style.backgroundColor = "yellow";
  }
  else {
    priority_element.style.backgroundColor = "green"
  }

  tasks_container.appendChild(new_task_container);


}

function setAttributes(el, attrs) {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}










