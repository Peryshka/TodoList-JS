const form = document.forms['form'];
const input = form['input'];
const addlist =  form['addBtn'];
const formWrap = document.getElementsByClassName('custom-input')[0];
const todoList = document.querySelector('.list');
const clearAll = document.getElementsByClassName('clear-all')[0];
let editElem;
let editFlag;
//Event Listeners
form.addEventListener('submit', addListItem);
clearAll.addEventListener('click', clearAllList);

//Functions
//Add function
function addListItem(e) {
  e.preventDefault();
  const listValue = input.value.trim();
  const createdTime = currentTime();
  if(listValue && !editFlag){
    createItem(listValue, createdTime)
     defaultSettings()
  } else if(listValue && editFlag) {
    editElem.textContent = listValue;
    defaultSettings();
  }else if(!listValue){
    let error = document.createElement('span');
    error.textContent='Please enter task for TODO List!';
    formWrap.prepend(error.textContent);
  }
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
            <i class="delete-icon">
            </i>
          </div>
  `;
  todoList.append(listItem)
  const deleteItem = listItem.querySelector('.delete-icon');
  deleteItem.addEventListener('click' , removeElement);
  const editItem = listItem.querySelector('.edit-btn');
  editItem.addEventListener('click', editElement);
}

//function to delete Item
function removeElement(e) {
  const element = e.currentTarget.parentElement.parentElement;
  element.remove();
}

//function to clear all items
function clearAllList(e) {
  const elements = document.querySelectorAll('.list-item');
  elements.forEach(item => {
    item.remove();
  })
};

//function to edit element
function editElement(e) {
  let element = e.currentTarget.parentElement.previousElementSibling.querySelector('span');
  editElem = element;
  input.value = editElem.textContent;
  addlist.textContent = 'Edit';
  editFlag = true;
}

//function for default settings
function defaultSettings() {
  input.value = "";
  editFlag = false;
  addList.textContent = 'Add new task';
}





