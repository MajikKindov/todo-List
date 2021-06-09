const input = document.querySelector('.input')
const addBtn = document.querySelector('.add')
const list = document.querySelector('.list')

let todoList;
!localStorage.todoList ?  todoList = [] : todoList = JSON.parse(localStorage.getItem('todoList'));

let todoItemsElems = []

function Task(description) {
    this.description = description
    this.checked = false
}

const createElement = (task, index) => {
    return `
    <li class="li ${task.checked ? 'li_done' : ''}">
    <input onclick="checkTodo(${index})" type="checkbox" ${task.checked ? 'checked' : ''} class="done"> <span>${task.description}</span>
    <button onclick="deleteTodo(${index})" class="delete">delete</button>
    </li>
    `

}

const createDeleteElement = () => {
    list.innerHTML = ''
    if (todoList.length >0) {
        todoList.forEach((item, index) => {
            list.innerHTML += createElement(item, index)
        })
        todoItemsElems = document.querySelectorAll('.li')
      }
    }

    createDeleteElement()

const saveTodoList = () => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
}

const checkTodo = (index) => {
    todoList[index].checked = !todoList[index].checked
    if (todoList[index].completed) {
        todoItemsElems[index].classList.add('li_done')
    } else {
        todoItemsElems[index].classList.remove('li_done')
    }
    saveTodoList()
    createDeleteElement()

}

const deleteTodo = (index) => {
    todoList.splice(index, 1)
    saveTodoList()
    createDeleteElement()
}

addBtn.addEventListener('click', ()=> {
    if (input.value == '') return
    todoList.push(new Task(input.value))
    saveTodoList();
    createDeleteElement()
    input.value = ''
})

