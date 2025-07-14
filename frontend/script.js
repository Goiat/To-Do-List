function newTask() {
    const input = document.getElementById("taskInput");
    input.style.border = '';

    if (!input.value) {
        alert("Digite uma tarefa!");
        input.style.border = '1px solid red';
        return;
    }

    fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: input.value })
    })
    .then(response => {
        if (!response.ok) throw new Error("Erro ao salvar tarefa");
        input.value = "";
        showValues();
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Erro ao adicionar tarefa.");
    });
}

function showValues() {
    fetch("http://localhost:8080/tasks")
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById("to-do-list");
            list.innerHTML = "";

            data.forEach(task => {
                list.innerHTML += `
                    <li>${task.name}
                        <button id='buttonok' onclick='removeItem(${task.id})'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                            </svg>
                        </button>
                    </li>
                `;
            });
        });
}

function removeItem(id) {
    fetch(`http://localhost:8080/tasks/${id}`, {
        method: "DELETE"
    })
    .then(() => showValues());
}

showValues();