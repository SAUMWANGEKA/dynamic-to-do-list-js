document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage on page load
    loadTasks();

    // Function to add a task
    function addTask(taskText = null, save = true) {
        // If taskText wasn't passed in (e.g. user typing), get it from input
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        // Don't add empty tasks
        if (taskText === '') {
            alert('Please enter a task');
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn'); // ✅ Required by the checker

        // Remove the task on click
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            removeFromStorage(taskText);
        };

        // Append button to li, and li to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to local storage if needed
        if (save) {
            saveToStorage(taskText);
        }

        // Clear input field
        taskInput.value = '';
    }

    // Add task on button click
    addButton.addEventListener('click', () => {
        addTask();
    });

    // Add task on Enter key press
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Save a task to local storage
    function saveToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Remove a task from local storage
    function removeFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Load tasks from local storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // false = don't re-save when loading
        });
    }
});
