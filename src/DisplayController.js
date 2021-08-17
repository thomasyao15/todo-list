import LogicController from "./LogicController";
import DeleteBlack from "./delete.svg";


export default class DisplayController {
    static currentProjectTab = "";  // TODO: insert default project ID in here

    static _createDeleteTodoIcon() {
        const deleteDiv = document.createElement("div")
        deleteDiv.className = "delete"
        const deleteIcon = new Image();
        deleteIcon.src = DeleteBlack;
        deleteDiv.append(deleteIcon);

        deleteDiv.addEventListener("click", LogicController.handleDeleteTodoClick, { capture: false });

        return deleteDiv;
    }

    static renderProject(selectedProject) {
        const projectListTabs = Array.from(document.querySelectorAll("li"));
        projectListTabs.forEach(projectListTab => {
            projectListTab.classList.remove("currently-selected")

            if (projectListTab.childNodes.length < 2) {
                const deleteDiv = document.createElement("div")
                deleteDiv.className = "delete"
                const deleteIcon = new Image();
                deleteIcon.src = DeleteBlack;
                deleteDiv.append(deleteIcon);
                projectListTab.append(deleteDiv);
            }
        })
        const selectedProjectListTab = document.querySelector(`[id='${selectedProject.ID}']`)
        selectedProjectListTab.classList.add("currently-selected");
        selectedProjectListTab.childNodes[1].remove()  // remove delete button for currently selected project

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

            const deleteDiv = this._createDeleteTodoIcon();
            todoDiv.append(deleteDiv);
        })


    }

    static addProject(title, id) {
        const newProject = document.createElement("li")
        newProject.textContent = title;
        newProject.id = id;
        newProject.addEventListener("click", LogicController.handleChangeProjectClick)

        const deleteDiv = this._createDeleteTodoIcon();
        newProject.append(deleteDiv);

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

            const deleteDiv = this._createDeleteTodoIcon();
            todoDiv.append(deleteDiv);
        } else {
            todoDiv.classList.remove("completed");
            todoDiv.parentElement.prepend(todoDiv);  // move to top of list
            todoDiv.childNodes[1].remove();  // remove the delete button
        }
    }

    static deleteTodo(todoID) {
        const todoDiv = document.getElementById(todoID);
        todoDiv.remove();
    }

    // TODO: add other methods as required
}