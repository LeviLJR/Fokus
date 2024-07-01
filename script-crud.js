//find a button to add a task
const btnAddTask = document.querySelector(".app__button--add-task");
const formAddTask = document.querySelector(".app__form-add-task");
const textArea = document.querySelector(".app__form-textarea");
const taskList = document.querySelector(".app__section-task-list");
const deleteBtn = document.querySelector(".app__form-footer__button--delete");
const cancelBtn = document.querySelector(".app__form-footer__button--cancel");
const deleteDoneTasksBtn = document.querySelector("#btn-remover-concluidas");
const deleteAllTasksBtn = document.querySelector("#btn-remover-todas");
const paragraphDescriptionTask = document.querySelector(
  ".app__section-active-task-description"
);

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let selectedTask = null;
let liSelectedTask = null;
loadTasks();

btnAddTask.addEventListener("click", () => {
  closeAddTask();
});
cancelBtn.addEventListener("click", () => {
  textArea.value = "";
});
deleteBtn.addEventListener("click", () => {
  closeAddTask();
});
deleteAllTasksBtn.addEventListener("click", () => {
  clearTasks();
});
deleteDoneTasksBtn.addEventListener("click", () => {
  deleteDoneTasks();
});
document.addEventListener("FocoFinalizado", () => {
  if (selectedTask && liSelectedTask) {
    liSelectedTask.classList.remove("app__section-task-list-item-active");
    liSelectedTask.classList.add("app__section-task-list-item-complete");
    liSelectedTask.querySelector("button").setAttribute("disabled", "disabled");
    selectedTask.completed = true;
    updateTask();
  }
});

formAddTask.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = {
    description: textArea.value,
  };
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  textArea.value = "";
  loadTasks();
  closeAddTask();
});

function updateTask() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks() {
  tasks = [];
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
}

function deleteDoneTasks() {
  tarefas = [];
  loadTasks();
}

function createElementTask(task) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");
  const svg = document.createElement("svg");
  svg.innerHTML = `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>`;
  const p = document.createElement("p");
  p.classList.add("app__section-task-list-item-description");
  p.textContent = task.description;

  const button = document.createElement("button");
  button.classList.add("app_button-edit");
  svg.onclick = () => {
    li.classList.toggle("app__section-task-list-item-complete");
    if (li.classList.contains("app__section-task-list-item-complete")) {
      li.querySelector("button").setAttribute("disabled", "disabled");
      task.completed = true;
    } else {
      li.querySelector("button").removeAttribute("disabled");
      task.completed = false;
    }
    loadTasks();
    updateTask();
  };
  button.onclick = () => {
    const newDescription = prompt("Qual o nome da tarefa?");
    if (newDescription) {
      p.textContent = newDescription;
      task.description = newDescription;
      updateTask(task);
    }
  };

  const img = document.createElement("img");
  img.setAttribute("src", "/imagens/edit.png");
  button.append(img);

  li.append(svg);
  li.append(p);
  li.append(button);

  if (task.completed) {
    li.classList.add("app__section-task-list-item-complete");
    button.setAttribute("disabled", "disabled");
  } else {
    li.onclick = () => {
      document
        .querySelectorAll(".app__section-task-list-item-active")
        .forEach((element) => {
          element.classList.remove("app__section-task-list-item-active");
        });
      if (selectedTask === task) {
        paragraphDescriptionTask.textContent = "";
        selectedTask = null;
        liSelectedTask = null;
        return;
      }
      if (!li.classList.contains("app__section-task-list-item-complete")) {
        li.classList.add("app__section-task-list-item-active");
        liSelectedTask = li;
        selectedTask = task;
        paragraphDescriptionTask.textContent = task.description;
      }
    };
  }
  return li;
}

function loadTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const elementTask = createElementTask(task);
    taskList.append(elementTask);
    if (task === selectedTask) {
      elementTask.classList.add("app__section-task-list-item-active");
    }
  });
}

function closeAddTask() {
  formAddTask.classList.toggle("hidden");
  btnAddTask.textContent = "Fechar tarefa";
  if (formAddTask.classList.contains("hidden")) {
    btnAddTask.innerHTML = `<img src="/imagens/add_circle.png" alt="" /> Adicionar nova tarefa
          </button>`;
  }
  textArea.value = "";
}
