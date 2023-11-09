const form = document.forms['form'];
const todoAddEl = form['input-text'];
const addBtn = form['addBtn'];
const inputWrap = document.getElementsByClassName('custom-input')[0];
const todoList = document.getElementsByClassName('list')[0];
window.addEventListener('beforeunload', (event) => {
  event.preventDefault();
  event.returnValue = '';
});
addBtn.addEventListener('click', function(e){
        e.preventDefault();
  const inputContent = todoAddEl.value
  const listItem = document.createElement('li');
  listItem.textContent = inputContent;
  if(listItem.textContent==="") {
    const error = document.createElement('span')
    error.classList.add('error');
    error.textContent = 'Please enter todo task!';
    inputWrap.prepend(error.textContent);
    error.value = "";
    return;
  }
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  const time = ` - ${hours} : ${minutes}`;
  listItem.classList.add('listItem');
  const deleteBtn = document.createElement('span');
  deleteBtn.classList.add('addDeleteIcon');
  listItem.append(time);
  listItem.append(deleteBtn);
  todoList.append(listItem);
  //todoAddEl.value = "";

  todoList.addEventListener('click', function(e) {
    if(e.target.classList.contains('addDeleteIcon')){
      const element = e.target.parentElement;
      todoList.removeChild(element);
    }
  });
});








