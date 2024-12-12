document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const addTaskBtn = document.querySelector('h1 span');

    function sendRequest(url, method, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                callback(JSON.parse(xhr.responseText));
            }
        };
        xhr.send(JSON.stringify(data));
    }

    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            li.remove();

            // AJAX call to delete task from the database
            sendRequest('php/delete_task.php', 'POST', { task: taskText }, function (response) {
                console.log(response);
            });
        };

        li.appendChild(deleteButton);
        return li;
    }

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const taskText = taskInput.value.trim();
        if (taskText === '') {
            return;
        }

        const taskElement = createTaskElement(taskText);
        taskList.appendChild(taskElement);

        taskInput.value = '';

        // AJAX call to add task to the database
        sendRequest('php/add_task.php', 'POST', { task: taskText }, function (response) {
            console.log(response);
        });
    });

    addTaskBtn.addEventListener('click', function () {
        taskForm.dispatchEvent(new Event('submit'));
    });

    // Load tasks from the database
    sendRequest('php/load_tasks.php', 'GET', null, function (tasks) {
        tasks.forEach(task => {
            const taskElement = createTaskElement(task);
            taskList.appendChild(taskElement);
        });
    });
});
