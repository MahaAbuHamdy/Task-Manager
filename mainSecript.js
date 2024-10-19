// Array to store tasks
let tasks = [];  

// Task ID counter
let taskId = 1;

// Load tasks from local storage
function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);  
    taskId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
  }
}

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));  // Store tasks as a JSON string
}

// Display the task manager menu
function showMenu() {
  const menu = `
  Task Manager Menu:
  1. Add Task
  2. View Tasks
  3. Toggle Task Completion
  4. Edit Task
  5. Delete Task
  6. Search Task
  7. Exit
  `;
  console.log(menu);
  handleMenuSelection(prompt('\nChoose an option:'));
}

// Handle menu selection
function handleMenuSelection(option) {
  switch (option) {
    case '1':
      addTask();
      break;
    case '2':
      viewTasks();
      break;
    case '3':
      toggleTaskCompletion();
      break;
    case '4':
      editTask();
      break;
    case '5':
      deleteTask();
      break;
    case '6':
      searchTask();
      break;
    case '7':
      exitTaskManager();
      break;
    default:
      console.log('Invalid option. Please try again.');
      showMenu();
      break;
  }
}

// Add a new task
function addTask() {
  const description = prompt('Enter task description:'); 
  if (description) {
    tasks.push({ id: taskId++, description, completed: false });
    saveTasks();
    console.log('Task added successfully.');
  }
  showMenu();
}

// View all tasks
function viewTasks() {
  if (tasks.length === 0) {
    console.log('No tasks available.');
  } else {
    console.log(formatTaskList());
  }
  showMenu();
}

// Format the task list for display
function formatTaskList() {
  return tasks.map(task => `${task.id}. ${task.description} [${task.completed ? 'Completed' : 'Not Completed'}]`).join('\n');
}

// Toggle task completion status
function toggleTaskCompletion() {
  const task = findTaskById(prompt('Enter task ID to toggle completion:'));
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    console.log(`Task "${task.description}" marked as ${task.completed ? 'completed' : 'not completed'}.`);
  } else {
    console.log('Task not found.');
  }
  showMenu();
}

// Edit task description by ID
function editTask() {
  const task = findTaskById(prompt('Enter task ID to edit:'));
  if (task) {
    const newDescription = prompt('Enter new task description:'); 
    if (newDescription) {
      task.description = newDescription;
      saveTasks();
      console.log('Task updated successfully.');
    }
  } else {
    console.log('Task not found.');
  }
  showMenu();
}

// Delete a task by ID
function deleteTask() {
  const taskIndex = tasks.findIndex(task => task.id == prompt('Enter task ID to delete:'));
  if (taskIndex !== -1) {
    const removedTask = tasks.splice(taskIndex, 1);
    saveTasks();
    console.log(`Task "${removedTask[0].description}" deleted successfully.`);
  } else {
    console.log('Task not found.');
  }
  showMenu();
}

// Search for a task by keyword
function searchTask() {
  const searchTerm = prompt('Enter a keyword to search for:');
  const matchingTasks = tasks.filter(task => task.description.toLowerCase().includes(searchTerm.toLowerCase()));

  if (matchingTasks.length > 0) {
    console.log(matchingTasks.map(task => `${task.id}. ${task.description} [${task.completed ? 'Completed' : 'Not Completed'}]`).join('\n'));
  } else {
    console.log('No tasks found matching your search.');
  }
  showMenu();
}

// Exit the task manager
function exitTaskManager() {
  console.log('Exiting Task Manager...');
}

// Find a task by its ID
function findTaskById(id) {
  return tasks.find(task => task.id == id);
}

// Load tasks and show the menu
loadTasks();
showMenu();
