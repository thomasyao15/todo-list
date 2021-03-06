import generateUniqueID from "./generateUniqueId";

export default class Project {
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

    getTodo(todoID) {
        const filteredTodos = this.todos.filter(todo => {
            return todo.ID == todoID;
        });

        if (filteredTodos.length == 0) {
            console.log("Todo ID doesnt exist");
        } else {
            return filteredTodos[0];
        }
    }
}