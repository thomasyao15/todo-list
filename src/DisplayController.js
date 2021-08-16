import LogicController from "./LogicController";


export default class DisplayController {
    static currentProjectTab = "";  // TODO: insert default project ID in here

    static renderProject(selectedProject) {
        const focusedProjectTitle = document.querySelector("h1")
        focusedProjectTitle.textContent = selectedProject.title + " Project";

        const todoList = document.querySelector(".todo-list")
        todoList.innerHTML = "";  // remove all children todo elements for clean slate

        selectedProject.todos.forEach(todo => {
            const todoDiv = document.createElement("div")
            todoDiv.className = "todo";
            todoDiv.id = todo.ID;
            const todoTitle = document.createElement("p")
            todoTitle.textContent = todo.title;
            todoDiv.append(todoTitle);
            todoList.append(todoDiv);
        })
    }

    static addProject(title, id) {
        const newProject = document.createElement("li")
        newProject.textContent = title;
        newProject.id = id;
        newProject.addEventListener("click", LogicController.handleChangeProjectClick)
        const projectList = document.querySelector("ul");
        projectList.append(newProject);
    }

    static addTodo(newTodo) {
        const todoDiv = document.createElement("div");
        todoDiv.className = "todo";
        todoDiv.id = newTodo.ID;
        const todoTitle = document.createElement("p");
        todoTitle.textContent = newTodo.title;

        const todoList = document.querySelector(".todo-list")
        todoDiv.append(todoTitle)
        todoList.append(todoDiv)
    }

    static deleteTodo() {
    }

    // TODO: add other methods as required
}