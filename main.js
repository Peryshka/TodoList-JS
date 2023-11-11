const form = document.forms['form'];
const input = form['input'];
const addlist =  form['addBtn'];
const todoList = document.querySelector('.list');
const clearAll = document.getElementsByClassName('clear-all')[0];
let editElem;
let editFlag;
let taskArr = [];
let id = Date.now();
//Event Listeners
form.addEventListener('submit', addListItem);
clearAll.addEventListener('click', clearAllList)
window.addEventListener('DOMContentLoaded', function(e) {
 let getListFromStorage = localStorage.getItem('todolist');
  taskArr = getListFromStorage ? JSON.parse(getListFromStorage) : [];
  taskArr.forEach(item => {
    createItem(item.listValue, item.createdTime);
  });
});

//Functions
//function for default settings
function defaultSettings() {
  input.value = "";
  editFlag = false;
  addlist.textContent = 'Add new task';
}

//Add function
function addListItem(e) {
  e.preventDefault();
  const listValue = input.value.trim();
  const createdTime = currentTime();
  if (listValue && !editFlag) {
    createItem(listValue, createdTime)
    defaultSettings()
  } else if (listValue && editFlag) {
    editElem.textContent = listValue;
    defaultSettings();
  } else if (!listValue) {
    alert('Please enter task for TODO list!');
  }
  const currentTaskItem = {
    id: id,
    listValue : listValue,
    createdTime : createdTime
  }
  taskArr.push(currentTaskItem);
  localStorage.setItem('todolist' , JSON.stringify(taskArr));
}

//function for getting current time
function currentTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes}`;
}

//function to create Item
function createItem(listValue, createdTime) {
  const listItem = document.createElement('li');
  listItem.classList.add('list-item');
  listItem.innerHTML = `
    <span>
     <span>${listValue}</span>
     - ${createdTime}</span>
          <div class="btn-container">
            <button class="edit-btn">
              Edit
            </button>
            <label class="label">
                        <input type="checkbox" class="done-element">
                        <i class="checkmark"></i>
                    </label>
            <i class="delete-icon">
            </i>
          </div>
  `;
  todoList.append(listItem)
  const deleteItem = listItem.querySelector('.delete-icon');
  deleteItem.addEventListener('click' , removeElement);
  const editItem = listItem.querySelector('.edit-btn');
  editItem.addEventListener('click', editElement);
  const doneElement = listItem.querySelector('.done-element');
  doneElement.addEventListener('change', chooseDoneElements);
  doneElement.type = 'checkbox';
}

//function to delete Item
function removeElement(e,id) {
  const element = e.currentTarget.parentElement.parentElement;
  // const updatedTodolist = taskArr.filter(item => item.id !== id);
  // taskArr(todoList, updatedTodolist);
  // localStorage.setItem('todolist', JSON.stringify(todoList));
  element.remove();
}

/*
const removeTodoFromStorage = (id) =>
  localStorage.setItem(
    'todoList',
    JSON.stringify(
      JSON
        .parse(localStorage.getItem('todoList') ?? '[]')
        .filter((item) => item.id !== id),
    )
  );
 */

//function to edit element
function editElement(e) {
  let element = e.currentTarget.parentElement.previousElementSibling.querySelector('span');
  editElem = element;
  input.value = editElem.textContent;
  addlist.textContent = 'Edit';
  editFlag = true;
}

//function for done Elements
function chooseDoneElements(e) {
  const checkbox = e.target;
  const elemContent = e.target.parentElement.parentElement.previousElementSibling;
  if(checkbox.checked) {
    elemContent.style.textDecoration='line-through';
  } else {
    elemContent.style.textDecoration='none';
  }
};

//function to clear all items
function clearAllList(e) {
  const elements = document.querySelectorAll('.list-item');
  elements.forEach(item => {
    item.remove();
  })
};







