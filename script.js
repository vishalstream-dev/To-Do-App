let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let todoForm = document.querySelector("#todo-form");
let todoInput = document.querySelector("#todo-input");
let todoList = document.querySelector("#todo-list");
let deleteAllButton = document.querySelector("#delete-all");

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const displayTasks = () => {
    todoList.innerHTML = "";
    tasks.forEach((task, index) => {
        let listItem = document.createElement("li");
        listItem.classList.add("todo-item");
        listItem.textContent = task.text;
        if (task.completed) {
            listItem.classList.add("completed");
        }
        listItem.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            displayTasks();
        });
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
    });
}

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let todoText = todoInput.value.trim();
    if (todoText === "") return;
    tasks.push({
        text: todoText,
        completed: false
    });
    saveTasks();
    displayTasks();
    todoInput.value = "";
});

deleteAllButton.addEventListener("click", () => {
    tasks = [];
    saveTasks();
    displayTasks();
});

displayTasks();