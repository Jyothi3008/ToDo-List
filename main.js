let modalPopUp = document.getElementById('popupbox-btn');
function getPopUp(){
    modalPopUp.classList.add('open');
}
let reminderDetails = function (Idate, time, name, avatar) {
    this.Idate = Idate;
    this.time = time;
    this.name = name;
    this.avatar = avatar;
}
function getRemainderDetails() {
    let dateInput = document.getElementById('date');
    let timeInput = document.getElementById('time');
    let todoNameInput = document.getElementById('todolist-name');
    let e = document.getElementById('todolist-avatar');
    let avatarInput = e.options[e.selectedIndex];
    let reminderDetailsValidations = {
        vdateInput: dateInput,
        vtimeInput: timeInput,
        vtodoNameInput: todoNameInput,
        vavatarInput: avatarInput
    }
    let vdateInput = dateInput.value;
    let vtimeInput = timeInput.value;
    let vtodoNameInput = todoNameInput.value;
    let vavatarInput = avatarInput.text;
    let newreminderDetails = new reminderDetails(vdateInput, vtimeInput, vtodoNameInput, vavatarInput);
    if (validateForm(reminderDetailsValidations)) {
        reminderCard(newreminderDetails);
        reminderDetailsArray.push(newreminderDetails);
        localStorage.setItem('reminderCardData', JSON.stringify(reminderDetailsArray));
        let userEnteredDate = document.getElementById('date').value;
        let userEnteredTime = document.getElementById('time').value;
        let userDate = userEnteredDate + " " + userEnteredTime;
        userDate = new Date(userDate);
        let userInputTimeStamp = userDate.getTime();
        console.log(userInputTimeStamp);
        localStorage.setItem('Alarm', userInputTimeStamp);
    }
}
let reminderDetailsArray =[];
let isLocalData = function(){
    let localData = localStorage.getItem('reminderCardData');
    if(localData){
        reminderDetailsArray = JSON.parse(localData);
    }
    return reminderDetailsArray;
}
let reminder = document.getElementById('remainder-main-section');
isLocalData().map(item =>{
    reminderCard(item);
})
function reminderCard(item) {
    debugger;
    let reminderSection = document.createElement('DIV');
        reminderSection.setAttribute('class', 'reminder-section');
    let reminderName = document.createElement('H5');
        reminderName.setAttribute('class', 'reminder-title');
        reminderName.innerText = item.name;
    let reminderAvatar = document.createElement('DIV');
        reminderAvatar.setAttribute('class', 'reminder-avatar');
        reminderAvatar.innerText =item.avatar;
        reminderSection.appendChild(reminderAvatar);
        reminderSection.appendChild(reminderName);
        reminder.prepend(reminderSection);
}
let timeInterval = setInterval(function(){
    let currentDate = new Date();
    let CurrentTimeStamp = currentDate.getTime();
    let LocalData = localStorage.getItem('Alarm');
    if (CurrentTimeStamp > LocalData) {
        alert('user');
        let sound = new Audio("https://raw.githubusercontent.com/Xiija/TestFiles/master/Yuki%20%26%20Tako%2001.mp3");
        sound.loop = true;
        window.clearInterval(timeInterval);
    }
}, 1000);
function validateForm(reminder){
    let dateInputE = document.getElementById('dateError');
    let timeInputE = document.getElementById('timeError');
    let todoNameInputE = document.getElementById('todolistnameError');
    let avatarInputE = document.getElementById('avatar-img-1Error');
    let vdateInput = dateInputE.innerText = isRequiredEle(reminder.vdateInput);
    let vtimeInput = timeInputE.innerText = isRequiredEle(reminder.vtimeInput);
    let vtodoNameInput = todoNameInputE.innerText = isRequiredEle(reminder.vtodoNameInput);
    let vavatarInput = avatarInputE.innerText = isRequiredEle(reminder.vavatarInput);
    if (vdateInput === '' &&
        vtimeInput  === '' &&
        vtodoNameInput === '' &&
        vavatarInput === ''
        ) {
            return true;
    }else{
        return false;
    }
}
function isRequiredEle(input){
    if(input.value === null || input.value === ''){
        input.classList.add('control-error');
        return 'This field should not be empty';
    }else{
        input.classList.remove('control-error');
        return '';
    }
}




