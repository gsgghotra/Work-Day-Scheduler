//Today's Date 
var timeNow = dayjs();
var formattedDate = dayjs(timeNow).format('dddd, MMMM D');

//get the Date only
var day =  dayjs(timeNow).format('D');
var suffix;
//Add suffix 'th' after date
if(day === '1' || day === '21' || day === '31'){suffix = 'st'}
else if(day === '2' || day === '22'){suffix = 'nd'}
else if(day === '3' || day === '23'){suffix = 'rd'}
else {suffix = 'th'}

//console.log(day + suffix);

// DOM manuplation
$('#hourList').addClass("description");
$('#currentDay').text(formattedDate+suffix);

//Start and finish hours
let startDayTime = 9;
let finishDayTime = 17;
let totalWorkHours = finishDayTime - startDayTime;

//dayjs().hour() // gets current hour
let eachHour = dayjs().hour(startDayTime);

//Iterate through each hour and append it to the DOM
for(var i = 0; i < totalWorkHours + 1; i++){
    //Create a list for each hour
    eachHour = dayjs().hour(startDayTime++); // increase hour by 1

    //Create a unique id using hour
    let hourId = `#${eachHour.format('h')}`;
    //Add id to differentiate each row
    let eachRow = `<div id='${eachHour.format('h')}'></div>`; 
    $(".container").append(eachRow);   
    $(hourId).addClass('row hour');

    //coloumn for time
    let timeSection = $('<div></div>');
    timeSection.addClass('col');
    timeSection.text(eachHour.format('hh A')); // Format into 12H format
    $(hourId).append(timeSection);

    //Description Section
    let descriptionSection = $('<textarea></textarea>');
    descriptionSection.addClass('col-10');
    $(hourId).append(descriptionSection)

    //Save Button
    let buttonSection = $('<div></div>');
    buttonSection.addClass('col');
    $(hourId).append(buttonSection)
}