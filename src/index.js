
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

    // TODO: get todos from browser saved files
}


class LogicController {
    static initNewSession() {
        // TODO: make new user, check if browser has local saves, if not:
        // create project and todos objects to populate for demo
        // add init page logic into here so index.js just calls this method
        // WRITE BELOW METHODS FIRST, then call them so you dont repeat code
    }

    static handleCreateProjectClick() {
        // TODO: entry point to creating new peojects
        // Call this from init new session
    }

    static handleDeleteProjectClick() {
    }

    static handleChangeProjectClick() {
    }

    static handleCreateTodoClick() {
    }

    static handleDeleteTodoClick() {
    }

    static handleToggleTodoClick() {
    }
}


class DisplayController {
    static currentProjectTab = "";  // TODO: insert default project ID in here

    static renderProject(projectID) {
    }

    static addTodo() {
    }

    static deleteTodo() {
    }

    // TODO: add other methods as required
}