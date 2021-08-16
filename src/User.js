
export default class User {
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