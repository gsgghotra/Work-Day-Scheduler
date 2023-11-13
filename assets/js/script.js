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

for(var i = 0; i < totalWorkHours + 1; i++){
    //Create a list for each hour
    eachHour = dayjs().hour(startDayTime++) // increase hour by 1
    $("#hourList").append(`<li>${eachHour.format('hh A')}</li>`);  // Format into 12H format
    $("li").addClass('row timeblock hour');
}