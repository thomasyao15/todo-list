import User from "./User";
import DisplayController from "./DisplayController";
import Project from "./Project";
import Todo from "./Todo";


export default class LogicController {
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

        const projectTextField = document.getElementById("new-project")
        const projectTitle = projectTextField.value == "" ? "Megamen" : projectTextField.value;
        projectTextField.value = "";

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
        const todoTextField = document.getElementById("new-todo")
        const todoTitle = todoTextField.value;
        // TODO: if todotitle is empty, then dont run the rest - keeps crashing though.
        const newTodo = new Todo(todoTitle);
        this.currentUser.getProject(this.currentProject).addTodo(newTodo);
        DisplayController.addTodo(newTodo)
    }

    static handleDeleteTodoClick() {
    }

    static handleToggleTodoClick() {
    }
}