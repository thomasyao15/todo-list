
export default function initPage() {
    const mainDiv = document.querySelector(".main")
    mainDiv.innerHTML = `
        <div class="nav-bar">
            <header>Thomash's Todo List</header>
        </div>
        <div class="body-content">
            <div class="side-pane">
                <h2>My Projects</h2>
                <div class="projects">
                    <ul>
                        <li>Pogs</li>
                        <li>Megamen</li>
                    </ul>
                </div>
                <form action="create-project">
                    <input type="text" name="new-project" id="new-project" placeholder="Enter a new project name">
                    <button type="submit">Create New Project</button>
                </form>
            </div>
            <div class="todo-content">
                <h1>Pogs Project</h1>
                <div class="todo-list">
                    <div class="todo">
                        <!-- <img src="" alt="" srcset=""> -->
                        <p>Need to finish this project</p>
                    </div>
                    <div class="todo">
                        <!-- <img src="" alt="" srcset=""> -->
                        <p>Finish TOP</p>
                    </div>
                </div>
                <form action="create-todo">
                    <input type="text" name="new-todo" id="new-todo" placeholder="Enter a new task">
                    <button type="submit">Create New Todo</button>
                </form>
            </div>
        </div>
    `    
}
