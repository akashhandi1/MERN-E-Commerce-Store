// Array to store tasks
let tasks = [];

// DOM elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const tasksContainer = document.getElementById('tasksContainer');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    renderTasks();
    
    // Add event listeners
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

// Add new task
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task name');
        return;
    }
    
    // Create new task object
    const newTask = {
        id: Date.now(),
        text: taskText,
        createdAt: new Date().toLocaleString()
    };
    
    // Add to tasks array
    tasks.push(newTask);
    
    // Clear input
    taskInput.value = '';
    
    // Save and render
    saveTasks();
    renderTasks();
}

// Delete task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    renderTasks();
}

// Render all tasks
function renderTasks() {
    // Clear container
    tasksContainer.innerHTML = '';
    
    if (tasks.length === 0) {
        tasksContainer.innerHTML = '<div class="empty-state">No tasks yet. Add your first task above!</div>';
        return;
    }
    
    // Create task elements
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-item';
        
        taskElement.innerHTML = `
            <span class="task-name">${escapeHtml(task.text)}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;
        
        tasksContainer.appendChild(taskElement);
    });
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Clear all tasks (optional function)
function clearAllTasks() {
    if (confirm('Are you sure you want to delete all tasks?')) {
        tasks = [];
        saveTasks();
        renderTasks();
    }
}
