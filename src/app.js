import './app.css';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './tasks.js';
import './pagination.js';
import './tooltip/tooltip';

const inputTitle = document.querySelector('#inputTitle')
const inputDescription = document.querySelector('#inputDescription')
const inputDate = document.querySelector('#inputDate')
const addTaskButton = document.querySelector('#btnTask');
const clearFormButton = document.querySelector('#btnClear');
const formTitle = document.querySelector('#formTitle');
const checkboxTaskStatus = document.querySelector('#checkboxImportant');


const setStorageValue = (storage, key, value) => {
    const prepareValue = JSON.stringify(value);
    storage.setItem(key, prepareValue);
};

const getStorageValue = (storage, key) => {
    const value = storage.getItem(key) || 'null';
    const prepareValue = JSON.parse(value);
    return prepareValue;
};

const tasks = getStorageValue(localStorage, 'gaiger-tasks');

const store = {
    tasks: tasks || [],
    editTaskIndex: null,
    formStatus: 'create',
};

const saveStoreTasks = () => {
    setStorageValue (localStorage, 'gaiger-tasks', store.tasks);
}

const clearForm = () => {
    inputTitle.value = '';
    inputDescription.value = '';
    inputDate.value = '';
    checkboxTaskStatus.checked = false;
    formTitle.textContent = 'Добавить событие';
    addTaskButton.textContent = 'Добавить';
    addTaskButton.classList.remove('btn-success');
    clearFormButton.textContent = 'Очистить';
    store.formStatus = 'create';
    store.editTaskIndex = null;
}

const createElement = (tagName, parentNode, className = '') => {
    const element = document.createElement(tagName);
    element.className = className;
    parentNode.appendChild(element)
    return element
}

const deleteElement = (index) => {
    //удалил по индексу из store 
    store.tasks.splice(index, 1);
}

const editElement = (task, index) => {
    store.formStatus = 'edit';
    store.editTaskIndex = index;
    inputTitle.value = task.title;
    inputDescription.value = task.description;
    inputDate.value = task.date;
    checkboxTaskStatus.checked = task.taskStatus;
    addTaskButton.textContent = 'Сохранить';
    clearFormButton.textContent = 'Отменить';
    formTitle.textContent = 'Редактировать событие';
    addTaskButton.classList.add('btn-success')
}

const renderCard = function (task, parentNode, index, renderTasks) {
    const card = createElement('div', parentNode, 'card');
    const cardBody = createElement('div', card, 'card-body d-flex justify-content-between p-3');
    const title = createElement('p', cardBody, 'm-0 font-weight-bold');
    title.textContent = task.title;
    const controls = createElement('span', cardBody);

    const starClassName = task.taskStatus ? 'fas fa-star' : 'far fa-star';
    const taskStatusStar = createElement('i', controls, starClassName);
    taskStatusStar.addEventListener('click', () => {
        store.tasks[index].taskStatus = !task.taskStatus;
        renderTasks();
    });  

    const btnEdit = createElement('i', controls, 'fas fa-pen');
    //при клике на карандаш, меняет статус на редактирование
    btnEdit.addEventListener('click', () => {
        editElement(task, index);
    });
    const btnDelete = createElement('i', controls, 'far fa-trash-alt');
    //при клике на мусорку удаляет задачу
    btnDelete.addEventListener('click', () => {
        deleteElement(index)
        renderTasks()
    })
    const description = createElement('p', card, 'p-3 m-0');
    description.textContent = task.description;
};


const renderTasks = function renderTasks() {
    const container = document.querySelector('#tasksContainer');
    container.innerHTML = '';
    store.tasks.forEach((task, index) => {
        renderCard(task, container, index, renderTasks);
    });
    saveStoreTasks();
}

renderTasks();

const addCard = (task) => {
    store.tasks.push(task)
}

const editCard = (task) => {
    const cardIndex = store.editTaskIndex;
    store.tasks.splice(cardIndex, 1, task);
}

const submit = () => {
    const task = {
        title: inputTitle.value,
        description: inputDescription.value,
        date: inputDate.value,
        taskStatus: checkboxTaskStatus.checked,
    };

    if (store.formStatus === 'create') {
        addCard(task);
    } else if (store.formStatus === 'edit') {
        editCard(task);
    }
    clearForm();
    renderTasks();
}

addTaskButton.addEventListener('click', submit);

clearFormButton.addEventListener('click', clearForm);
