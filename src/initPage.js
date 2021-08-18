
export default function initPage() {
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
