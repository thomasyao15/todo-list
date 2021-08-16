import LogicController from "./LogicController";


export default class DisplayController {
    static currentProjectTab = "";  // TODO: insert default project ID in here

    static renderProject(selectedProject) {
        const focusedProjectTitle = document.querySelector("h1")
        focusedProjectTitle.textContent = selectedProject.title + " Project";

        const todoList = document.querySelector(".todo-list")
        todoList.innerHTML = "";  // remove all children todo elements for clean slate

        // Append all uncompleted todos first, loop from the end of array to display latest todos at the top
        selectedProject.todos.slice().reverse().forEach(todo => {
            if (todo.completed == true) {
                return  // only append uncmpleted todos
            }

            const todoDiv = document.createElement("div")
            todoDiv.className = "todo";

            if (todo.completed == true) {
                todoDiv.classList.add("completed");
            }

            todoDiv.id = todo.ID;
            todoDiv.addEventListener("click", LogicController.handleToggleTodoClick);
            const todoTitle = document.createElement("p")
            todoTitle.textContent = todo.title;
            todoDiv.append(todoTitle);
            todoList.append(todoDiv);
        })

        // THEN append all completed todos at the bottom of the list
        selectedProject.todos.slice().reverse().forEach(todo => {
            if (todo.completed == false) {
                return  // only append completed todos
            }

            const todoDiv = document.createElement("div")
            todoDiv.className = "todo";
            todoDiv.classList.add("completed");
            todoDiv.id = todo.ID;
            todoDiv.addEventListener("click", LogicController.handleToggleTodoClick);
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
        todoDiv.addEventListener("click", LogicController.handleToggleTodoClick);
        const todoTitle = document.createElement("p");
        todoTitle.textContent = newTodo.title;

        const todoList = document.querySelector(".todo-list")
        todoDiv.append(todoTitle)
        todoList.prepend(todoDiv)
    }

    static toggleTodo(todoID, completed) {
        const todoDiv = document.getElementById(todoID);

        if (completed) {
            todoDiv.classList.add("completed");
            todoDiv.parentNode.append(todoDiv); // move to the bottom of the list
        } else {
            todoDiv.classList.remove("completed");
            todoDiv.parentElement.prepend(todoDiv);  // move to top of list
        }
    }

    static deleteTodo() {
    }

    // TODO: add other methods as required
}