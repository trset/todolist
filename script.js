if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
  
function getTodosLocalStorage(){
    const todosLocalStr = localStorage.getItem("todolist");
    if(todosLocalStr != null && todosLocalStr != "") {
        return JSON.parse(todosLocalStr)
    }
    return []
}

function setTodosLocalStorage(){
    localStorage.setItem("todolist", JSON.stringify(todos));
}

const todos = getTodosLocalStorage()
renderTodoList()

function addTodo(title) {
    const todo = {
        title: title,
        createdAt: new Date(),
        done: false
    }
    todos.push(todo)
}

function toggleTodo(index) {
    todos[index]["done"] = !todos[index]["done"]
}

function deleteTodo(index) {
    todos.splice(index, 1)
}

function editTodo(index, newTitle){
    todos[index]["title"] = newTitle
}

function displayTodos() {
    console.table(todos)
}

// AJAX functions
function handleAddTodo() {
    const todoInputElem = document.querySelector("#addTodo")
    const title = todoInputElem.value
    if(title == "") return 
    addTodo(title)
    todoInputElem.value = ""
    setTodosLocalStorage()
    renderTodoList()
}

function handleToggleTodo(index) {
    toggleTodo(index)
    setTodosLocalStorage()
    renderTodoList()
}

function handleDeleteTodo(index) {
    deleteTodo(index)
    setTodosLocalStorage()
    renderTodoList()
}

function renderTodoList() {
    const todolistElem = document.querySelector("#todolist")
    todolistElem.innerHTML = "";
    for (let index = 0; index < todos.length; index++) {
        const todo = todos[index];
        const data = `
            <div class="todo">
                <p onclick="handleToggleTodo(${index})" class="${todo.done ? "done" : ''}" id="title_${index}" title="${todo.createdAt.toLocaleString()}">${todo["title"]}</p>
                <button onclick="handleDeleteTodo(${index})"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `
        todolistElem.innerHTML += data;
    }
}

