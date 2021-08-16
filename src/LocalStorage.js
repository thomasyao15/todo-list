import LogicController from "./LogicController";

export function saveData() {
    /**
     * Grabs all projects in user object and saves them into browser local storage
     * Overrides old local storage
     * E.g. 
     * localStorageObj = {
     *      "1h2u429367": {
     *          "1y234671262": {
     *              "title": "do stuff",
     *              "completed": true,
     *          }
     *      }
     * }
     */
    const userObj = LogicController.currentUser;
    const userData = {};

    userObj.projects.forEach(project => {
        userData[project.ID] = {"projectTitle": project.title, "todos": {}};  // create nested obj in localStorage with project ID as the key
        project.todos.forEach(todo => {
            userData[project.ID]["todos"][todo.ID] = {
                "todoTitle": todo.title,
                "completed": todo.completed,
            };
        });
    });

    window.localStorage.setItem("userData", JSON.stringify(userData))
}

export function loadData() {
    /** 
     * Retrieves userData from local storage and creates respective projects and todos in the 
     * user object in LogicController
     */
}