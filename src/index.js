
import initPage from "./initPage";
import { v4 as uuidv4 } from 'uuid';

initPage();


class Todo {
    constructor(title) {
        this.title = title;
        this.completed = false;
    }

    toggleCompletion() {
        this.completed = !this.completed
    }
}

class Project {
    constructor(title) {
        this.title = title;
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }


}

class User {
    constructor() {
        this.projects = [];
    }

    addProject(project) {
        this.projects.push(project);
    }

    // TODO: get todos from browser saved files
}