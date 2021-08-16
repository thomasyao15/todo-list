import generateUniqueID from "./generateUniqueId";

export default class Todo {
    constructor(title) {
        this.title = title;
        this.completed = false;
        this.ID = generateUniqueID();
    }

    toggleCompletion() {
        this.completed = !this.completed
    }
}