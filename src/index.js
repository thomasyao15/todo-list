
import initPage from "./initPage";
import { v4 as uuidv4 } from 'uuid';

initPage();

function generateUniqueID() {
    return uuidv4();
}


class Todo {
    constructor(title) {
        this.title = title;
        this.completed = false;
        this.ID = generateUniqueID();
    }

    toggleCompletion() {
        this.completed = !this.completed
    }
}


class Project {
    constructor(title) {
        this.title = title;
        this.todos = [];
        this.ID = generateUniqueID();
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    deleteTodo(todoID) {
        this.todos.forEach((todo, index, array) => {
            if (todo.ID == todoID) {
                array.splice(index, 1);
            }
        });
    }
}


class User {
    constructor() {
        this.projects = [];
    }

    addProject(project) {
        this.projects.push(project);
    }

    deleteTodo(projectID) {
        this.projects.forEach((project, index, array) => {
            if (project.ID == projectID) {
                array.splice(index, 1);
            }
        });
    }

    getProject(projectID) {
        const filteredProjects = this.projects.filter(project => {
            return project.ID == projectID;
        });

        if (filteredProjects.length == 0) {
            console.log("Project ID doesnt exist");
        } else {
            return filteredProjects[0];
        }
    }

    // TODO: get todos from browser saved files
}


class LogicController {
    // static let currentUser;
    static currentUser = new User();
    static currentProject = "";

    static initNewSession() {
        // TODO: make new user, check if browser has local saves, if not:
        // create project and todos objects to populate for demo
        // add init page logic into here so index.js just calls this method
        // WRITE BELOW METHODS FIRST, then call them so you dont repeat code
        this.createEventHandlers();
        this.demoProjectId = this.handleCreateProjectClick();  // create default demo project on init
        this.handleChangeProjectClick();  // change to default created project on init
    }

    static createEventHandlers() {
        const projectForm = document.getElementById("project-form");
        projectForm.addEventListener("submit", this.handleCreateProjectClick);

        const todoForm = document.getElementById("todo-form");
        todoForm.addEventListener("submit", this.handleCreateTodoClick);
    }

    static handleCreateProjectClick = e => {
        // TODO: entry point to creating new peojects
        // Call this from init new session
        if (e) {
            e.preventDefault();
        }

        const projectTextFieldValue = document.getElementById("new-project").value;
        const projectTitle = projectTextFieldValue == "" ? "Megamen" : projectTextFieldValue;

        const newProject = new Project(projectTitle);
        this.currentUser.addProject(newProject);
        console.log("Created new project: " + projectTitle);

        DisplayController.addProject(projectTitle, newProject.ID);

        return newProject.ID;  // this return is only used for initialising the default demo project
    }

    static handleDeleteProjectClick() {
    }

    static handleChangeProjectClick = e => {
        let projectID;
        if (e) {
            projectID = e.target.id;
        } else {
            projectID = this.demoProjectId;  // set projectID to the stored demoId if event handler invoked artificually from init function
        }
        this.currentProject = projectID;
        const selectedProject = this.currentUser.getProject(projectID);
        DisplayController.renderProject(selectedProject);
    }

    static handleCreateTodoClick = e => {
        e.preventDefault();
        const todoTitle = document.getElementById("new-todo").value;
        const newTodo = new Todo(todoTitle);
        this.currentUser.getProject(this.currentProject).addTodo(newTodo);
        DisplayController.addTodo(newTodo)
    }

    static handleDeleteTodoClick() {
    }

    static handleToggleTodoClick() {
    }
}


class DisplayController {
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
        const todoDiv = document.createElement("div")
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


LogicController.initNewSession();