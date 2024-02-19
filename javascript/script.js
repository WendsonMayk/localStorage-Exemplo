 // Adicionar tarefa
 function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
      const taskItem = document.createElement('li');
      taskItem.className = 'task-item';
      taskItem.innerHTML = `
        <span>${taskInput.value}</span>
        <button type="button" class="btn btn-danger" onclick="removeTask(this)">Remover</button>
      `;

      taskList.appendChild(taskItem);
      taskInput.value = '';

      // Salvar no Local Storage
      saveTasksToLocalStorage();
    }
  }

  // Remover tarefa
  function removeTask(button) {
    const taskList = document.getElementById('taskList');
    const taskItem = button.parentElement;
    taskList.removeChild(taskItem);

    // Salvar no Local Storage
    saveTasksToLocalStorage();
  }

  // Salvar tarefas no Local Storage
  function saveTasksToLocalStorage() {
    const taskList = document.getElementById('taskList');
    const tasks = taskList.getElementsByClassName('task-item');
    const tasksArray = [];

    for (const task of tasks) {
      tasksArray.push(task.querySelector('span').innerText);
    }

    localStorage.setItem('tasks', JSON.stringify(tasksArray));
  }

  // Carregar tarefas do Local Storage
  function loadTasksFromLocalStorage() {
    const taskList = document.getElementById('taskList');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    for (const task of tasks) {
      const taskItem = document.createElement('li');
      taskItem.className = 'task-item';
      taskItem.innerHTML = `
        <span>${task}</span>
        <button type="button" class="btn btn-danger" onclick="removeTask(this)">Remover</button>
      `;

      taskList.appendChild(taskItem);
    }
  }

  // Concluir tarefas e remover do Local Storage
  function completeTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Limpar a lista de tarefas na interface
    localStorage.removeItem('tasks'); // Remover do Local Storage
  }

  // Carregar tarefas ao carregar a página
  window.onload = function () {
    loadTasksFromLocalStorage();
  };