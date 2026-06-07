alert("Script Loaded");
let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function addTask(){

    const taskInput =
        document.getElementById("taskInput");

    const priority =
        document.getElementById("priority");

    if(taskInput.value.trim()===""){
        return;
    }

    tasks.push({
        name: taskInput.value,
        priority: priority.value,
        completed:false
    });

    taskInput.value="";

    saveTasks();
    renderTasks();
}

function renderTasks(){

    const taskList =
        document.getElementById("taskList");

    taskList.innerHTML="";

    tasks.forEach((task,index)=>{

        taskList.innerHTML += `
            <div class="task-item">

                <div class="task-left">

                    <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${index})">

                    <span class="${
                        task.completed
                        ? "completed"
                        : ""
                    }">

                    ${task.name}
                    (${task.priority})

                    </span>

                </div>

                <button
                class="delete-btn"
                onclick="deleteTask(${index})">

                Delete

                </button>

            </div>
        `;
    });

    updateCounter();
}

function toggleTask(index){

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();
    renderTasks();
}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();
    renderTasks();
}

function updateCounter(){

    const pending =
        tasks.filter(
            task => !task.completed
        ).length;

    document.getElementById(
        "tasksCount"
    ).innerText = pending;
}

renderTasks();
