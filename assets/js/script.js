//Today's Date 
var timeNow = dayjs();
var formattedDate = dayjs(timeNow).format('dddd, MMMM D') 

//get the Date only
var day =  dayjs(timeNow).format('D');
var suffix;
//Add suffix 'th' after date
if(day === '1' || day === '21' || day === '31'){suffix = 'st'}
else if(day === '2' || day === '22'){suffix = 'nd'}
else if(day === '3' || day === '23'){suffix = 'rd'}
else {suffix = 'th'}

console.log(day + suffix);

// DOM manuplation
let dateElement = document.getElementById('currentDay');
let hourList = document.getElementById('hourList');
dateElement.innerText = formattedDate+suffix;

//Start and finish hours
let startDayTime = 9;
let finishDayTime = 17;

let totalWorkHours = finishDayTime - startDayTime;

//dayjs().hour() // gets current hour
let eachHour = dayjs().hour(startDayTime) // increase hour by 1

for(var i = 0; i < totalWorkHours + 1; i++){
//Create a list for each hour
var list = document.createElement('li');

eachHour = dayjs().hour(startDayTime++) // increase hour by 1
list.innerText = eachHour.format('hh A'); // Format into 12H format

list.classList.add('row');

//append into hourList
hourList.append(list);

}