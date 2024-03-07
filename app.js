document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
  
    taskForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addTask(taskInput.value);
      taskInput.value = '';
    });
  
    function addTask(taskText, completed = false) {
      const errorMessage = document.querySelector('.error-message');
  
      if (taskText.trim() === '') {
        errorMessage.style.display = 'block'; // Exibe a mensagem de erro
        return; // Sai da função se o campo estiver vazio
      }
  
      errorMessage.style.display = 'none'; // Esconde a mensagem de erro
  
      const li = document.createElement('li');
      li.classList.toggle('completed', completed);
      li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="delete-btn">
          <img class="delete-icon" src="img/lixeira.jpeg" alt="Excluir">
        </button>
        <button class="complete-btn">
          <img class="check-icon" src="./img/check.jpeg" alt="Concluído">
        </button>
      `;
  
      const completeButton = li.querySelector('.complete-btn');
      const deleteButton = li.querySelector('.delete-btn');
  
      completeButton.addEventListener('click', toggleTaskCompletion);
      deleteButton.addEventListener('click', deleteTask);
  
      taskList.appendChild(li);
      saveTasks();
    }
  
    function toggleTaskCompletion() {
      const taskItem = this.parentNode;
      taskItem.classList.toggle('completed');
      saveTasks();
    }
  
    function deleteTask() {
      const taskItem = this.parentNode;
      taskItem.classList.add('fade-out', 'deleting'); // Adicione a classe 'deleting'
  
      // Adicione a imagem de lixeira quando a tarefa está sendo deletada
      const deleteIcon = taskItem.querySelector('.delete-icon');
      deleteIcon.style.display = 'inline-block';
  
      setTimeout(() => {
        taskItem.remove();
        saveTasks();
      }, 500);
    }
  
    function saveTasks() {
      const tasks = document.querySelectorAll('.task-item');
      const tasksArray = [];
  
      tasks.forEach((task) => {
        tasksArray.push({
          text: task.querySelector('.task-text').innerText,
          completed: task.classList.contains('completed'),
        });
      });
  
      localStorage.setItem('tasks', JSON.stringify(tasksArray));
    }
  
    function loadTasks() {
      const tasks = localStorage.getItem('tasks');
  
      if (tasks) {
        const tasksArray = JSON.parse(tasks);
  
        tasksArray.forEach((task) => {
          addTask(task.text, task.completed);
        });
      }
    }
  
    // Chamada para carregar tarefas ao iniciar a aplicação
    loadTasks();
  });
  