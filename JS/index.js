let userNameNickName;
// document.querySelector('.landingpop').style = 'z-index:1;';

//retreive saved name
const savedName = localStorage.getItem('userNameNickName');
userNameNickName = savedName;

// check if userNameNickname has name/nn already saved on it
const checksavednames = () => {

    if (userNameNickName === null) {
        document.querySelector('.landingpop').style = 'z-index:1;';
    } else {
        document.querySelector('.landingpop').style = 'z-index:0;';
        let displayUserName = document.querySelector('.userName');
        displayUserName.innerHTML = userNameNickName;
    }

};
checksavednames();

//get and display username
const setUserNn = () => {

    let user = document.getElementById('userNn');
    const userName = user.value;

    if (userName.length > 0) {
        userNameNickName = userName;
        saveuserName();
        setName();
    } else {
        alert('Please Enter your name/nickname');
    }

};
//set name
const setName = () => {
    let displayUserName = document.querySelector('.userName');
    displayUserName.innerHTML = userNameNickName;
    document.querySelector('.landingpop').style = 'z-index:0;';
};
//save user name
const saveuserName = () => {
    localStorage.setItem('userNameNickName', userNameNickName);
};

let todos;

// Retrieve localStorage
const savedTodos = JSON.parse(localStorage.getItem('todos'));
// Check if it's an array
if (Array.isArray(savedTodos)) {
    todos = savedTodos;

} else {
    todos = [];
}


//push the content and Id to todos array
const createTodos = (textValue, id, textTitleValue) => {
    todos.push({
        Title: textTitleValue,
        content: textValue,
        id: id
    });
    saveTodos();
};

//remove Todo
const removeTodo = idToDelete => {
    todos = todos.filter(todo => {
        // If the id of this todo matches idToDelete, return false
        // For everything else, return true
        if (todo.id === idToDelete) {
            return false;
        } else {
            return true;
        }
    });

    saveTodos();
};

const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

//BackButton
const back = () => {
    const header = document.querySelector('.header');
    header.style = 'transform: scale(0);';

    const pinnedTask = document.querySelector('.pinned-task');
    pinnedTask.style = 'transform: scale(0);';

    const calendarContiner = document.querySelector('.popup-calendar-container');
    calendarContiner.style = 'transform: scale(0);';

    document.querySelector('.addEvent').style = 'transform:scale(0);';

    //clear the task warning sign
    const textTitleWarning = document.querySelector('.task-title-warning');
    textTitleWarning.innerText = '';
    const textWarning = document.querySelector('.task-warning');
    textWarning.innerText = '';

    //reset event warning text
    const descriptionWarningMessage = document.querySelector('.description-warning-text');
    descriptionWarningMessage.innerText = '';
    descriptionWarningMessage.style = 'transform:scale(0);';

    const titleWarningMessage = document.querySelector('.title-warning-text');
    titleWarningMessage.innerText = '';
    titleWarningMessage.style = 'transform:scale(0);';

    const dateWarningMessage = document.querySelector('.date-warning-text');
    dateWarningMessage.innerText = '';
    dateWarningMessage.style = 'transform:scale(0);';

    const messageContainer = document.querySelector('.message-pop-up');
    messageContainer.style = 'transform:scale(0)';

    document.querySelector('.setting-container').style = 'transform:scale(0); z-index:0;';
};

//hide event form
const hideEventform = () => {
    document.querySelector('.addEvent').style = 'transform:scale(0)';

    const descriptionWarningMessage = document.querySelector('.description-warning-text');
    descriptionWarningMessage.style = 'transform:scale(0);';

    const titleWarningMessage = document.querySelector('.title-warning-text');
    titleWarningMessage.style = 'transform:scale(0);';

    const dateWarningMessage = document.querySelector('.date-warning-text');
    dateWarningMessage.style = 'transform:scale(0);';
};

//controler
//addtodos
const addTodos = () => {
    let text = document.querySelector('.text');
    let textTitle = document.querySelector('.text-title');
    //get the user input value
    let textValue = text.value;
    let textTitleValue = textTitle.value;
    //get the id
    let id = '' + Math.random();
    if (textValue.length > 0 && textTitleValue.length > 0) {

        // ===========
        createTodos(textValue, id, textTitleValue);
        display();

        //reset the value of text
        text.value = '';
        textTitle.value = '';
        let header = document.querySelector('.header');
        header.style = 'transform: scale(0);';

        //clear the warning sign
        const textTitleWarning = document.querySelector('.task-title-warning');
        textTitleWarning.innerText = '';
        const textWarning = document.querySelector('.task-warning');
        textWarning.innerText = '';

    } else if (textValue.length <= 0 && textTitleValue.length > 0) {
        const textTitleWarning = document.querySelector('.task-title-warning');
        textTitleWarning.innerText = '';
        const textWarning = document.querySelector('.task-warning');
        textWarning.innerText = 'Please enter task';
    } else if (textValue.length > 0 && textTitleValue.length <= 0) {
        const textTitleWarning = document.querySelector('.task-title-warning');
        textTitleWarning.innerText = 'Please enter title task';
        const textWarning = document.querySelector('.task-warning');
        textWarning.innerText = '';
    } else {
        const textTitleWarning = document.querySelector('.task-title-warning');
        textTitleWarning.innerText = 'Please enter title task';
        const textWarning = document.querySelector('.task-warning');
        textWarning.innerText = 'Please enter task';
    }
};

const deleteTodo = event => {
    deleteBtn = event.target;
    idToDelete = deleteBtn.id;

    removeTodo(idToDelete);
    display();
};

//pin task
let pindtask;
//remove by id
const removepinned = idPinDelete => {
    pindtask = pindtask.filter(pindtas => {

        if (pindtas.id == idPinDelete) {
            return false;
        } else {
            return true;
        }
    });
    savePinnedTask();
};

//delete pinned
const deletepinned = event => {

    deletePinBtn = event.target;
    idPinDelete = deletePinBtn.id;

    removepinned(idPinDelete);
    pinDisplay();
};

// retreive saved pinned task
const savedPinTask = JSON.parse(localStorage.getItem('pinnedtask'));
if (Array.isArray(savedPinTask)) {
    pindtask = savedPinTask;
} else {
    pindtask = [];
}

const pinTheTask = event => {
    pintask1 = event.target.parentElement.parentElement.childNodes[0].id;
    pintask2 = event.target.parentElement.parentElement.childNodes[1].id;
    let pinnedTaskID = Math.random();

    pindtask.push({
        Title: pintask1,
        content: pintask2,
        id: pinnedTaskID
    });


    pinDisplay();
    deleteTodo(event);
    savePinnedTask();
};

const pinDisplay = () => {
    document.querySelector('.pinned').innerHTML = '';

    if (pindtask.length > 0) {
        const backNote = document.querySelector('.backNote');
        backNote.style = 'transform:scale(0)';
    } else {
        const backNote = document.querySelector('.backNote');
        backNote.style = 'transform:scale(1)';
    }

    pindtask.forEach(pindtaskk => {
        const pinContainer = document.createElement('div');
        pinContainer.classList.add('todo-container');

        const pinTitleLi = document.createElement('li');
        pinTitleLi.classList.add('todo-Lii');
        pinTitleLi.innerText = pindtaskk.Title;
        pinContainer.appendChild(pinTitleLi);

        const pinContentLi = document.createElement('li');
        pinContentLi.classList.add('todo-Li');
        pinContentLi.innerText = pindtaskk.content;
        pinContainer.appendChild(pinContentLi);

        const pinButtonDiv = document.createElement('div');
        pinButtonDiv.classList.add('buttonDiv');
        pinContainer.appendChild(pinButtonDiv);

        const pinEditButton = document.createElement('button');
        pinEditButton.classList.add('editBtn');
        pinEditButton.innerHTML = '<i class="fa-solid fa-pen" alt="edit"></i>';
        pinButtonDiv.appendChild(pinEditButton);

        const pinDeleteButton = document.createElement('button');
        pinDeleteButton.classList.add('deleteBtn');
        pinDeleteButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        pinDeleteButton.id = pindtaskk.id;
        pinDeleteButton.onclick = deletepinned;
        pinButtonDiv.appendChild(pinDeleteButton);

        document.querySelector('.pinned').appendChild(pinContainer);
    });

};
pinDisplay();
//save pinned task
const savePinnedTask = () => {
    localStorage.setItem('pinnedtask', JSON.stringify(pindtask));
};


const display = () => {
    document.querySelector('.todos').innerHTML = '';

    todos.forEach(todo => {
        // create div element
        const todoDiv = document.createElement('div');
        //add class
        todoDiv.classList.add('todo-container');

        //create li element
        const todoLii = document.createElement('li');
        todoLii.classList.add('todo-Lii');
        todoLii.setAttribute('value', `${todo.Title}`);
        todoLii.setAttribute('id', `${todo.Title}`);
        //append Li to Div element
        todoDiv.appendChild(todoLii);
        todoLii.innerText = todo.Title;
        //create li element
        const todoLi = document.createElement('li');
        todoLi.classList.add('todo-Li');
        todoLi.setAttribute('value', `${todo.content}`);
        todoLi.setAttribute('id', `${todo.content}`);
        //append Li to Div element
        todoDiv.appendChild(todoLi);
        todoLi.innerText = todo.content;


        //create another div for buttons
        const buttonDiv = document.createElement('div');
        //buttonDiv Class name
        buttonDiv.classList.add('buttonDiv');
        //append the button div to todo div
        todoDiv.appendChild(buttonDiv);

        //create edit button
        const editBtn = document.createElement('button');
        //add icon to button
        editBtn.innerHTML = '<i class="fa-solid fa-pen" alt="edit"></i>';
        //Add classt name to button
        editBtn.classList.add('editBtn');
        editBtn.id = todo.id;
        //append the button in element div
        buttonDiv.appendChild(editBtn);
        //edit function
        editBtn.addEventListener('click', () => {
            if (editBtn.innerHTML === '<i class="fa-solid fa-pen" alt="edit"></i>') {
                todoLii.contentEditable = true;

                todoLi.contentEditable = true;
                todoLi.focus();
                todoLi.style = 'outline:none;';
                todoLii.style = 'outline:none;';

                editBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';
            } else {
                todoLii.contentEditable = false;
                todoLi.contentEditable = false;
                editBtn.innerHTML = '<i class="fa-solid fa-pen" alt="edit"></i>';
                saveTodos();
            }
        });

        //create delete button
        const deleteBtn = document.createElement('button');
        //rename the button
        deleteBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        //Add classt name to button
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.onclick = deleteTodo;
        deleteBtn.id = todo.id;
        //append the button in element div
        buttonDiv.appendChild(deleteBtn);
        //delete function

        const todosDisplay = document.querySelector('.todos');
        todosDisplay.appendChild(todoDiv);


        const pinButton = document.createElement('button');
        pinButton.innerHTML = '<i class="fa-solid fa-thumbtack" alt="pin"></i>';
        pinButton.classList.add('pinBtn');
        pinButton.onclick = pinTheTask;
        pinButton.id = todo.id;
        buttonDiv.appendChild(pinButton);

    });

};
display();

//Display UserInput
//Add Task
const displayInputs = () => {

    let header = document.querySelector('.header');
    header.style = 'transform: scale(1); z-index:1;';
    const pinnedTask = document.querySelector('.pinned-task');
    pinnedTask.style = 'transform: scale(0); z-index:0;';
    const calendarContiner = document.querySelector('.popup-calendar-container');
    calendarContiner.style = 'transform: scale(0);z-index: 0;';

    const messageContainer = document.querySelector('.message-pop-up');
    messageContainer.style = 'transform:scale(0); z-index:0;';
    document.querySelector('.setting-container').style = 'transform:scale(0); z-index:0;';
};

const pinnedTask = () => {

    const pinnedTask = document.querySelector('.pinned-task');
    pinnedTask.style = 'transform: scale(1); z-index:1;';
    let header = document.querySelector('.header');
    header.style = 'transform: scale(0); z-index:0;';
    const calendarContiner = document.querySelector('.popup-calendar-container');
    calendarContiner.style = 'transform: scale(0);z-index: 0;';

    const messageContainer = document.querySelector('.message-pop-up');
    messageContainer.style = 'transform:scale(0); z-index:0;';
    document.querySelector('.setting-container').style = 'transform:scale(0); z-index:0;';
};

// calendar/events

const displayEvents = () => {
    const calendarContiner = document.querySelector('.popup-calendar-container');
    calendarContiner.style = 'transform: scale(1);z-index: 1;';

    document.querySelector('.header').style = 'transform:scale(0);';
    document.querySelector('.pinned-task').style = 'transform:scale(0);';

    const messageContainer = document.querySelector('.message-pop-up');
    messageContainer.style = 'transform:scale(0); z-index:0;';
    document.querySelector('.setting-container').style = 'transform:scale(0); z-index:0;';

    document.querySelector('.addEvent').style = 'transform:scale(0); z-index:0;';


};

//set date,month,year
const displayDates = () => {
    const date = new Date();
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const monthToday = document.querySelector('.month');
    monthToday.innerHTML = months[date.getMonth()];
    const dateToday = document.querySelector('.date');
    dateToday.innerHTML = date.getDate();
    const yearToday = document.querySelector('.year');
    yearToday.innerHTML = date.getFullYear();


};

displayDates();

const text = document.querySelector('.quotes');
const author = document.querySelector('.author');
// random qoutes
const getQuote = async() => {
    const res = await fetch('https://type.fit/api/quotes');
    const quotes = await res.json();
    const num = Math.floor(Math.random() * quotes.length);
    const item = quotes[num];

    const quote = item.text;
    const authorName = item.author;

    text.innerText = quote;
    if (authorName != null) {
        author.innerText = '-' + authorName;
    } else {
        author.innerText = '-unknown';
    }


};
getQuote();



// add event button
//display event form
const addEvent = () => {
    document.querySelector('.addEvent').style = 'transform:scale(1);';
};

//Add Event funtion
//add event form
let events;

const savedEvents = JSON.parse(localStorage.getItem('events'));
if (Array.isArray(savedEvents)) {
    events = savedEvents;
} else {
    events = [];
}



const pushEvent = (titleEventValue, eventDescriptionValue, eventDateValue) => {
    const id = Math.random();

    events.push({
        Title: titleEventValue,
        Description: eventDescriptionValue,
        Date: eventDateValue,
        Id: id
    });

    saveEvents();
};

//remove Event
const deleteEvents = eventDeleteBtn => {
    events = events.filter(eventtt => {
        if (eventtt.Id == eventDeleteBtn) {
            return false;
        } else {
            return true;
        }
    });
    saveEvents();
};

//delete events by Id
const removeEventsById = event => {
    eventsDeleteBtn = event.target;
    eventDeleteBtn = eventsDeleteBtn.id;

    console.log(eventsDeleteBtn);
    deleteEvents(eventDeleteBtn);
    renderEvents();

};



const saveEvent = () => {
    let titleEvent = document.querySelector('.eventTitle');
    let eventDescription = document.querySelector('.eventDescription');
    let eventDate = document.querySelector('.eventDate');

    //get the value of form
    let titleEventValue = titleEvent.value;
    let eventDescriptionValue = eventDescription.value;
    let eventDateValue = eventDate.value;

    //check if title is empty
    if (titleEventValue.length <= 0 && eventDateValue.length > 0 && eventDescriptionValue.length > 0) {
        const descriptionWarningMessage = document.querySelector('.description-warning-text');
        descriptionWarningMessage.innerText = 'Please enter event description';
        descriptionWarningMessage.style = 'transform:scale(0);';

        const titleWarningMessage = document.querySelector('.title-warning-text');
        titleWarningMessage.innerText = 'Please enter event title';
        titleWarningMessage.style = 'transform:scale(1);';

        const dateWarningMessage = document.querySelector('.date-warning-text');
        dateWarningMessage.innerText = 'Please enter event date';
        dateWarningMessage.style = 'transform:scale(0);';

        //check if description is empty
    } else if (titleEventValue.length > 0 && eventDateValue.length > 0 && eventDescriptionValue.length <= 0) {
        const descriptionWarningMessage = document.querySelector('.description-warning-text');
        descriptionWarningMessage.innerText = 'Please enter event description';
        descriptionWarningMessage.style = 'transform:scale(1);';

        const titleWarningMessage = document.querySelector('.title-warning-text');
        titleWarningMessage.innerText = 'Please enter event title';
        titleWarningMessage.style = 'transform:scale(0);';

        const dateWarningMessage = document.querySelector('.date-warning-text');
        dateWarningMessage.innerText = 'Please enter event date';
        dateWarningMessage.style = 'transform:scale(0);';

        //check if date has empty
    } else if (titleEventValue.length > 0 && eventDateValue.length <= 0 && eventDescriptionValue.length > 0) {
        const descriptionWarningMessage = document.querySelector('.description-warning-text');
        descriptionWarningMessage.innerText = 'Please enter event description';
        descriptionWarningMessage.style = 'transform:scale(0);';

        const titleWarningMessage = document.querySelector('.title-warning-text');
        titleWarningMessage.innerText = 'Please enter event title';
        titleWarningMessage.style = 'transform:scale(0);';

        const dateWarningMessage = document.querySelector('.date-warning-text');
        dateWarningMessage.innerText = 'Please enter event date';
        dateWarningMessage.style = 'transform:scale(1);';

        //check if all is empty 
    } else if (titleEventValue.length <= 0 && eventDateValue.length <= 0 && eventDescriptionValue.length <= 0) {
        const descriptionWarningMessage = document.querySelector('.description-warning-text');
        descriptionWarningMessage.innerText = 'Please enter event description';
        descriptionWarningMessage.style = 'transform:scale(1); margin-bottom:5px;';

        const titleWarningMessage = document.querySelector('.title-warning-text');
        titleWarningMessage.innerText = 'Please enter event title';
        titleWarningMessage.style = 'transform:scale(1); margin-bottom:5px;';

        const dateWarningMessage = document.querySelector('.date-warning-text');
        dateWarningMessage.innerText = 'Please enter event date';
        dateWarningMessage.style = 'transform:scale(1); margin-bottom:5px;';

    } else if (titleEventValue.length > 0 && eventDateValue.length <= 0 && eventDescriptionValue.length <= 0) {
        const descriptionWarningMessage = document.querySelector('.description-warning-text');
        descriptionWarningMessage.innerText = 'Please enter event description';
        descriptionWarningMessage.style = 'transform:scale(1); margin-bottom:5px;';

        const titleWarningMessage = document.querySelector('.title-warning-text');
        titleWarningMessage.innerText = 'Please enter event title';
        titleWarningMessage.style = 'transform:scale(0); margin-bottom:5px;';

        const dateWarningMessage = document.querySelector('.date-warning-text');
        dateWarningMessage.innerText = 'Please enter event date';
        dateWarningMessage.style = 'transform:scale(1); margin-bottom:5px;';

    } else if (titleEventValue.length <= 0 && eventDateValue.length > 0 && eventDescriptionValue.length <= 0) {
        const descriptionWarningMessage = document.querySelector('.description-warning-text');
        descriptionWarningMessage.innerText = 'Please enter event description';
        descriptionWarningMessage.style = 'transform:scale(1); margin-bottom:5px;';

        const titleWarningMessage = document.querySelector('.title-warning-text');
        titleWarningMessage.innerText = 'Please enter event title';
        titleWarningMessage.style = 'transform:scale(1); margin-bottom:5px;';

        const dateWarningMessage = document.querySelector('.date-warning-text');
        dateWarningMessage.innerText = 'Please enter event date';
        dateWarningMessage.style = 'transform:scale(0); margin-bottom:5px;';

    } else if (titleEventValue.length <= 0 && eventDateValue.length <= 0 && eventDescriptionValue.length > 0) {
        const descriptionWarningMessage = document.querySelector('.description-warning-text');
        descriptionWarningMessage.innerText = 'Please enter event description';
        descriptionWarningMessage.style = 'transform:scale(0); margin-bottom:5px;';

        const titleWarningMessage = document.querySelector('.title-warning-text');
        titleWarningMessage.innerText = 'Please enter event title';
        titleWarningMessage.style = 'transform:scale(1); margin-bottom:5px;';

        const dateWarningMessage = document.querySelector('.date-warning-text');
        dateWarningMessage.innerText = 'Please enter event date';
        dateWarningMessage.style = 'transform:scale(1); margin-bottom:5px;';
    } else {
        // //reset the value in form
        titleEvent.value = '';
        eventDescription.value = '';
        eventDate.value = '';

        pushEvent(titleEventValue, eventDescriptionValue, eventDateValue);
        renderEvents();
        document.querySelector('.addEvent').style = 'transform:scale(0)';
    }
};

const renderEvents = () => {
    //reset the old event
    let eventList = document.querySelector('.event-list');
    eventList.innerHTML = '';

    events.forEach(eventt => {
        //create div container element
        const eventDivContainer = document.createElement('div');
        eventDivContainer.classList.add('eventDivContainer');
        eventDivContainer.setAttribute('id', `${eventt.Id}`);

        //creat eventsdiv
        const eventsDiv = document.createElement('div');
        eventsDiv.classList.add('events-Div');

        //create h1 element
        const h1Element = document.createElement('h1');
        h1Element.classList.add('event-title');
        h1Element.innerText = eventt.Title;
        //append h1 element to div element
        eventsDiv.appendChild(h1Element);
        //create p element
        const parElement = document.createElement('p');
        parElement.classList.add('event-description');
        parElement.innerText = eventt.Description;
        //append p element to div element
        eventsDiv.appendChild(parElement);

        //append eventsDiv to eventDivContainer
        eventDivContainer.appendChild(eventsDiv);

        //create div for lining and connecting 2divs
        const extraDiv = document.createElement('div');
        extraDiv.classList.add('extraDiv');
        //append extradiv to eventsDiv
        eventDivContainer.appendChild(extraDiv);

        //create div for dueDate
        const dueDateDiv = document.createElement('div');
        dueDateDiv.classList.add('dueDate-Div');

        //create element for duedate
        const dueDateElement = document.createElement('p');
        dueDateElement.classList.add('dueDate-Element');
        dueDateElement.innerText = eventt.Date;
        //append duedate element to duedatediv
        dueDateDiv.appendChild(dueDateElement);

        //create delete button
        //append to dueDate Div
        const eventsDeleteBtn = document.createElement('button');
        eventsDeleteBtn.classList.add('event-delete-btn');
        eventsDeleteBtn.id = eventt.Id;
        eventsDeleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        eventsDeleteBtn.onclick = removeEventsById;
        dueDateDiv.appendChild(eventsDeleteBtn);
        //append duedatediv to eventsdiv
        eventDivContainer.appendChild(dueDateDiv);

        eventList.appendChild(eventDivContainer);
    });
};
renderEvents();
//save events to local storage
const saveEvents = () => {
    localStorage.setItem('events', JSON.stringify('events'));
};

const displayMessage = () => {
    const messageContainer = document.querySelector('.message-pop-up');
    messageContainer.style = 'transform:scale(1); z-index:5;';

    const header = document.querySelector('.header');
    header.style = 'transform: scale(0);';

    const pinnedTask = document.querySelector('.pinned-task');
    pinnedTask.style = 'transform: scale(0);';

    const calendarContiner = document.querySelector('.popup-calendar-container');
    calendarContiner.style = 'transform: scale(0);';

    document.querySelector('.addEvent').style = 'transform:scale(0);';

    //clear the task warning sign
    const textTitleWarning = document.querySelector('.task-title-warning');
    textTitleWarning.innerText = '';
    const textWarning = document.querySelector('.task-warning');
    textWarning.innerText = '';

    //reset event warning text
    const descriptionWarningMessage = document.querySelector('.description-warning-text');
    descriptionWarningMessage.innerText = '';
    descriptionWarningMessage.style = 'transform:scale(0);';

    const titleWarningMessage = document.querySelector('.title-warning-text');
    titleWarningMessage.innerText = '';
    titleWarningMessage.style = 'transform:scale(0);';

    const dateWarningMessage = document.querySelector('.date-warning-text');
    dateWarningMessage.innerText = '';
    dateWarningMessage.style = 'transform:scale(0);';

    document.querySelector('.setting-container').style = 'transform:scale(0);';
};

//settings
const settings = () => {

    document.querySelector('.setting-container').style = 'transform:scale(1); z-index:5;';
    const header = document.querySelector('.header');
    header.style = 'transform: scale(0);';

    const pinnedTask = document.querySelector('.pinned-task');
    pinnedTask.style = 'transform: scale(0);';

    const calendarContiner = document.querySelector('.popup-calendar-container');
    calendarContiner.style = 'transform: scale(0);';

    document.querySelector('.addEvent').style = 'transform:scale(0);';

    //clear the task warning sign
    const textTitleWarning = document.querySelector('.task-title-warning');
    textTitleWarning.innerText = '';
    const textWarning = document.querySelector('.task-warning');
    textWarning.innerText = '';

    //reset event warning text
    const descriptionWarningMessage = document.querySelector('.description-warning-text');
    descriptionWarningMessage.innerText = '';
    descriptionWarningMessage.style = 'transform:scale(0);';

    const titleWarningMessage = document.querySelector('.title-warning-text');
    titleWarningMessage.innerText = '';
    titleWarningMessage.style = 'transform:scale(0);';

    const dateWarningMessage = document.querySelector('.date-warning-text');
    dateWarningMessage.innerText = '';
    dateWarningMessage.style = 'transform:scale(0);';

    const messageContainer = document.querySelector('.message-pop-up');
    messageContainer.style = 'transform:scale(0)';

};