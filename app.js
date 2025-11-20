const API_URL = 'http://localhost:3000/api/tasks';
const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');

async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al obtener las tareas');
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

function renderTasks(tasks) {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.dataset.id = task.id;
        li.innerHTML = `
            <div class="task-content">
                <div>
                    <input type="checkbox" class="task-checkbox" 
                           ${task.completed ? 'checked' : ''}>
                    <span class="task-text">
                        <strong>${task.title}</strong>: ${task.description}
                    </span>
                </div>
                <div class="task-actions">
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Eliminar</button>
                </div>
            </div>
        `;
        taskList.appendChild(li);
    });
}

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    if (!title) return alert('El título es obligatorio');
    if (!description) return alert('La descripción es obligatoria');
    const editingId = taskForm.dataset.editingId;
    try {
        let response;
        if (editingId) {
            response = await fetch(`${API_URL}/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description })
            });
        } else {
            response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description, completed: false })
            });
        }
        if (!response.ok) throw new Error(`Error al ${editingId ? 'actualizar' : 'crear'} la tarea`);
        taskForm.reset();
        delete taskForm.dataset.editingId;
        taskForm.querySelector('button[type="submit"]').textContent = '+ Agregar';
        fetchTasks();
    } catch (error) {
        console.error("Submit Error:", error);
    }
});

taskList.addEventListener('click', async (e) => {
    const item = e.target;
    const taskItem = item.closest('.task-item');
    if (!taskItem) return;
    const taskId = taskItem.dataset.id;
    if (item.classList.contains('delete-btn')) {
        try {
            const response = await fetch(`${API_URL}/${taskId}`, {
                method: 'DELETE'
            });

            if (response.status === 204) {
                fetchTasks();
            } else {
                throw new Error('Error al eliminar la tarea');
            }
        } catch (error) {
            console.error("DELETE Error:", error);
        }
    }
    if (item.classList.contains('edit-btn')) {
        loadTaskForEdit(taskId);
    }
});

taskList.addEventListener('change', async (e) => {
    const item = e.target;
    if (item.classList.contains('task-checkbox')) {
        const taskItem = item.closest('.task-item');
        const taskId = taskItem.dataset.id;
        const newCompletedStatus = item.checked;
        try {
            const response = await fetch(`${API_URL}/${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: newCompletedStatus })
            });
            if (response.ok) {
                taskItem.classList.toggle('completed', newCompletedStatus);
            } else {
                throw new Error('Error al actualizar la tarea');
            }
        } catch (error) {
            console.error("PUT Error:", error);
            item.checked = !newCompletedStatus;
        }
    }
});

async function loadTaskForEdit(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Error al obtener la tarea');
        const task = await response.json();
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-description').value = task.description;
        taskForm.dataset.editingId = task.id;
        taskForm.querySelector('button[type="submit"]').textContent = 'Actualizar';
    } catch (error) {
        console.error("Load Task Error:", error);
    }
}

fetchTasks();