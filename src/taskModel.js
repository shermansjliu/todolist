const PubSub = require('pubsub-js');
let tasks = [];

let taskModule = (function () {

  PubSub.subscribe('submitTask', (tag, data) => {
    tasks.push(taskFactory(data.task_name, data.priority, data.due_date));
    PubSub.publish('updateTasks', tasks[tasks.length - 1])
  });

  function deleteTask() {

  }
  function editTask() {

  }

  function taskFactory(title, priority, due_date) {
    let taskCompleted = false;
    return {
      title,
      due_date,
      priority,
      taskCompleted
    }
  }
  return {
    deleteTask,
    editTask,
    tasks
  }
})();



// PubSub.subscribe('createTask', (task_title, task_priority) => {

// })