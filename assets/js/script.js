//Today's Date 
var timeNow = dayjs();
var formattedDate = dayjs(timeNow).format('dddd, MMMM D');

//get the Date only
var day =  dayjs(timeNow).format('D');
var currentHour =  dayjs(timeNow).format('H');
var suffix;
//Add suffix 'th' after date
if(day === '1' || day === '21' || day === '31'){suffix = 'st'}
else if(day === '2' || day === '22'){suffix = 'nd'}
else if(day === '3' || day === '23'){suffix = 'rd'}
else {suffix = 'th'}

//console.log(day + suffix);

// DOM manuplation
$('.container').addClass("description");
$('#currentDay').text(formattedDate+suffix);

//Start and finish hours
let startDayTime = 9;
let finishDayTime = 17;
//let totalWorkHours = finishDayTime - startDayTime;

//dayjs().hour() // gets current hour
let eachHour = dayjs().hour(startDayTime);

//Iterate through each hour and append it to the DOM
for(var i = 9; i < finishDayTime + 1; i++){
    //Create a list for each hour
    eachHour = dayjs().hour(startDayTime++); // increase hour by 1

    //Create a unique id using hour
    let hourId = `#${eachHour.format('H')}`;
    //Add id to differentiate each row
    let eachRow = `<div id='${eachHour.format('H')}'></div>`; 
    $(".container").append(eachRow);   
    $(hourId).addClass('row');

    //Add colors to hourly slots based on current time
     let slotColor = slotColoring(i);

    //coloumn for time
    let timeSection = $('<div></div>');
    timeSection.addClass('col hour text-end pt-3');
    timeSection.text(eachHour.format('hh A')); // Format into 12H format
    $(hourId).append(timeSection);

    //Description Section
    let descriptionSection = $('<textarea></textarea>');
    descriptionSection.addClass('col-10 '+ slotColor);
    $(hourId).append(descriptionSection)

    //Save Button
    let buttonSection = $('<div></div>');
    buttonSection.addClass('col saveBtn');
    $(hourId).append(buttonSection);
}

function slotColoring(index){
    //If current hour
    if (index == currentHour) { return "present"}
    if (index < currentHour) { return "past"}
    if (index > currentHour) {return "future";}
}