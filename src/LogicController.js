import User from "./User";
import DisplayController from "./DisplayController";
import Project from "./Project";
import Todo from "./Todo";
import { saveData, loadData } from "./LocalStorage"

export default class LogicController {
    // static let currentUser;
    static currentUser = new User();
    static currentProject = "";

    static initNewSession() {
        // TODO: make new user, check if browser has local saves, if not:
        // create project and todos objects to populate for demo
        // add init page logic into here so index.js just calls this method
        // WRITE BELOW METHODS FIRST, then call them so you dont repeat code
        const loadedFromStorage = loadData();  // returns true if localStorage has data
        if (!loadedFromStorage) {
            let demoProjectId = this.handleCreateProjectClick(undefined, "Megamen");  // create default demo project on init
            this.handleChangeProjectClick(undefined, demoProjectId);  // change to default created project on init
        }
        this.createEventHandlers();
    }

    static createEventHandlers() {
        const projectForm = document.getElementById("project-form");
        projectForm.addEventListener("submit", this.handleCreateProjectClick);

        const todoForm = document.getElementById("todo-form");
        todoForm.addEventListener("submit", this.handleCreateTodoClick);
    }

    static handleCreateProjectClick = (e, manualProjectTitle=undefined, manualProjectID=undefined) => {
        /**
         * Can be called as event handler or manually from init function
         * for initialisation purposes
         * Can set manual project ID to get exact ID from localstorage
         */
        if (e) {
            e.preventDefault();
        }

        const projectTextField = document.getElementById("new-project")
        const projectTitle = manualProjectTitle ? manualProjectTitle : projectTextField.value;
        projectTextField.value = "";

        const newProject = new Project(projectTitle);

        if (manualProjectID) {
            newProject.ID = manualProjectID;
        }

        this.currentUser.addProject(newProject);
        console.log("Created new project: " + projectTitle);

        DisplayController.addProject(projectTitle, newProject.ID);

        saveData(this.currentUser);
        return newProject.ID;  // this return is only used for initialising the default demo project
        
    }

    static handleDeleteProjectClick() {
    }

    static handleChangeProjectClick = (e, projectId=undefined) => {
        let projectID;
        if (e) {
            projectID = e.target.id;
        } else {
            projectID = projectId;  // set projectID to the stored demoId if event handler invoked artificually from init function
        }
        this.currentProject = projectID;
        const selectedProject = this.currentUser.getProject(projectID);
        DisplayController.renderProject(selectedProject);

    }

    static handleCreateTodoClick = (e, manualTodoTitle=undefined, manualTodoID=undefined) => {
        if (e) {
            e.preventDefault();
        }
        const todoTextField = document.getElementById("new-todo")
        const todoTitle = manualTodoTitle ? manualTodoTitle : todoTextField.value;
        todoTextField.value = "";

        if (todoTitle != "") {
            const newTodo = new Todo(todoTitle);
            if (manualTodoID) {
                newTodo.ID = manualTodoID;
            }
            this.currentUser.getProject(this.currentProject).addTodo(newTodo);
            console.log(this.currentUser.getProject(this.currentProject).todos);
            DisplayController.addTodo(newTodo)
        }

        saveData(this.currentUser);
    }

    static handleDeleteTodoClick = (e) => {
        e.stopPropagation();
        const targetTodoId = e.currentTarget.parentNode.id;
        console.log(targetTodoId);
        this.currentUser.getProject(this.currentProject).deleteTodo(targetTodoId);
        DisplayController.deleteTodo(targetTodoId);
        saveData(this.currentUser);
    }

    static handleToggleTodoClick = (e, manualTodoID=undefined) => {
        /**
         * Grabs clicked Todo ID and toggles completion then toggles completed class to it
         * Later move it to the bottom of todo list
         */
        const todoID = manualTodoID ? manualTodoID : e.currentTarget.id;
        const currentProject = this.currentUser.getProject(this.currentProject);
        const selectedTodo = currentProject.getTodo(todoID);
        
        selectedTodo.toggleCompletion();

        const completed = selectedTodo.completed;
        DisplayController.toggleTodo(todoID, completed)

        saveData(this.currentUser);
    }
}