/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 860:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "f8920e2795e091ef0a0c.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

;// CONCATENATED MODULE: ./src/initPage.js

function initPage() {
    const mainDiv = document.querySelector(".main")
    mainDiv.innerHTML = `
        <div class="nav-bar">
            <header>Thomash's Todo List</header>
        </div>
        <div class="body-content">
            <div class="side-pane">
                <div class="wrapper">
                    <h2>My Projects</h2>
                    <div class="projects">
                        <ul>
                        </ul>
                    </div>
                </div>
                <form id="project-form" action="create-project">
                    <input autocomplete="off" type="text" name="new-project" id="new-project" placeholder="Enter a new project name">
                    <button type="submit">Create New Project</button>
                </form>
            </div>
            <div class="todo-content">
                <div class="todo-wrapper">
                    <h1>Pogs Project</h1>
                    <div class="todo-list"></div>
                </div>
                <form id="todo-form" action="create-todo">
                    <input autocomplete="off" type="text" name="new-todo" id="new-todo" placeholder="Enter a new task">
                    <button type="submit">Create New Todo</button>
                </form>
            </div>
        </div>
    `
}

;// CONCATENATED MODULE: ./src/User.js

class User {
    constructor() {
        this.projects = [];
    }

    addProject(project) {
        this.projects.push(project);
    }

    deleteProject(projectID) {
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
// EXTERNAL MODULE: ./src/delete.svg
var src_delete = __webpack_require__(860);
;// CONCATENATED MODULE: ./src/DisplayController.js




class DisplayController {
    static currentProjectTab = "";  // TODO: insert default project ID in here

    static _createDeleteTodoIcon() {
        const deleteDiv = document.createElement("div")
        deleteDiv.className = "delete"
        const deleteIcon = new Image();
        deleteIcon.src = src_delete;
        deleteDiv.append(deleteIcon);

        deleteDiv.addEventListener("click", LogicController.handleDeleteTodoClick, { capture: false });

        return deleteDiv;
    }

    static _createDeleteProjectIcon() {
        const deleteDiv = document.createElement("div")
        deleteDiv.className = "delete"
        const deleteIcon = new Image();
        deleteIcon.src = src_delete;
        deleteDiv.append(deleteIcon);

        deleteDiv.addEventListener("click", LogicController.handleDeleteProjectClick, { capture: false });

        return deleteDiv;
    }

    static renderProject(selectedProject) {
        const projectListTabs = Array.from(document.querySelectorAll("li"));
        projectListTabs.forEach(projectListTab => {
            projectListTab.classList.remove("currently-selected")

            if (projectListTab.childNodes.length < 2) {
                const deleteDiv = this._createDeleteProjectIcon();
                projectListTab.append(deleteDiv);
            }
        })
        const selectedProjectListTab = document.querySelector(`[id='${selectedProject.ID}']`)
        selectedProjectListTab.classList.add("currently-selected");
        selectedProjectListTab.childNodes[1].remove()  // remove delete button for currently selected project

        const focusedProjectTitle = document.querySelector("h1")
        focusedProjectTitle.textContent = selectedProject.title + " Project";

        const todoList = document.querySelector(".todo-list")
        todoList.innerHTML = "";  // remove all children todo elements for clean slate

        // Append all uncompleted todos first, loop from the end of array to display latest todos at the top
        selectedProject.todos.slice().reverse().forEach(todo => {
            if (todo.completed == true) {
                return  // only append uncmpleted todos
            }

            const todoDiv = document.createElement("div")
            todoDiv.className = "todo";

            if (todo.completed == true) {
                todoDiv.classList.add("completed");
            }

            todoDiv.id = todo.ID;
            todoDiv.addEventListener("click", LogicController.handleToggleTodoClick);
            const todoTitle = document.createElement("p")
            todoTitle.textContent = todo.title;
            todoDiv.append(todoTitle);
            todoList.append(todoDiv);
        })

        // THEN append all completed todos at the bottom of the list
        selectedProject.todos.slice().reverse().forEach(todo => {
            if (todo.completed == false) {
                return  // only append completed todos
            }

            const todoDiv = document.createElement("div")
            todoDiv.className = "todo";
            todoDiv.classList.add("completed");
            todoDiv.id = todo.ID;
            todoDiv.addEventListener("click", LogicController.handleToggleTodoClick);
            const todoTitle = document.createElement("p")
            todoTitle.textContent = todo.title;
            todoDiv.append(todoTitle);
            todoList.append(todoDiv);

            const deleteDiv = this._createDeleteTodoIcon();
            todoDiv.append(deleteDiv);
        })


    }

    static addProject(title, id) {
        const newProject = document.createElement("li")
        newProject.textContent = title;
        newProject.id = id;
        newProject.addEventListener("click", LogicController.handleChangeProjectClick)

        const deleteDiv = this._createDeleteProjectIcon();
        newProject.append(deleteDiv);

        const projectList = document.querySelector("ul");
        projectList.append(newProject);
    }

    static addTodo(newTodo) {
        const todoDiv = document.createElement("div");
        todoDiv.className = "todo";
        todoDiv.id = newTodo.ID;
        todoDiv.addEventListener("click", LogicController.handleToggleTodoClick);
        const todoTitle = document.createElement("p");
        todoTitle.textContent = newTodo.title;

        const todoList = document.querySelector(".todo-list")
        todoDiv.append(todoTitle)
        todoList.prepend(todoDiv)
    }

    static toggleTodo(todoID, completed) {
        const todoDiv = document.getElementById(todoID);

        if (completed) {
            todoDiv.classList.add("completed");
            todoDiv.parentNode.append(todoDiv); // move to the bottom of the list

            const deleteDiv = this._createDeleteTodoIcon();
            todoDiv.append(deleteDiv);
        } else {
            todoDiv.classList.remove("completed");
            todoDiv.parentElement.prepend(todoDiv);  // move to top of list
            todoDiv.childNodes[1].remove();  // remove the delete button
        }
    }

    static deleteTodo(todoID) {
        const todoDiv = document.getElementById(todoID);
        todoDiv.remove();
    }

    static deleteProject(projectID) {
        const projectDiv = document.getElementById(projectID);
        projectDiv.remove();
    }

    // TODO: add other methods as required
}
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/rng.js
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/regex.js
/* harmony default export */ const regex = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/validate.js


function validate(uuid) {
  return typeof uuid === 'string' && regex.test(uuid);
}

/* harmony default export */ const esm_browser_validate = (validate);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/stringify.js

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!esm_browser_validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const esm_browser_stringify = (stringify);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v4.js



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return esm_browser_stringify(rnds);
}

/* harmony default export */ const esm_browser_v4 = (v4);
;// CONCATENATED MODULE: ./src/generateUniqueId.js


function generateUniqueID() {
    return esm_browser_v4();
}
;// CONCATENATED MODULE: ./src/Project.js


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
;// CONCATENATED MODULE: ./src/Todo.js


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
;// CONCATENATED MODULE: ./src/LocalStorage.js


function saveData(userObj) {
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

function loadData() {
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
            if (completed) {
                LogicController.handleToggleTodoClick(undefined, todoId);
            }
        })
    })

    return true;
}
;// CONCATENATED MODULE: ./src/LogicController.js






class LogicController {
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

    static handleDeleteProjectClick = (e) => {
        e.stopPropagation();
        const targetProjectId = e.currentTarget.parentNode.id;
        console.log(targetProjectId);
        this.currentUser.deleteProject(targetProjectId);
        DisplayController.deleteProject(targetProjectId);
        saveData(this.currentUser);
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
;// CONCATENATED MODULE: ./src/index.js




initPage();
LogicController.initNewSession();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQSxRQUFRLFFBQVE7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDRCQUE0QjtBQUNwQyxRQUFRLFFBQVE7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNEJBQTRCO0FBQ3BDO0FBQ0EsUUFBUSxRQUFRO0FBQ2hCO0FBQ0E7O0FDbElBO0FBQ2tDO0FBQ2M7QUFDaEQ7QUFDQSxRQUFRO0FBQ1IsOEJBQThCLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbml0UGFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvVXNlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvRGlzcGxheUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9yZWdleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2dlbmVyYXRlVW5pcXVlSWQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL1Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL1RvZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL0xvY2FsU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvTG9naWNDb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIlxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0UGFnZSgpIHtcclxuICAgIGNvbnN0IG1haW5EaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5cIilcclxuICAgIG1haW5EaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJuYXYtYmFyXCI+XHJcbiAgICAgICAgICAgIDxoZWFkZXI+VGhvbWFzaCdzIFRvZG8gTGlzdDwvaGVhZGVyPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJib2R5LWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNpZGUtcGFuZVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXBwZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDI+TXkgUHJvamVjdHM8L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9qZWN0c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxmb3JtIGlkPVwicHJvamVjdC1mb3JtXCIgYWN0aW9uPVwiY3JlYXRlLXByb2plY3RcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgYXV0b2NvbXBsZXRlPVwib2ZmXCIgdHlwZT1cInRleHRcIiBuYW1lPVwibmV3LXByb2plY3RcIiBpZD1cIm5ldy1wcm9qZWN0XCIgcGxhY2Vob2xkZXI9XCJFbnRlciBhIG5ldyBwcm9qZWN0IG5hbWVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5DcmVhdGUgTmV3IFByb2plY3Q8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDE+UG9ncyBQcm9qZWN0PC9oMT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1saXN0XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxmb3JtIGlkPVwidG9kby1mb3JtXCIgYWN0aW9uPVwiY3JlYXRlLXRvZG9cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgYXV0b2NvbXBsZXRlPVwib2ZmXCIgdHlwZT1cInRleHRcIiBuYW1lPVwibmV3LXRvZG9cIiBpZD1cIm5ldy10b2RvXCIgcGxhY2Vob2xkZXI9XCJFbnRlciBhIG5ldyB0YXNrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+Q3JlYXRlIE5ldyBUb2RvPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYFxyXG59XHJcbiIsIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMucHJvamVjdHMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRQcm9qZWN0KHByb2plY3QpIHtcclxuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gocHJvamVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlUHJvamVjdChwcm9qZWN0SUQpIHtcclxuICAgICAgICB0aGlzLnByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4LCBhcnJheSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocHJvamVjdC5JRCA9PSBwcm9qZWN0SUQpIHtcclxuICAgICAgICAgICAgICAgIGFycmF5LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQcm9qZWN0KHByb2plY3RJRCkge1xyXG4gICAgICAgIGNvbnN0IGZpbHRlcmVkUHJvamVjdHMgPSB0aGlzLnByb2plY3RzLmZpbHRlcihwcm9qZWN0ID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHByb2plY3QuSUQgPT0gcHJvamVjdElEO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoZmlsdGVyZWRQcm9qZWN0cy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2plY3QgSUQgZG9lc250IGV4aXN0XCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJlZFByb2plY3RzWzBdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBUT0RPOiBnZXQgdG9kb3MgZnJvbSBicm93c2VyIHNhdmVkIGZpbGVzXHJcbn0iLCJpbXBvcnQgTG9naWNDb250cm9sbGVyIGZyb20gXCIuL0xvZ2ljQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgRGVsZXRlQmxhY2sgZnJvbSBcIi4vZGVsZXRlLnN2Z1wiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpc3BsYXlDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyBjdXJyZW50UHJvamVjdFRhYiA9IFwiXCI7ICAvLyBUT0RPOiBpbnNlcnQgZGVmYXVsdCBwcm9qZWN0IElEIGluIGhlcmVcclxuXHJcbiAgICBzdGF0aWMgX2NyZWF0ZURlbGV0ZVRvZG9JY29uKCkge1xyXG4gICAgICAgIGNvbnN0IGRlbGV0ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgICAgICBkZWxldGVEaXYuY2xhc3NOYW1lID0gXCJkZWxldGVcIlxyXG4gICAgICAgIGNvbnN0IGRlbGV0ZUljb24gPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBkZWxldGVJY29uLnNyYyA9IERlbGV0ZUJsYWNrO1xyXG4gICAgICAgIGRlbGV0ZURpdi5hcHBlbmQoZGVsZXRlSWNvbik7XHJcblxyXG4gICAgICAgIGRlbGV0ZURpdi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgTG9naWNDb250cm9sbGVyLmhhbmRsZURlbGV0ZVRvZG9DbGljaywgeyBjYXB0dXJlOiBmYWxzZSB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlbGV0ZURpdjtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgX2NyZWF0ZURlbGV0ZVByb2plY3RJY29uKCkge1xyXG4gICAgICAgIGNvbnN0IGRlbGV0ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgICAgICBkZWxldGVEaXYuY2xhc3NOYW1lID0gXCJkZWxldGVcIlxyXG4gICAgICAgIGNvbnN0IGRlbGV0ZUljb24gPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBkZWxldGVJY29uLnNyYyA9IERlbGV0ZUJsYWNrO1xyXG4gICAgICAgIGRlbGV0ZURpdi5hcHBlbmQoZGVsZXRlSWNvbik7XHJcblxyXG4gICAgICAgIGRlbGV0ZURpdi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgTG9naWNDb250cm9sbGVyLmhhbmRsZURlbGV0ZVByb2plY3RDbGljaywgeyBjYXB0dXJlOiBmYWxzZSB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlbGV0ZURpdjtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcmVuZGVyUHJvamVjdChzZWxlY3RlZFByb2plY3QpIHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0TGlzdFRhYnMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaVwiKSk7XHJcbiAgICAgICAgcHJvamVjdExpc3RUYWJzLmZvckVhY2gocHJvamVjdExpc3RUYWIgPT4ge1xyXG4gICAgICAgICAgICBwcm9qZWN0TGlzdFRhYi5jbGFzc0xpc3QucmVtb3ZlKFwiY3VycmVudGx5LXNlbGVjdGVkXCIpXHJcblxyXG4gICAgICAgICAgICBpZiAocHJvamVjdExpc3RUYWIuY2hpbGROb2Rlcy5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZWxldGVEaXYgPSB0aGlzLl9jcmVhdGVEZWxldGVQcm9qZWN0SWNvbigpO1xyXG4gICAgICAgICAgICAgICAgcHJvamVjdExpc3RUYWIuYXBwZW5kKGRlbGV0ZURpdik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkUHJvamVjdExpc3RUYWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbaWQ9JyR7c2VsZWN0ZWRQcm9qZWN0LklEfSddYClcclxuICAgICAgICBzZWxlY3RlZFByb2plY3RMaXN0VGFiLmNsYXNzTGlzdC5hZGQoXCJjdXJyZW50bHktc2VsZWN0ZWRcIik7XHJcbiAgICAgICAgc2VsZWN0ZWRQcm9qZWN0TGlzdFRhYi5jaGlsZE5vZGVzWzFdLnJlbW92ZSgpICAvLyByZW1vdmUgZGVsZXRlIGJ1dHRvbiBmb3IgY3VycmVudGx5IHNlbGVjdGVkIHByb2plY3RcclxuXHJcbiAgICAgICAgY29uc3QgZm9jdXNlZFByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoMVwiKVxyXG4gICAgICAgIGZvY3VzZWRQcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSBzZWxlY3RlZFByb2plY3QudGl0bGUgKyBcIiBQcm9qZWN0XCI7XHJcblxyXG4gICAgICAgIGNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3RcIilcclxuICAgICAgICB0b2RvTGlzdC5pbm5lckhUTUwgPSBcIlwiOyAgLy8gcmVtb3ZlIGFsbCBjaGlsZHJlbiB0b2RvIGVsZW1lbnRzIGZvciBjbGVhbiBzbGF0ZVxyXG5cclxuICAgICAgICAvLyBBcHBlbmQgYWxsIHVuY29tcGxldGVkIHRvZG9zIGZpcnN0LCBsb29wIGZyb20gdGhlIGVuZCBvZiBhcnJheSB0byBkaXNwbGF5IGxhdGVzdCB0b2RvcyBhdCB0aGUgdG9wXHJcbiAgICAgICAgc2VsZWN0ZWRQcm9qZWN0LnRvZG9zLnNsaWNlKCkucmV2ZXJzZSgpLmZvckVhY2godG9kbyA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0b2RvLmNvbXBsZXRlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIC8vIG9ubHkgYXBwZW5kIHVuY21wbGV0ZWQgdG9kb3NcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgdG9kb0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgICAgICAgICAgdG9kb0Rpdi5jbGFzc05hbWUgPSBcInRvZG9cIjtcclxuXHJcbiAgICAgICAgICAgIGlmICh0b2RvLmNvbXBsZXRlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB0b2RvRGl2LmNsYXNzTGlzdC5hZGQoXCJjb21wbGV0ZWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRvZG9EaXYuaWQgPSB0b2RvLklEO1xyXG4gICAgICAgICAgICB0b2RvRGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBMb2dpY0NvbnRyb2xsZXIuaGFuZGxlVG9nZ2xlVG9kb0NsaWNrKTtcclxuICAgICAgICAgICAgY29uc3QgdG9kb1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuICAgICAgICAgICAgdG9kb1RpdGxlLnRleHRDb250ZW50ID0gdG9kby50aXRsZTtcclxuICAgICAgICAgICAgdG9kb0Rpdi5hcHBlbmQodG9kb1RpdGxlKTtcclxuICAgICAgICAgICAgdG9kb0xpc3QuYXBwZW5kKHRvZG9EaXYpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIFRIRU4gYXBwZW5kIGFsbCBjb21wbGV0ZWQgdG9kb3MgYXQgdGhlIGJvdHRvbSBvZiB0aGUgbGlzdFxyXG4gICAgICAgIHNlbGVjdGVkUHJvamVjdC50b2Rvcy5zbGljZSgpLnJldmVyc2UoKS5mb3JFYWNoKHRvZG8gPT4ge1xyXG4gICAgICAgICAgICBpZiAodG9kby5jb21wbGV0ZWQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAgLy8gb25seSBhcHBlbmQgY29tcGxldGVkIHRvZG9zXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRvZG9EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICAgICAgICAgIHRvZG9EaXYuY2xhc3NOYW1lID0gXCJ0b2RvXCI7XHJcbiAgICAgICAgICAgIHRvZG9EaXYuY2xhc3NMaXN0LmFkZChcImNvbXBsZXRlZFwiKTtcclxuICAgICAgICAgICAgdG9kb0Rpdi5pZCA9IHRvZG8uSUQ7XHJcbiAgICAgICAgICAgIHRvZG9EaXYuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIExvZ2ljQ29udHJvbGxlci5oYW5kbGVUb2dnbGVUb2RvQ2xpY2spO1xyXG4gICAgICAgICAgICBjb25zdCB0b2RvVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG4gICAgICAgICAgICB0b2RvVGl0bGUudGV4dENvbnRlbnQgPSB0b2RvLnRpdGxlO1xyXG4gICAgICAgICAgICB0b2RvRGl2LmFwcGVuZCh0b2RvVGl0bGUpO1xyXG4gICAgICAgICAgICB0b2RvTGlzdC5hcHBlbmQodG9kb0Rpdik7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkZWxldGVEaXYgPSB0aGlzLl9jcmVhdGVEZWxldGVUb2RvSWNvbigpO1xyXG4gICAgICAgICAgICB0b2RvRGl2LmFwcGVuZChkZWxldGVEaXYpO1xyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYWRkUHJvamVjdCh0aXRsZSwgaWQpIHtcclxuICAgICAgICBjb25zdCBuZXdQcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpXHJcbiAgICAgICAgbmV3UHJvamVjdC50ZXh0Q29udGVudCA9IHRpdGxlO1xyXG4gICAgICAgIG5ld1Byb2plY3QuaWQgPSBpZDtcclxuICAgICAgICBuZXdQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBMb2dpY0NvbnRyb2xsZXIuaGFuZGxlQ2hhbmdlUHJvamVjdENsaWNrKVxyXG5cclxuICAgICAgICBjb25zdCBkZWxldGVEaXYgPSB0aGlzLl9jcmVhdGVEZWxldGVQcm9qZWN0SWNvbigpO1xyXG4gICAgICAgIG5ld1Byb2plY3QuYXBwZW5kKGRlbGV0ZURpdik7XHJcblxyXG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInVsXCIpO1xyXG4gICAgICAgIHByb2plY3RMaXN0LmFwcGVuZChuZXdQcm9qZWN0KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYWRkVG9kbyhuZXdUb2RvKSB7XHJcbiAgICAgICAgY29uc3QgdG9kb0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgdG9kb0Rpdi5jbGFzc05hbWUgPSBcInRvZG9cIjtcclxuICAgICAgICB0b2RvRGl2LmlkID0gbmV3VG9kby5JRDtcclxuICAgICAgICB0b2RvRGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBMb2dpY0NvbnRyb2xsZXIuaGFuZGxlVG9nZ2xlVG9kb0NsaWNrKTtcclxuICAgICAgICBjb25zdCB0b2RvVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICB0b2RvVGl0bGUudGV4dENvbnRlbnQgPSBuZXdUb2RvLnRpdGxlO1xyXG5cclxuICAgICAgICBjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1saXN0XCIpXHJcbiAgICAgICAgdG9kb0Rpdi5hcHBlbmQodG9kb1RpdGxlKVxyXG4gICAgICAgIHRvZG9MaXN0LnByZXBlbmQodG9kb0RpdilcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdG9nZ2xlVG9kbyh0b2RvSUQsIGNvbXBsZXRlZCkge1xyXG4gICAgICAgIGNvbnN0IHRvZG9EaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0b2RvSUQpO1xyXG5cclxuICAgICAgICBpZiAoY29tcGxldGVkKSB7XHJcbiAgICAgICAgICAgIHRvZG9EaXYuY2xhc3NMaXN0LmFkZChcImNvbXBsZXRlZFwiKTtcclxuICAgICAgICAgICAgdG9kb0Rpdi5wYXJlbnROb2RlLmFwcGVuZCh0b2RvRGl2KTsgLy8gbW92ZSB0byB0aGUgYm90dG9tIG9mIHRoZSBsaXN0XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkZWxldGVEaXYgPSB0aGlzLl9jcmVhdGVEZWxldGVUb2RvSWNvbigpO1xyXG4gICAgICAgICAgICB0b2RvRGl2LmFwcGVuZChkZWxldGVEaXYpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRvZG9EaXYuY2xhc3NMaXN0LnJlbW92ZShcImNvbXBsZXRlZFwiKTtcclxuICAgICAgICAgICAgdG9kb0Rpdi5wYXJlbnRFbGVtZW50LnByZXBlbmQodG9kb0Rpdik7ICAvLyBtb3ZlIHRvIHRvcCBvZiBsaXN0XHJcbiAgICAgICAgICAgIHRvZG9EaXYuY2hpbGROb2Rlc1sxXS5yZW1vdmUoKTsgIC8vIHJlbW92ZSB0aGUgZGVsZXRlIGJ1dHRvblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZGVsZXRlVG9kbyh0b2RvSUQpIHtcclxuICAgICAgICBjb25zdCB0b2RvRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodG9kb0lEKTtcclxuICAgICAgICB0b2RvRGl2LnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkZWxldGVQcm9qZWN0KHByb2plY3RJRCkge1xyXG4gICAgICAgIGNvbnN0IHByb2plY3REaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcm9qZWN0SUQpO1xyXG4gICAgICAgIHByb2plY3REaXYucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVE9ETzogYWRkIG90aGVyIG1ldGhvZHMgYXMgcmVxdWlyZWRcclxufSIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxudmFyIGdldFJhbmRvbVZhbHVlcztcbnZhciBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJuZygpIHtcbiAgLy8gbGF6eSBsb2FkIHNvIHRoYXQgZW52aXJvbm1lbnRzIHRoYXQgbmVlZCB0byBwb2x5ZmlsbCBoYXZlIGEgY2hhbmNlIHRvIGRvIHNvXG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLiBBbHNvLFxuICAgIC8vIGZpbmQgdGhlIGNvbXBsZXRlIGltcGxlbWVudGF0aW9uIG9mIGNyeXB0byAobXNDcnlwdG8pIG9uIElFMTEuXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKSB8fCB0eXBlb2YgbXNDcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT09ICdmdW5jdGlvbicgJiYgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQobXNDcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCJleHBvcnQgZGVmYXVsdCAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCkkL2k7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbnZhciBieXRlVG9IZXggPSBbXTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpKTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFycikge1xuICB2YXIgb2Zmc2V0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgdmFyIHV1aWQgPSAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgc3RyaW5naWZ5IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZW5lcmF0ZVVuaXF1ZUlEKCkge1xyXG4gICAgcmV0dXJuIHV1aWR2NCgpO1xyXG59IiwiaW1wb3J0IGdlbmVyYXRlVW5pcXVlSUQgZnJvbSBcIi4vZ2VuZXJhdGVVbmlxdWVJZFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSkge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLnRvZG9zID0gW107XHJcbiAgICAgICAgdGhpcy5JRCA9IGdlbmVyYXRlVW5pcXVlSUQoKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUb2RvKHRvZG8pIHtcclxuICAgICAgICB0aGlzLnRvZG9zLnB1c2godG9kbyk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlVG9kbyh0b2RvSUQpIHtcclxuICAgICAgICB0aGlzLnRvZG9zLmZvckVhY2goKHRvZG8sIGluZGV4LCBhcnJheSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodG9kby5JRCA9PSB0b2RvSUQpIHtcclxuICAgICAgICAgICAgICAgIGFycmF5LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUb2RvKHRvZG9JRCkge1xyXG4gICAgICAgIGNvbnN0IGZpbHRlcmVkVG9kb3MgPSB0aGlzLnRvZG9zLmZpbHRlcih0b2RvID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRvZG8uSUQgPT0gdG9kb0lEO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoZmlsdGVyZWRUb2Rvcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRvZG8gSUQgZG9lc250IGV4aXN0XCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJlZFRvZG9zWzBdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBnZW5lcmF0ZVVuaXF1ZUlEIGZyb20gXCIuL2dlbmVyYXRlVW5pcXVlSWRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZG8ge1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUpIHtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLklEID0gZ2VuZXJhdGVVbmlxdWVJRCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZUNvbXBsZXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSAhdGhpcy5jb21wbGV0ZWRcclxuICAgIH1cclxufSIsImltcG9ydCBMb2dpY0NvbnRyb2xsZXIgZnJvbSBcIi4vTG9naWNDb250cm9sbGVyXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2F2ZURhdGEodXNlck9iaikge1xyXG4gICAgLyoqXHJcbiAgICAgKiBHcmFicyBhbGwgcHJvamVjdHMgaW4gdXNlciBvYmplY3QgYW5kIHNhdmVzIHRoZW0gaW50byBicm93c2VyIGxvY2FsIHN0b3JhZ2VcclxuICAgICAqIE92ZXJyaWRlcyBvbGQgbG9jYWwgc3RvcmFnZVxyXG4gICAgICogRS5nLiBcclxuICAgICAqIGxvY2FsU3RvcmFnZU9iaiA9IHtcclxuICAgICAqICAgICAgXCIxaDJ1NDI5MzY3XCI6IHtcclxuICAgICAqICAgICAgICAgIFwiMXkyMzQ2NzEyNjJcIjoge1xyXG4gICAgICogICAgICAgICAgICAgIFwidGl0bGVcIjogXCJkbyBzdHVmZlwiLFxyXG4gICAgICogICAgICAgICAgICAgIFwiY29tcGxldGVkXCI6IHRydWUsXHJcbiAgICAgKiAgICAgICAgICB9XHJcbiAgICAgKiAgICAgIH1cclxuICAgICAqIH1cclxuICAgICAqL1xyXG4gICAgY29uc3QgdXNlckRhdGEgPSB7fTtcclxuXHJcbiAgICB1c2VyT2JqLnByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XHJcbiAgICAgICAgdXNlckRhdGFbcHJvamVjdC5JRF0gPSB7XCJwcm9qZWN0VGl0bGVcIjogcHJvamVjdC50aXRsZSwgXCJ0b2Rvc1wiOiB7fX07ICAvLyBjcmVhdGUgbmVzdGVkIG9iaiBpbiBsb2NhbFN0b3JhZ2Ugd2l0aCBwcm9qZWN0IElEIGFzIHRoZSBrZXlcclxuICAgICAgICBwcm9qZWN0LnRvZG9zLmZvckVhY2godG9kbyA9PiB7XHJcbiAgICAgICAgICAgIHVzZXJEYXRhW3Byb2plY3QuSURdW1widG9kb3NcIl1bdG9kby5JRF0gPSB7XHJcbiAgICAgICAgICAgICAgICBcInRvZG9UaXRsZVwiOiB0b2RvLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wbGV0ZWRcIjogdG9kby5jb21wbGV0ZWQsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ1c2VyRGF0YVwiLCBKU09OLnN0cmluZ2lmeSh1c2VyRGF0YSkpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkRGF0YSgpIHtcclxuICAgIC8qKiBcclxuICAgICAqIFJldHJpZXZlcyB1c2VyRGF0YSBmcm9tIGxvY2FsIHN0b3JhZ2UgYW5kIGNyZWF0ZXMgcmVzcGVjdGl2ZSBwcm9qZWN0cyBhbmQgdG9kb3MgaW4gdGhlIFxyXG4gICAgICogdXNlciBvYmplY3QgaW4gTG9naWNDb250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0IHVzZXJEYXRhU3RyaW5nID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlckRhdGFcIik7XHJcbiAgICBsZXQgdXNlckRhdGE7XHJcbiAgICBpZiAodXNlckRhdGFTdHJpbmcpIHtcclxuICAgICAgICB1c2VyRGF0YSA9IEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlckRhdGFcIikpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7ICAvLyByZXR1cm4gZmFsc2UgdG8gbGV0IGZ1bmN0aW9uIGNhbGxlciBrbm93IHRoZXJlIHdhcyBubyBzdG9yYWdlXHJcbiAgICB9XHJcbiAgICBcclxuICAgIE9iamVjdC5rZXlzKHVzZXJEYXRhKS5mb3JFYWNoKHByb2plY3RJZCA9PiB7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdE9iaiA9IHVzZXJEYXRhW3Byb2plY3RJZF07XHJcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gcHJvamVjdE9iai5wcm9qZWN0VGl0bGU7XHJcbiAgICAgICAgTG9naWNDb250cm9sbGVyLmhhbmRsZUNyZWF0ZVByb2plY3RDbGljayh1bmRlZmluZWQsIHByb2plY3RUaXRsZSwgcHJvamVjdElkKTsgIC8vIGNyZWF0ZXMgcHJvamVjdCB3aXRoIGV4YWN0IHNhbWUgSURcclxuICAgICAgICBMb2dpY0NvbnRyb2xsZXIuaGFuZGxlQ2hhbmdlUHJvamVjdENsaWNrKHVuZGVmaW5lZCwgcHJvamVjdElkKTsgIC8vIGNsaWNrcyBlYWNoIG9uZSBhcyBpdCBsb2FkcywgZm9jdXMgZW5kcyBvbiBsYXN0IHByb2plY3RcclxuICAgICAgICBcclxuICAgICAgICBPYmplY3Qua2V5cyhwcm9qZWN0T2JqLnRvZG9zKS5mb3JFYWNoKHRvZG9JZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvZG9PYmogPSBwcm9qZWN0T2JqW1widG9kb3NcIl1bdG9kb0lkXTtcclxuICAgICAgICAgICAgY29uc3QgdG9kb1RpdGxlID0gdG9kb09iai50b2RvVGl0bGU7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBsZXRlZCA9IHRvZG9PYmouY29tcGxldGVkO1xyXG4gICAgICAgICAgICBMb2dpY0NvbnRyb2xsZXIuaGFuZGxlQ3JlYXRlVG9kb0NsaWNrKHVuZGVmaW5lZCwgdG9kb1RpdGxlLCB0b2RvSWQpO1xyXG4gICAgICAgICAgICBpZiAoY29tcGxldGVkKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dpY0NvbnRyb2xsZXIuaGFuZGxlVG9nZ2xlVG9kb0NsaWNrKHVuZGVmaW5lZCwgdG9kb0lkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG59IiwiaW1wb3J0IFVzZXIgZnJvbSBcIi4vVXNlclwiO1xyXG5pbXBvcnQgRGlzcGxheUNvbnRyb2xsZXIgZnJvbSBcIi4vRGlzcGxheUNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vUHJvamVjdFwiO1xyXG5pbXBvcnQgVG9kbyBmcm9tIFwiLi9Ub2RvXCI7XHJcbmltcG9ydCB7IHNhdmVEYXRhLCBsb2FkRGF0YSB9IGZyb20gXCIuL0xvY2FsU3RvcmFnZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpY0NvbnRyb2xsZXIge1xyXG4gICAgLy8gc3RhdGljIGxldCBjdXJyZW50VXNlcjtcclxuICAgIHN0YXRpYyBjdXJyZW50VXNlciA9IG5ldyBVc2VyKCk7XHJcbiAgICBzdGF0aWMgY3VycmVudFByb2plY3QgPSBcIlwiO1xyXG5cclxuICAgIHN0YXRpYyBpbml0TmV3U2Vzc2lvbigpIHtcclxuICAgICAgICAvLyBUT0RPOiBtYWtlIG5ldyB1c2VyLCBjaGVjayBpZiBicm93c2VyIGhhcyBsb2NhbCBzYXZlcywgaWYgbm90OlxyXG4gICAgICAgIC8vIGNyZWF0ZSBwcm9qZWN0IGFuZCB0b2RvcyBvYmplY3RzIHRvIHBvcHVsYXRlIGZvciBkZW1vXHJcbiAgICAgICAgLy8gYWRkIGluaXQgcGFnZSBsb2dpYyBpbnRvIGhlcmUgc28gaW5kZXguanMganVzdCBjYWxscyB0aGlzIG1ldGhvZFxyXG4gICAgICAgIC8vIFdSSVRFIEJFTE9XIE1FVEhPRFMgRklSU1QsIHRoZW4gY2FsbCB0aGVtIHNvIHlvdSBkb250IHJlcGVhdCBjb2RlXHJcbiAgICAgICAgY29uc3QgbG9hZGVkRnJvbVN0b3JhZ2UgPSBsb2FkRGF0YSgpOyAgLy8gcmV0dXJucyB0cnVlIGlmIGxvY2FsU3RvcmFnZSBoYXMgZGF0YVxyXG4gICAgICAgIGlmICghbG9hZGVkRnJvbVN0b3JhZ2UpIHtcclxuICAgICAgICAgICAgbGV0IGRlbW9Qcm9qZWN0SWQgPSB0aGlzLmhhbmRsZUNyZWF0ZVByb2plY3RDbGljayh1bmRlZmluZWQsIFwiTWVnYW1lblwiKTsgIC8vIGNyZWF0ZSBkZWZhdWx0IGRlbW8gcHJvamVjdCBvbiBpbml0XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlUHJvamVjdENsaWNrKHVuZGVmaW5lZCwgZGVtb1Byb2plY3RJZCk7ICAvLyBjaGFuZ2UgdG8gZGVmYXVsdCBjcmVhdGVkIHByb2plY3Qgb24gaW5pdFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNyZWF0ZUV2ZW50SGFuZGxlcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY3JlYXRlRXZlbnRIYW5kbGVycygpIHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1mb3JtXCIpO1xyXG4gICAgICAgIHByb2plY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5oYW5kbGVDcmVhdGVQcm9qZWN0Q2xpY2spO1xyXG5cclxuICAgICAgICBjb25zdCB0b2RvRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9kby1mb3JtXCIpO1xyXG4gICAgICAgIHRvZG9Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5oYW5kbGVDcmVhdGVUb2RvQ2xpY2spO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBoYW5kbGVDcmVhdGVQcm9qZWN0Q2xpY2sgPSAoZSwgbWFudWFsUHJvamVjdFRpdGxlPXVuZGVmaW5lZCwgbWFudWFsUHJvamVjdElEPXVuZGVmaW5lZCkgPT4ge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbiBiZSBjYWxsZWQgYXMgZXZlbnQgaGFuZGxlciBvciBtYW51YWxseSBmcm9tIGluaXQgZnVuY3Rpb25cclxuICAgICAgICAgKiBmb3IgaW5pdGlhbGlzYXRpb24gcHVycG9zZXNcclxuICAgICAgICAgKiBDYW4gc2V0IG1hbnVhbCBwcm9qZWN0IElEIHRvIGdldCBleGFjdCBJRCBmcm9tIGxvY2Fsc3RvcmFnZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlmIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHByb2plY3RUZXh0RmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy1wcm9qZWN0XCIpXHJcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gbWFudWFsUHJvamVjdFRpdGxlID8gbWFudWFsUHJvamVjdFRpdGxlIDogcHJvamVjdFRleHRGaWVsZC52YWx1ZTtcclxuICAgICAgICBwcm9qZWN0VGV4dEZpZWxkLnZhbHVlID0gXCJcIjtcclxuXHJcbiAgICAgICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3RUaXRsZSk7XHJcblxyXG4gICAgICAgIGlmIChtYW51YWxQcm9qZWN0SUQpIHtcclxuICAgICAgICAgICAgbmV3UHJvamVjdC5JRCA9IG1hbnVhbFByb2plY3RJRDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY3VycmVudFVzZXIuYWRkUHJvamVjdChuZXdQcm9qZWN0KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNyZWF0ZWQgbmV3IHByb2plY3Q6IFwiICsgcHJvamVjdFRpdGxlKTtcclxuXHJcbiAgICAgICAgRGlzcGxheUNvbnRyb2xsZXIuYWRkUHJvamVjdChwcm9qZWN0VGl0bGUsIG5ld1Byb2plY3QuSUQpO1xyXG5cclxuICAgICAgICBzYXZlRGF0YSh0aGlzLmN1cnJlbnRVc2VyKTtcclxuICAgICAgICByZXR1cm4gbmV3UHJvamVjdC5JRDsgIC8vIHRoaXMgcmV0dXJuIGlzIG9ubHkgdXNlZCBmb3IgaW5pdGlhbGlzaW5nIHRoZSBkZWZhdWx0IGRlbW8gcHJvamVjdFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBoYW5kbGVEZWxldGVQcm9qZWN0Q2xpY2sgPSAoZSkgPT4ge1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0UHJvamVjdElkID0gZS5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUuaWQ7XHJcbiAgICAgICAgY29uc29sZS5sb2codGFyZ2V0UHJvamVjdElkKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRVc2VyLmRlbGV0ZVByb2plY3QodGFyZ2V0UHJvamVjdElkKTtcclxuICAgICAgICBEaXNwbGF5Q29udHJvbGxlci5kZWxldGVQcm9qZWN0KHRhcmdldFByb2plY3RJZCk7XHJcbiAgICAgICAgc2F2ZURhdGEodGhpcy5jdXJyZW50VXNlcik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGhhbmRsZUNoYW5nZVByb2plY3RDbGljayA9IChlLCBwcm9qZWN0SWQ9dW5kZWZpbmVkKSA9PiB7XHJcbiAgICAgICAgbGV0IHByb2plY3RJRDtcclxuICAgICAgICBpZiAoZSkge1xyXG4gICAgICAgICAgICBwcm9qZWN0SUQgPSBlLnRhcmdldC5pZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwcm9qZWN0SUQgPSBwcm9qZWN0SWQ7ICAvLyBzZXQgcHJvamVjdElEIHRvIHRoZSBzdG9yZWQgZGVtb0lkIGlmIGV2ZW50IGhhbmRsZXIgaW52b2tlZCBhcnRpZmljdWFsbHkgZnJvbSBpbml0IGZ1bmN0aW9uXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VycmVudFByb2plY3QgPSBwcm9qZWN0SUQ7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRQcm9qZWN0ID0gdGhpcy5jdXJyZW50VXNlci5nZXRQcm9qZWN0KHByb2plY3RJRCk7XHJcbiAgICAgICAgRGlzcGxheUNvbnRyb2xsZXIucmVuZGVyUHJvamVjdChzZWxlY3RlZFByb2plY3QpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaGFuZGxlQ3JlYXRlVG9kb0NsaWNrID0gKGUsIG1hbnVhbFRvZG9UaXRsZT11bmRlZmluZWQsIG1hbnVhbFRvZG9JRD11bmRlZmluZWQpID0+IHtcclxuICAgICAgICBpZiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHRvZG9UZXh0RmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy10b2RvXCIpXHJcbiAgICAgICAgY29uc3QgdG9kb1RpdGxlID0gbWFudWFsVG9kb1RpdGxlID8gbWFudWFsVG9kb1RpdGxlIDogdG9kb1RleHRGaWVsZC52YWx1ZTtcclxuICAgICAgICB0b2RvVGV4dEZpZWxkLnZhbHVlID0gXCJcIjtcclxuXHJcbiAgICAgICAgaWYgKHRvZG9UaXRsZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1RvZG8gPSBuZXcgVG9kbyh0b2RvVGl0bGUpO1xyXG4gICAgICAgICAgICBpZiAobWFudWFsVG9kb0lEKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdUb2RvLklEID0gbWFudWFsVG9kb0lEO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFVzZXIuZ2V0UHJvamVjdCh0aGlzLmN1cnJlbnRQcm9qZWN0KS5hZGRUb2RvKG5ld1RvZG8pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnRVc2VyLmdldFByb2plY3QodGhpcy5jdXJyZW50UHJvamVjdCkudG9kb3MpO1xyXG4gICAgICAgICAgICBEaXNwbGF5Q29udHJvbGxlci5hZGRUb2RvKG5ld1RvZG8pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzYXZlRGF0YSh0aGlzLmN1cnJlbnRVc2VyKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaGFuZGxlRGVsZXRlVG9kb0NsaWNrID0gKGUpID0+IHtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldFRvZG9JZCA9IGUuY3VycmVudFRhcmdldC5wYXJlbnROb2RlLmlkO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRhcmdldFRvZG9JZCk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VXNlci5nZXRQcm9qZWN0KHRoaXMuY3VycmVudFByb2plY3QpLmRlbGV0ZVRvZG8odGFyZ2V0VG9kb0lkKTtcclxuICAgICAgICBEaXNwbGF5Q29udHJvbGxlci5kZWxldGVUb2RvKHRhcmdldFRvZG9JZCk7XHJcbiAgICAgICAgc2F2ZURhdGEodGhpcy5jdXJyZW50VXNlcik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGhhbmRsZVRvZ2dsZVRvZG9DbGljayA9IChlLCBtYW51YWxUb2RvSUQ9dW5kZWZpbmVkKSA9PiB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JhYnMgY2xpY2tlZCBUb2RvIElEIGFuZCB0b2dnbGVzIGNvbXBsZXRpb24gdGhlbiB0b2dnbGVzIGNvbXBsZXRlZCBjbGFzcyB0byBpdFxyXG4gICAgICAgICAqIExhdGVyIG1vdmUgaXQgdG8gdGhlIGJvdHRvbSBvZiB0b2RvIGxpc3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBjb25zdCB0b2RvSUQgPSBtYW51YWxUb2RvSUQgPyBtYW51YWxUb2RvSUQgOiBlLmN1cnJlbnRUYXJnZXQuaWQ7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFByb2plY3QgPSB0aGlzLmN1cnJlbnRVc2VyLmdldFByb2plY3QodGhpcy5jdXJyZW50UHJvamVjdCk7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRUb2RvID0gY3VycmVudFByb2plY3QuZ2V0VG9kbyh0b2RvSUQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHNlbGVjdGVkVG9kby50b2dnbGVDb21wbGV0aW9uKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZCA9IHNlbGVjdGVkVG9kby5jb21wbGV0ZWQ7XHJcbiAgICAgICAgRGlzcGxheUNvbnRyb2xsZXIudG9nZ2xlVG9kbyh0b2RvSUQsIGNvbXBsZXRlZClcclxuXHJcbiAgICAgICAgc2F2ZURhdGEodGhpcy5jdXJyZW50VXNlcik7XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0IGluaXRQYWdlIGZyb20gXCIuL2luaXRQYWdlXCI7XHJcbmltcG9ydCBMb2dpY0NvbnRyb2xsZXIgZnJvbSBcIi4vTG9naWNDb250cm9sbGVyXCI7XHJcblxyXG5pbml0UGFnZSgpO1xyXG5Mb2dpY0NvbnRyb2xsZXIuaW5pdE5ld1Nlc3Npb24oKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=