var clientId = '583534449735.apps.googleusercontent.com';
var apiKey = 'AIzaSyDGi3CoXf3o1rf1oFyl51EgVgUB_lkNTqc';
var scopes = 'https://www.googleapis.com/auth/calendar';

//array of objects that holds the calendar name and id
var calendars = new Array();


function handleClientLoad() {
  // Step 2: Reference the API key
  gapi.client.setApiKey(apiKey);

  //for now, just set the end date to 5 days later

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
