var clientId = '583534449735.apps.googleusercontent.com';
var apiKey = 'AIzaSyDGi3CoXf3o1rf1oFyl51EgVgUB_lkNTqc';
var scopes = 'https://www.googleapis.com/auth/calendar';

//array of objects that holds the calendar name and id
var calendars = new Array();

var start_date = new Date();
var end_date = new Date();

var start_time = 9;
var end_time = 17;

$(window).load(function(){
  if(document.getElementById('calendar').getElementsByTagName('td').length == 0)
    generateCalendar('calendar');
    generateCalendar('group_calendar');
});

function handleClientLoad() {
  // Step 2: Reference the API key
  gapi.client.setApiKey(apiKey);

  //for now, just set the end date to 5 days later
  end_date.setDate(end_date.getDate() +5);


}

function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true, origin:'http://localhost'}, handleAuthResult);
}

function handleAuthClick(event) {
  // Step 3: get authorization to use private data
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false, origin:'http://localhost'}, handleAuthResult);
  window.setTimeout(checkAuth,1);
  return false;
}

function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    makeApiCall();
  } 
}

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
  //Load the google calendar API
  gapi.client.load('calendar', 'v3', function() {
    //assemble the request for a list of the users calendars
    var request = gapi.client.calendar.calendarList.list({});
    //execute the request
    request.execute(function(resp) {
      console.log(resp);
      
      
      for(var i=0; i<resp.items.length; i++){
        //save the calendar information
        calendars[i] = {name: resp.items[i].summary, id: resp.items[i].id};
        //make the checkbox
        makeCheckBox(calendars[i].name, calendars[i].id);
      }

    }); //close execution function
  }); //close load functions

}

function makeCheckBox(name, id){
  console.log(name);
  
  var container = document.createElement("div");
  
  var checkbox = document.createElement("input");
  checkbox.type="checkbox";
  checkbox.value = id;
  checkbox.onclick = displayBusyTimes;

  var label = document.createElement("label");
  label.appendChild(document.createTextNode(name));

  container.appendChild(checkbox);
  container.appendChild(label);

  document.getElementById('content').appendChild(container);
}

function displayBusyTimes(event){
  //get the calendar id for the checkbox
  var cal_id = event.toElement.value;

  //load the calendar api again
  gapi.client.load('calendar', 'v3', function(){
    //make a request for the free busy informatin
    var request = gapi.client.calendar.freebusy.query({
      timeMin: start_date,
      timeMax: end_date,
      items: [{
        id: cal_id
      }]
    });

    //execute the free/busy request
    request.execute(function(resp){
      //console.log(cal_id);
      //console.log(resp.calendars);
      //console.log(resp.calendars[cal_id].busy);
      
      //get the busy times from the response
      var busyTimes = resp.calendars[cal_id].busy;

     // var busyLabel = document.createElement("p");
     // busyLabel.innerHTML = "The times you are busy in the next five days";
     // document.getElementById('content').appendChild(busyLabel);

      for(var i=0; i<busyTimes.length; i++){
        //console.log(busyTimes[i]);
        //console.log("Start: " + new Date(busyTimes[i].start).toLocaleString() +" , End: " + new Date(busyTimes[i].end).toLocaleString());
        var start_busy = new Date(busyTimes[i].start);
        var end_busy =  new Date(busyTimes[i].end);
        var minutes = (end_busy-start_busy)/(1000*60);
       // console.log(minutes);
        for(var j=0; j<minutes; j+=30){
          var date = new Date(start_busy.toLocaleString());
          //console.log(date.toLocaleString());
          date.setTime(date.getTime() + j*60*1000);

          //console.log(date.toLocaleString());
          var element = document.getElementById(date.toLocaleString());
          if(element != null){
            var classes = (element.className).split(" ");

            element.className = "highlighted " + classes[1];
           // console.log(element);
        }
      }
    }

    transferToGroup();

    }); //end the request
  }); //end the calendar load


}


function generateCalendar(htmlID){
  var num_days = (end_date-start_date)/(1000*60*60*24);
  var num_hours = end_time - start_time;

  var calendar = document.getElementById(htmlID);
  //set up the date labels

  //create a variable to hold the row
  var table_row = document.createElement('tr');

  //make the blank space above all the times
  var table_entry = document.createElement('td');
  table_entry.className = 'times';
  table_entry.value = '&nbsp;';
  table_row.appendChild(table_entry);

  for(var i=0; i<num_days; i++){
    var date = new Date(start_date.toDateString());
    date.setDate(start_date.getDate()+i);

    var table_entry = document.createElement('td');
    table_entry.className = 'day';
    table_entry.innerHTML = "     " + (date.getMonth()+1) + "/" + date.getDate() + "     ";

    table_row.appendChild(table_entry);
  }

  calendar.appendChild(table_row);

  //set up the time blocks
  for(var i=0; i<=num_hours*2+1; i++){
    var table_row = document.createElement('tr');

    var table_entry = document.createElement('td');
    table_entry.className = 'times';
    
    if(i%2 === 0){
      if(i/2 + start_time < 12){
        if(i/2 + start_time == 0){
          table_entry.innerHTML = i/2 + start_time + 12 + ":00am";
        }else{
          table_entry.innerHTML = i/2 + start_time + ":00am";
        }

      }
      else{
        if( (i/2 + start_time-12) == 0){
          table_entry.innerHTML = i/2 + start_time + ":00pm";
        }else{
          table_entry.innerHTML = i/2 + start_time - 12 + ":00pm";
        }
      }  
    }
    else{
      table_entry.innerHTML = '&nbsp;';
    }

    table_row.appendChild(table_entry);
    //loop for each dat
    for(var j=0; j<num_days; j++){
      var date = new Date(start_date.toDateString());
      date.setDate(date.getDate()+j);
      date.setHours(start_time+i/2);

      //top part of the hour
      table_entry = document.createElement('td');
      if(i%2 == 0){
        table_entry.className = 'not_highlighted top_hour';
      }
      else{
        date.setMinutes(30);
        table_entry.className = 'not_highlighted bottom_hour';
      }
      table_entry.id = date.toLocaleString();
      table_entry.innerHTML = '&nbsp;';
      
      table_row.appendChild(table_entry);
    }
    calendar.appendChild(table_row);
  }
 
  attachListeners(htmlID);

}

function transferToGroup(){
  var individual = document.getElementById('calendar');
  var group = document.getElementById('group_calendar');

  var elements_indiv = individual.getElementsByTagName('td');
  var elements_group = group.getElementsByTagName('td');
  for(var i=0; i<elements_indiv.length; i++){
    var classes = elements_indiv[i].className.split(" ");
    console.log(classes);
    if(classes[0]=="highlighted"){
      elements_group[i].className = "highlighted " + classes[1];
    }
  }
}