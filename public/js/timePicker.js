const titlePicker = document.querySelector('.event-title__picker');
const titlePickable = document.querySelector('.titlePickable')

function activate() {
    document.querySelectorAll('.timePickable').forEach(timePickable => {
        let activePicker = null;

        timePickable.addEventListener('focus', () => {
            if (activePicker) {
                return;
            }

            activePicker = show(timePickable);

            const onClickAway = ({ target }) => {
                if (target === activePicker || target === timePickable || activePicker.contains(target)) {
                    return ;
                };

                console.log('REMOVE PICKER!');
            };

            document.addEventListener('mousedown', onClickAway);
        });
    });
}

function show(timePickable) {
    const picker = buildPicker(timePickable);
    const eventPicker = eventTitleSelect();
    //const {bottom: top, left} = timePickable.getBoundingClientRect();

    //picker.style.top = `${top}px`;
    //picker.style.left = `${left}px`;
    picker.style.display = `none`;
    eventPicker.style.display = `none`;
    //picker.style.position = `absolute`;

    document.querySelector('.event-time__picker').appendChild(picker);
    document.querySelector('.event-title__wrapper').appendChild(eventPicker);

    return picker;
}


function buildPicker(timePickable) {
    const picker = document.createElement('div');
    const hourOptions = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(numberToOption);
    const minuteOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(numberToOption);

    picker.classList.add('time-picker');
    picker.innerHTML = `
        <select class="time-picker__select time-picker__hour">
            ${hourOptions.join('')}
        </select>
        <span class='time-picker__text'>:</span>
        <select class="time-picker__select time-picker__minute">
            ${minuteOptions.join('')}
        </select>
    `;

    const selects = getSelectsFromPicker(picker);

    selects.hour.addEventListener('change', () => timePickable.value = getTimeStringFromPicker(picker));
    selects.minute.addEventListener('change', () => timePickable.value = getTimeStringFromPicker(picker));


    if (timePickable.value) {
        const {hour, minute} = getTimePartsFromPickable(timePickable);

        selects.hour.value = hour;
        selects.minute.value = minute;
    }

    return picker;
}

//collects hour and minute options from timePickable 
function getTimePartsFromPickable(timePickable) {
    const pattern = /^(\d+):(\d+) (am|pm)$/;
    const [hour, minute] = Array.from(timePickable.value.match(pattern)).splice(1);

    return {
        hour,
        minute
    };

}

//collects title option from titlePickable
function getEventTitleFromPickable(titlePickable) {
    const options = Array.from(titlePickable.value);

    return {
        options,
    }
}

function getSelectsFromPicker(timePicker) {
    const [hour, minute] = timePicker.querySelectorAll('.time-picker__select');

    return{ 
        hour,
        minute
    };
}

function getSelectFromPicker(titlePicker) {
    const option = document.querySelectorAll('.event-title__picker > option');

    return{ 
        option,
    };
}

function getTitleStringFromPicker(titlePicker) {
    const select = getSelectFromPicker(titlePicker);

    return `${select.option}`;
}


function getTimeStringFromPicker(timePicker) {
    const selects = getSelectsFromPicker(timePicker);

    return `${selects.hour.value}:${selects.minute.value}`;
}

//adds in options for times to pick; can be no longer than 2 digits
function numberToOption(number) {
    const padded = number.toString().padStart(2, '0');

    return `<option value="${padded}">${padded}</option>`;
}

const fromTimePickable = document.querySelector('.timePickable')
const toTimePickable = document.querySelectorAll('.timePickable')[1]

//function to add/remove display to time from input
show(fromTimePickable);
function showTimeFromPicker() {
    var timePicker = document.querySelectorAll('.time-picker')[0];
    var timeFrom = document.querySelector('.event-time-from');

    if (timePicker.style.display === 'inline-flex') {
        timePicker.style.display = 'none'
        timeFrom.style.display = 'inline-block'
    } else {
        timePicker.style.display = 'inline-flex';
        timeFrom.style.diplay = 'none';
    }
}

//function to add/remove display to time to input
show(toTimePickable);
function showTimeToPicker() {
    var timePicker = document.querySelectorAll('.time-picker')[1];
    var timeTo = document.querySelector('.event-time-to');

    if (timePicker.style.display === 'inline-flex') {
        timePicker.style.display = 'none'
        timeTo.style.display = 'inline-block'
    } else {
        timePicker.style.display = 'inline-flex';
        timeTo.style.diplay = 'none';
        /*if (window.matchMedia("(max-width: 1000px)").matches) {
            timePicker.style.display = 'inline-flex';
        } else {
            timePicker.style.display = 'inline-flex';
        }*/

    }
}

function closeTimePicker() {
    var fromPicker = document.querySelectorAll('.time-picker')[0];
    var toPicker = document.querySelectorAll('.time-picker')[1];

    fromPicker.style.display = 'none';
    toPicker.style.display = 'none';
}


//function to display the event title picker (called when add-event btn is pressed)
function showEventTitlePicker() {
    var eventTitlePicker = document.querySelector('.event-title__wrapper');
    var eventTitle = eventTitlePicker.querySelector('.event-title');

    if (eventTitle.style.display === 'inline-flex') {
        eventTitle.style.display = 'none'
    } else {
        eventTitle.style.display = 'inline-flex';
    }
}


//function to return event title to 'event name' field when clicked
/*
function showDropInfo() {
    let x = document.querySelector('.event-title__picker').selectedIndex;
    let y = document.querySelector('.event-title__picker').options;

    document.querySelector('.titlePickable').text = y[x].text;
}*/

//function to dynamically generate event title dropdown 
function eventTitleSelect() {
    const eventPicker = document.createElement('div');
    //array containing all event titles
    const aptOptions = [`Waxing (Brows)`, `Waxing (Body)`, `Facial`];
    var options = '';

    //creating the options from each item in the array
    //ID corresonds to the placement in array
    aptOptions.map((op, i) => {
        options += `<option value='${op}' id='${i}'>${op}</option>`
    });

    eventPicker.classList.add('event-title');
    eventPicker.innerHTML = `
        <select class="event-title__picker" id='titlePicker'>
            ${options}
        </select>
        <input type="button" class="event-title__input" value="Select multiple options">
        `;

    const select = getSelectFromPicker(titlePicker);

    //select.option.addEventListener('change', () => titlePickable.outerHTML = `${options}`)

    if (titlePickable.value) {
        const option = getEventTitleFromPickable(titlePickable);

        select.option.value = option;
    }
    
    return eventPicker;
}

//allows for multiple options to be selected from the dropdown
function multipleSelect() {
    var p = document.querySelector('.event-title__picker').multiple = true;
}

function singleSelect() {
    document.querySelector('.event-title__picker').multiple = false;
}

//shows event dropdown when clicked on 
document.querySelector('.event-name').addEventListener('click', eventTitleSelect);
document.querySelector('.event-name').addEventListener('click', showEventTitlePicker);
document.querySelector('.event-title__input').addEventListener('click', multipleSelect);
//document.querySelector('#titlePicker').addEventListener('change', showDropInfo);


// displays/hides time pickers when respective input fields are clicked
document.querySelector('.event-time-from').addEventListener('click', showTimeFromPicker);
document.querySelector('.event-time-from').addEventListener('click', showTimeToPicker);
document.querySelector('.time-picker__text').addEventListener('click', closeTimePicker);
document.querySelectorAll('.time-picker__text')[1].addEventListener('click', closeTimePicker);


//console.log(getTitleStringFromPicker(titlePicker));
//console.log(showDropInfo())

document.querySelector('.titlePickable').addEventListener('click', () => console.log(getTitleStringFromPicker(titlePicker)))