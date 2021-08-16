import LogicController from "./LogicController";

export function saveData(userObj) {
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

export function loadData(userObj) {
    /** 
     * Retrieves userData from local storage and creates respective projects and todos in the 
     * user object in LogicController
     */
    const userDataString = window.localStorage.getItem("userData");
    let userData;
    if (userDataString) {
        userData = JSON.parse(window.localStorage.getItem("userData"));
    } else {
        return false;  // return false to let function caller know there was no storage
    }
    
    Object.keys(userData).forEach(projectId => {
        const projectObj = userData[projectId];
        const projectTitle = projectObj.projectTitle;
        LogicController.handleCreateProjectClick(undefined, projectTitle, projectId);  // creates project with exact same ID
        LogicController.handleChangeProjectClick(undefined, projectId);  // clicks each one as it loads, focus ends on last project
        
        Object.keys(projectObj.todos).forEach(todoId => {
            const todoObj = projectObj["todos"][todoId];
            const todoTitle = todoObj.todoTitle;
            const completed = todoObj.completed;
            LogicController.handleCreateTodoClick(undefined, todoTitle, todoId);
        })
    })

    return true;
}