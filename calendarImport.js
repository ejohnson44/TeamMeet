var clientId = '583534449735.apps.googleusercontent.com';
var apiKey = 'AIzaSyDGi3CoXf3o1rf1oFyl51EgVgUB_lkNTqc';
var scopes = 'https://www.googleapis.com/auth/calendar';
var calendars = new Array();

function handleClientLoad() {
  // Step 2: Reference the API key
  gapi.client.setApiKey(apiKey);
  //window.setTimeout(checkAuth,1);
}

function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true, origin:'http://localhost'}, handleAuthResult);
}

function handleAuthResult(authResult) {
console.log("here");
  var authorizeButton = document.getElementById('authorize-button');
  if (authResult && !authResult.error) {
    makeApiCall();
  } 
}

function handleAuthClick(event) {
  // Step 3: get authorization to use private data
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false, origin:'http://localhost'}, handleAuthResult);
  return false;
}

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
  // Step 4: Load the Google+ API
  gapi.client.load('calendar', 'v3', function() {
    // Step 5: Assemble the API request
    var request = gapi.client.calendar.calendarList.list({
    });
    // Step 6: Execute the API request
    request.execute(function(resp) {
      console.log(resp);
      for(var i=0; i<resp.items.length; i++){
	      calendars[i] = {name: resp.items[i].summary, id: resp.items[i].id};
      }
			
			for(var i=0; i<calendars.length; i++){
				makeCheckBox(calendars[i].name, calendars[i].id);
			}


    });
  });

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


  document.getElementById('import_calendars').appendChild(container);
}

function displayBusyTimes(event){
  var cal_id = event.toElement.value;
  var start_date = new Date();
  var end_date = new Date();
  end_date.setDate(end_date.getDate() +5);
  gapi.client.load('calendar', 'v3', function(){
    var request = gapi.client.calendar.freebusy.query({
      timeMin: start_date,
      timeMax: end_date,
      items: [{
        id: cal_id
      }]
    });

    request.execute(function(resp){
      console.log(cal_id);
      
      console.log(resp.calendars);
      console.log(resp.calendars[cal_id].busy);
      var busyTimes = resp.calendars[cal_id].busy;
      for(var i=0; i<busyTimes.length; i++){
        console.log(busyTimes[i]);
        console.log("Start: " + new Date(busyTimes[i].start).toLocaleString() +" , End: " + new Date(busyTimes[i].end).toLocaleString());
        var times = $('.times');
        console.log(new Date(busyTimes[i].start).getHours());
        console.log(times);
        for(var j=0; j<times.length; j++)
        {
          if(times[j].innerHTML === new Date(busyTimes[i].start).getHours())
            console.log();
        }
        
      }

    });


  });
}