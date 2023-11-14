//Today's Date 
var timeNow = dayjs();
var formattedDate = dayjs(timeNow).format('dddd, MMMM D');

let locallyStored = localStorage.getItem(formattedDate);

//variable for storage
let storedData = new Map;

//Converting stored array into map
locallyStored = new Map(JSON.parse(locallyStored));

//check if data already exists in localstorage, update the variable
if (locallyStored.size){
    storedData = locallyStored;
}

console.log(storedData);

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
    slotManager( hourId, slotColor);
}

//Colouring the slots
function slotColoring(index){
    //If current hour
    if (index == currentHour) { return "present"}
    if (index < currentHour) { return "past"}
    if (index > currentHour) {return "future";}
}

//Managing slots
function slotManager(hourId, slotColor){
    //coloumn for time
    let timeSection = $('<div></div>');
    timeSection.addClass('col hour text-end pt-3');
    timeSection.text(eachHour.format('hh A')); // Format into 12H format
    $(hourId).append(timeSection);

    //Description Section
    let descriptionSection = $(`<textarea id="text-${eachHour.format('H')}"></textarea>`);
    descriptionSection.addClass('col-10 '+ slotColor);
    $(hourId).append(descriptionSection);

    //check if info saved in storage
    if (storedData.has(eachHour.format('H'))){
        //Display in info inside textarea
        descriptionSection.val(storedData.get(eachHour.format('H')));
    }

    //Save Button
    let buttonSection = $(`<button></button>`);
    buttonSection.addClass('col saveBtn');
    $(hourId).append(buttonSection);

    let saveIcon = $('<i></i>');
    saveIcon.addClass("fa-solid fa-floppy-disk fa-xl");
    buttonSection.append(saveIcon);


    //Event listener on click
    $(hourId).on( "click", function(event) {
        //eventHour =  $( this ).text();
        //ONLY RESPONSE TO BUTTON CLICK OR THE SAVE ICON
        if (event.target.nodeName === "BUTTON" || event.target.nodeName === "I" ){
            //Grab id of the text
            let divId = $(this).closest('div').attr('id'); //Parent ID
            let textId = `#text-${divId}`;

            //console.log(event.target.nodeName);
            if ($(textId).val()){ //Only response if value isn't empty

                //Using map to store data. Using hour as key
                storedData.set(divId, $(textId).val());

                //To use JSON stringify, create an array using entries method
                let stringifyData = JSON.stringify(Array.from(storedData.entries()));                
                localStorage.setItem(formattedDate, stringifyData);
            }   
        }
    });
}
