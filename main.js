const input = document.querySelector("#input");
const list = document.querySelector("#list");
const addBtn = document.querySelector("#addBtn");
const removeCompletedBtn = document.querySelector("#removeCompletedBtn");
const taskCountDisplay = document.querySelector("#taskCount");

let tasks = [];
let filter = "all";

const savedTasks = localStorage.getItem("myTasks");
if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    taskCountDisplay.textContent = tasks.length;
}

function getFilteredTasks() {
    if (filter === "active") {
        return tasks.filter(task => !task.completed);
    } else if (filter === "completed") {
        return tasks.filter(task => task.completed);
    }
    return tasks; // "all"
}

function render() {
    list.innerHTML = "";

    const filteredTasks = getFilteredTasks();
    filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    
    if (task.completed) {
        li.style.textDecoration = "line-through";
    }
    
    li.style.cursor = "pointer";
    li.addEventListener("click", () => {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem("myTasks", JSON.stringify(tasks));
        render();
    });
    
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";

    doneBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        
        if (taskCount > 0) {
            taskCount--;
        } else {
            taskCount = 0;
        }
        
        taskCountDisplay.textContent = tasks.length;
        render();
    });

    li.appendChild(doneBtn);
    list.appendChild(li);
    });
}

function addTask() {
        const value = input.value;

    if (value === "") return;

    tasks.push({ text: value, completed: false });
    input.value = "";
    taskCount++;
    taskCountDisplay.textContent = taskCount;
    localStorage.setItem("myTasks", JSON.stringify(tasks));
    render();
}

addBtn.addEventListener("click", () => {
    addTask();
});

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

removeCompletedBtn.addEventListener("click", () => {
    tasks = tasks.filter(task => !task.completed);
    taskCountDisplay.textContent = tasks.length;
    localStorage.setItem("myTasks", JSON.stringify(tasks));
    render();
});
document.querySelector("#allBtn").addEventListener("click", () => {
    filter = "all";
    render();
});
document.querySelector("#activeBtn").addEventListener("click", () => {
    filter = "active";
    render();
});
document.querySelector("#completedBtn").addEventListener("click", () => {
    filter = "completed";
    render();
});

render();