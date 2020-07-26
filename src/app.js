import './app.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const inputTitle = document.querySelector('#inputTitle')
const inputDescription = document.querySelector('#inputDescription')
const inputDate = document.querySelector('#inputDate')


const store = {
    tasks: [],
    editTaskIndex: null,
    formStatus: 'create',
};

store.tasks.push({
    title: 'Первая задача',
    description: 'Описание',
    date: '12.07.2020',
    important: true,
})

store.tasks.push({
    title: 'Вторая задача',
    description: 'Описание',
    date: '15.07.2020',
    important: true,
})

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

const renderCard = function (task, parentNode, index, renderTasks) {
    const card = createElement('div', parentNode, 'card');
    const cardBody = createElement('div', card, 'card-body d-flex justify-content-between p-3');
    const title = createElement('p', cardBody, 'm-0 font-weight-bold');
    title.textContent = task.title;
    const controls = createElement('span', cardBody);
    const btnImportant = createElement('i', controls, 'far fa-star');
    //при клике на звезду, окрашивается в черный
    btnImportant.addEventListener('click', () => {
        btnImportant.remove('i', controls, 'far fa-star');
        controls.prepend(createElement('i', controls, 'fas fa-star'))
    })
    const btnEdit = createElement('i', controls, 'fas fa-pen');
    //при клике на карандаш, меняет статус на редактирование
    btnEdit.addEventListener('click', () => {
        clearForm();
        const formTitle = document.getElementById("formTitle");
        formTitle.textContent = 'Редактировать событие';
        formTitle.addEventListener('click', function () {
            formTitle.textContent = 'Добавить событие';
        });
        
        addTaskButton.classList.add('btn-success')
        addTaskButton.textContent = 'Изменить';

        clearFormButton.textContent = 'Отменить';

        store.formStatus.splice(0, 1, 'edit')
    })
    const btnDelete = createElement('i', controls, 'far fa-trash-alt');
    //при клике на мусорку удаляет задачу
    btnDelete.addEventListener('click', () => {
        deleteElement(index)
        renderTasks()
    })
    const description = createElement('p', card, 'p-3 m-0');
    description.textContent = task.description;
}

const renderTasks = function renderTasks() {
    const container = document.querySelector('#tasksContainer');
    container.innerHTML = '';
    store.tasks.forEach((currentValue, index, array) => {
    // currentValue.push(index);
    })
    store.tasks.forEach((task, index) => {
        renderCard(task, container, index, renderTasks);
    });
}

renderTasks();

const clearForm = () => {
    inputTitle.value = '';
    inputDescription.value = '';
    inputDate.value = '';
}

const addCard = () => {

    const task = {
        title: inputTitle.value,
        description: inputDescription.value,
        date: inputDate.value,
        important: false,
    }
    store.tasks.push(task)
    clearForm();
    renderTasks();
}

const addTaskButton = document.querySelector('#btnTask');
addTaskButton.addEventListener('click', addCard)

const clearFormButton = document.querySelector('#btnClear');
clearFormButton.addEventListener('click', clearForm)

