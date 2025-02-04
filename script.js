document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Cargar tareas guardadas
    loadTasks();

    // Agregar tarea
    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask();
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const li = document.createElement("li");
        li.innerHTML = `<span>${taskText}</span> 
                        <button class="delete">🗑️</button>`;
        
        // Marcar tarea completada
        li.addEventListener("click", () => {
            li.classList.toggle("completed");
            saveTasks();
        });

        // Eliminar tarea
        li.querySelector(".delete").addEventListener("click", (e) => {
            e.stopPropagation();
            li.remove();
            saveTasks();
        });

        taskList.appendChild(li);
        taskInput.value = "";
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#taskList li").forEach((li) => {
            tasks.push({
                text: li.innerText.replace("🗑️", "").trim(),
                completed: li.classList.contains("completed"),
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((task) => {
            const li = document.createElement("li");
            li.innerHTML = `<span>${task.text}</span> 
                            <button class="delete">🗑️</button>`;
            if (task.completed) li.classList.add("completed");

            li.addEventListener("click", () => {
                li.classList.toggle("completed");
                saveTasks();
            });

            li.querySelector(".delete").addEventListener("click", (e) => {
                e.stopPropagation();
                li.remove();
                saveTasks();
            });

            taskList.appendChild(li);
        });
    }
});
