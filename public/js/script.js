import * as timePicker from './timePicker.js';

const calendar = document.querySelector('.calendar'),   
    date = document.querySelector('.date'),
    daysContainer = document.querySelector('.days'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    gotoBtn = document.querySelector('.goto-btn'),
    todayBtn = document.querySelector('.today-btn'),
    dateInput = document.querySelector('.date-input'),
    eventDay = document.querySelector('.event-day'),
    eventDate = document.querySelector('.event-date'),
    addEventBtn = document.querySelector('.add-event'),
    addEventContainer = document.querySelector('.add-event-wrapper'),
    addEventCloseBtn = document.querySelector('.close'),
    addEventTitle = document.querySelector('.event-name'),
    addEventFrom = document.querySelector('.event-time-from'),
    addEventTo = document.querySelector('.event-time-to'),
    eventContainer = document.querySelector('.events'),
    addEventSubmit = document.querySelector('.add-event-btn'),
    timePickable = document.querySelectorAll('.timePickable'),
    picker = document.querySelectorAll('.time-picker');

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];



//set an empty array
let eventsArr = [];
//then call get
getEvents();

//function to add days
function initCalendar() {
//gets previous months days and current months days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

//updates date at top of calendar
    date.innerHTML = months[month] + ' ' + year;

//adding days on DOM    
    let days = '';

//previous month's days
    for(let x = day; x > 0; x--){
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

//current month's days
    for(let i = 1; i <= lastDate; i++){

        //check if event is present on current day
        let event = false;
        eventsArr.forEach((eventObj) => {
            if (eventObj.day ===  i && eventObj.month === month + 1 && eventObj.year === year) {
                //if event found
                event = true;
            }
        })

//if day is today, add today class
        if(i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
            activeDay = i;
            getActiveDay(i);
            updateEvents(i);
            
            //if event found also add event class
            //add active today on startup
            if (event) {
                days += `<div class="day today event active">${i}</div>`;
            } 
            else {
                days += `<div class="day today active">${i}</div>`;
            }
        }   
        else {
//add remaining as is
            if (event) {
                days += `<div class="day event">${i}</div>`;
            } else {
                days += `<div class="day">${i}</div>`;
            }
        }
    }

//next month's days
    for(let j = 1; j<= nextDays; j++){
        days += `<div class="day next-date">${j}</div>`;
    }
    daysContainer.innerHTML = days;
    addListener();

}

initCalendar();

//Previous Month
function prevMonth() {
    month--;
    if(month < 0) {
        month = 11;
        year--;
    } 
    initCalendar();
}

function nextMonth() {
    month++;
    if(month > 11) {
        month = 0;
        year++;
    } 
    initCalendar();
}

//function to go to entered date
function gotoDate() {
    const dateArr = dateInput.value.split('/');
    //date validation
    if(dateArr.length === 2) {
        if(dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4){
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    //if invalid date
    alert('invalid date');
}

//add eventlistner on prev and next
prev.addEventListener('click', prevMonth);
next.addEventListener('click', nextMonth);

//add eventlistner to gotoBtn, todayBtn and dateInput
todayBtn.addEventListener('click', () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
})

dateInput.addEventListener('input', (e) => {
//allow only numbers, removes anything else
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, '');
    if(dateInput.value.length === 2) {
        //add a slash if 2 numbers are entered
        dateInput.value += '/';
    }
    if(dateInput.value.length > 7){
        //don't allow more than 7 characters
        dateInput.value = dateInput.value.slice(0, 7);
    }
    //if backspace pressed
    if(e.inputType === 'deleteContentBackward') {
        if(dateInput.value.length === 3){
            dateInput.value = dateInput.value.slice(0,2);
        }
    }
})

gotoBtn.addEventListener('click', gotoDate);

//event listeners to open and close new event window
addEventBtn.addEventListener('click', () => {
    addEventContainer.classList.toggle('active');
});
addEventCloseBtn.addEventListener('click', () => {
    addEventContainer.classList.remove('active');
    picker[0].style.display = 'none';
    picker[1].style.display = 'none';
    document.querySelector('.event-title').style.display = 'none';
});

document.addEventListener('click', (e) => {
    //if you click outside
    var timePicker = document.querySelectorAll('.time-picker__select')
    if(e.target !== addEventBtn &&
    !addEventContainer.contains(e.target) && 
    e.target !== document.querySelectorAll('.time-picker')[0,1] &&
    e.target !== timePicker[0] &&
    e.target !== timePicker[1] &&
    e.target !== timePicker[2] &&
    e.target !== timePicker[3]) {
        addEventContainer.classList.remove('active');
        picker[0].style.display = 'none';
        picker[1].style.display = 'none';
        document.querySelector('.event-title').style.display = 'none';
    }
});

//allows only 50 characters in title
addEventTitle.addEventListener('input', (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 50);
});

//time formatting for from and to time
addEventFrom.addEventListener('input', (e) => {
    //remove anything other than numbers
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, '');
    //if 2 numbers entered add :
    if(addEventFrom.value.length === 2) {
        addEventFrom.value += ':';
    }
    //dont let users add more than 5 characters
    if(addEventFrom.value.length > 5 ) {
        addEventFrom.value = addEventFrom.value.slice(0, 5)
    }
})

addEventTo.addEventListener('input', (e) => {
    //remove anything other than numbers
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, '');
    //if 2 numbers entered add :
    if(addEventTo.value.length === 2) {
        addEventTo.value += ':';
    }
    //dont let users add more than 5 characters
    if(addEventTo.value.length > 5 ) {
        addEventTo.value = addEventTo.value.slice(0, 5)
    }
})

//function to add listener to days after rendered
function addListener() {
    const days = document.querySelectorAll('.day');
    days.forEach((day) => {
        day.addEventListener('click', (e) => {
            //set current day as active
            activeDay = Number(e.target.innerHTML);

            //call active day after click
            getActiveDay(e.target.innerHTML);
            updateEvents(Number(e.target.innerHTML));

            //remove active from already active day
            days.forEach((day) => {
                day.classList.remove('active');
            })

            //if previous month clicked goto prev month and add active
            if(e.target.classList.contains('prev-date')) {
                prevMonth();

                setTimeout(() => {
                    //select all days for that month
                    const days = document.querySelectorAll('.day');

                    //after going to previous month add active to clicked day
                    days.forEach((day) => {
                        if(!day.classList.contains('prev-date') && day.innerHTML === e.target.innerHTML) {
                            day.classList.add('active');
                        }
                    });
                }, 100);
            }   else if(e.target.classList.contains('next-date')) {
                nextMonth();

                setTimeout(() => {
                    //select all days for that month
                    const days = document.querySelectorAll('.day');

                    //after going to next month add active to clicked day
                    days.forEach((day) => {
                        if(!day.classList.contains('next-date') && day.innerHTML === e.target.innerHTML) {
                            day.classList.add('active');
                        }
                    });
                }, 100); 
            } else {
                //remaining current month days
                e.target.classList.add('active');
            };

        });
    });
}

//show active day events and date at top

function getActiveDay(date) {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(" ")[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + ' ' + months[month] + ' ' + year;
}

//function to show events of that day
function updateEvents(date) {
    let events = '';
    eventsArr.forEach((event) => {
        //get events of active day only
        if(date === event.day && month + 1 === event.month && year === event.year){
            //then show even on document
            event.events.forEach((event) => {
                events += `
                <div class="event">
                    <div class="title">
                        <i class="fas fa-circle"></i>
                        <h3 class="event__title">${event.title}</h3>
                    </div>
                    <div class="event-time">
                        <span class="event-time">${event.time}</span>
                    </div>
                </div>
                `;
            });
        }
    });

    //if nothing found
    if (events === ""){
        events = `<div class="no-event">
        <h3>No events</h3>
        </div>`;
    }

    eventContainer.innerHTML = events;
    //save events when update events called
    saveEvents();
}

//function to add new event
addEventSubmit.addEventListener('click', () => {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;

    //some validations
    if (eventTitle === '' || eventTimeFrom === '' || eventTimeTo === '') {
        alert('Please fill out all fields');
        return;
    }
    
    const timeFromArr = eventTimeFrom.split(':');
    const timeToArr = eventTimeTo.split(':');

    if (timeFromArr.length !== 2 || timeToArr.length !== 2 || timeFromArr[0] > 23 || timeFromArr[1] > 59 || timeToArr[0] > 23 || timeToArr[1] > 59 ){
        alert('Invalid time format');
    }

    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);

    const newEvent = {
        title : eventTitle,
        time : timeFrom + ' - ' + timeTo,
    }

    let eventAdded = false;

    //check if eventsArr is empty
    if (eventsArr.length > 0) {
        //check if current day already has any events then add to array
        eventsArr.forEach((item) => {
            if(item.day === activeDay && item.month === month + 1 && item.year === year) {
                item.events.push(newEvent);
                eventAdded = true;
            }
        });
    }

    //if events array is empty or current day has none create new event
    if(!eventAdded) {
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year: year,
            events: [newEvent],
        });
    }

    //remove active from add event form
    addEventContainer.classList.remove('active');
    //clear the fields
    addEventTitle.value = '';
    addEventFrom.value = '';
    addEventTo.value = '';

    //show current added events
    updateEvents(activeDay);

    //also add event class to newly added events
    const activeDayElem = document.querySelector('.day.active');
    if (!activeDayElem.classList.contains('event')) {
        activeDayElem.classList.add('event');
    }

    if (picker[0].style.display === 'inline-block') {
        picker[0].style.display = 'none';
    } 
    if (picker[1].style.display === 'inline-block') {
        picker[1].style.display = 'none';
    } 
});

function sortEventsByMonth(a,b) {
    if (a.month < b.month) {
        return -1;
    }
    if (a.month > b.month) {
        return 1;
    }
    return 0;
};

//console.log(eventsArr.sort(sortEventsByMonth));

function convertTime(time) {
    let timeArr = time.split(':');
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? 'PM' : 'AM';
    timeHour = timeHour % 12 || 12;
    time = timeHour + ' ' + timeMin + ' ' + timeFormat;
    return time;
}

//function to remove events on click
eventContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('event')) {
        let text = "Are you sure you want to delete this event?";
        if (confirm(text) == true ){
            const eventTitle = e.target.children[0].children[1].innerHTML;
        //get the title of even then search array and delete by title
        eventsArr.forEach((event) => {
            if(event.day === activeDay && event.month === month + 1 && event.year === year) {
                event.events.forEach((item, index) => {
                    if(item.title === eventTitle) {
                        event.events.splice(index, 1);
                    }   
                });

                //if no event remaining on day remove complete day
                if (event.events.length === 0) {
                    eventsArr.splice(eventsArr.indexOf(event), 1);

                    //after removing day remove event class from day as well
                    const activeDayElem = document.querySelector('.day.active');
                    if(activeDayElem.classList.contains('event')) {
                        activeDayElem.classList.remove('event')
                    }
                }
            }
        });
        //after removing events from array update event
        updateEvents(activeDay);
        } else {
            //if no event remaining on day remove complete day
            if (event.events.length === 0) {
                eventsArr.splice(eventsArr.indexOf(event), 1);

                //after removing day remove event class from day as well
                const activeDayElem = document.querySelector('.day.active');
                if(activeDayElem.classList.contains('event')) {
                    activeDayElem.classList.remove('event')
                }
            }
        }
    }
})

//store events in local storage and get from there
function saveEvents() {
    localStorage.setItem('events', JSON.stringify(eventsArr))
}

function getEvents() {
    if(localStorage.getItem('events' === null)) {
        return;
    } 
    eventsArr.push(... JSON.parse(localStorage.getItem('events')));
    //console.log( Object.values(localStorage) );
}

