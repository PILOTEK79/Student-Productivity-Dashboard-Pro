// ======================
// TASK MANAGER
// ======================

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

    taskList.innerHTML = "";

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

    updateTaskCounter();
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

function updateTaskCounter(){

    const pending =
        tasks.filter(
            task => !task.completed
        ).length;

    document.getElementById(
        "tasksCount"
    ).innerText = pending;
}

// ======================
// EXAM TRACKER
// ======================

let exams =
JSON.parse(localStorage.getItem("exams")) || [];

function saveExams(){

    localStorage.setItem(
        "exams",
        JSON.stringify(exams)
    );
}

function addExam(){

    const subject =
        document.getElementById("examSubject");

    const date =
        document.getElementById("examDate");

    const priority =
        document.getElementById("examPriority");

    if(
        subject.value.trim()==="" ||
        date.value === ""
    ){
        return;
    }

    exams.push({
        subject: subject.value,
        date: date.value,
        priority: priority.value
    });

    subject.value = "";
    date.value = "";

    saveExams();

    renderExams();
}

function renderExams(){

    const examList =
        document.getElementById("examList");

    examList.innerHTML = "";

    exams.forEach((exam,index)=>{

        const today = new Date();

        const examDate =
            new Date(exam.date);

        const diffTime =
            examDate - today;

        const daysLeft =
            Math.ceil(
                diffTime /
                (1000*60*60*24)
            );

        examList.innerHTML += `

        <div class="exam-card">

            <h3>📚 ${exam.subject}</h3>

            <p>📅 ${exam.date}</p>

            <p>${exam.priority} Priority</p>

            <p>${daysLeft} Days Left</p>

            ${
                daysLeft <= 7
                ? '<p class="warning">⚠️ Exam Soon</p>'
                : ''
            }

            <button
            class="delete-btn"
            onclick="deleteExam(${index})">

            Delete

            </button>

        </div>

        `;
    });

    updateExamCounter();
}

function deleteExam(index){

    exams.splice(index,1);

    saveExams();

    renderExams();
}

function updateExamCounter(){

    document.getElementById(
        "examCount"
    ).innerText = exams.length;
}

// ======================
// INITIAL LOAD
// ======================

renderTasks();
renderExams();
