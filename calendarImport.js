var clientId = '583534449735.apps.googleusercontent.com';
var apiKey = 'AIzaSyDGi3CoXf3o1rf1oFyl51EgVgUB_lkNTqc';
var scopes = 'https://www.googleapis.com/auth/calendar';

//array of objects that holds the calendar name and id
var calendars = new Array();

var times_by_cal = [];


function handleClientLoad() {
  //Reference the API key
  gapi.client.setApiKey(apiKey);

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
      
      var boxes = document.getElementById('content').getElementsByTagName("div");
      var length = new Number(boxes.length);
      
      while( boxes.length >0 ){
        document.getElementById('content').removeChild(boxes[0]);
      }
      

      for(var i=0; i<resp.items.length; i++){
        //save the calendar information
        calendars[i] = {name: resp.items[i].summary, id: resp.items[i].id, busy: []};
        //make the checkbox
        makeCheckBox(calendars[i].name, calendars[i].id);
      }

    }); //close execution function
  }); //close load functions

}

function makeCheckBox(name, id){
  console.log(name);
  
  var container = document.createElement("div");
  container.id="boxes";

  var checkbox = document.createElement("input");
  checkbox.type="checkbox";
  checkbox.value = id;
  checkbox.onclick = calBoxClicked;

  var label = document.createElement("label");
  label.appendChild(document.createTextNode(name));

  container.appendChild(checkbox);
  container.appendChild(label);

  document.getElementById('content').appendChild(container);
}
function calBoxClicked(event){
  if(event.toElement.checked){
    checkCal(event);
  }
  else{
    uncheckCal(event);
  }
}
function checkCal(event){
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
      
      //get the busy times from the response
      var busyTimes = resp.calendars[cal_id].busy;

      //find the calendar that corresponds to this one in our array
      var cal_position = -1;
      for(var i=0; i<calendars.length; i++){
        if(calendars[i].id === cal_id){
          cal_position = i;
        }
      }

      var count = 0;
      for(var i=0; i<busyTimes.length; i++){
        var start_busy = new Date(busyTimes[i].start);
        var end_busy =  new Date(busyTimes[i].end);

        var minutes = (end_busy-start_busy)/(1000*60);
        
        for(var j=0; j<minutes; j+=30){
          var date = new Date(start_busy.toLocaleString());
          date.setTime(date.getTime() + j*60*1000);

          //save the busy times
          calendars[cal_position].busy[count] = date;
          count++;
        }
      }
      console.log(calendars[cal_position]);
      displayBusyTimes();
    }); //end the request
  }); //end the calendar load
}

function uncheckCal(event){
  var cal_id = event.toElement.value;

  var cal_position = -1;
      for(var i=0; i<calendars.length; i++){
        if(calendars[i].id === cal_id){
          for(var j=0; j<calendars[i].busy.length; j++){
            var element = document.getElementById(calendars[i].busy[j].toLocaleString());
            if(element != null){  
                element.className = element.className.replace("highlighted", "not_highlighted");
            }
          }

          calendars[i].busy = [];
          console.log("unchecked " + calendars[i].busy);
        }
      }

      displayBusyTimes();
}

function displayBusyTimes(){
  for(var i = 0; i<calendars.length; i++){
    for(var j=0; j<calendars[i].busy.length; j++){
      var element = document.getElementById(calendars[i].busy[j].toLocaleString());
          if(element != null){
            if(element.className.indexOf("not_highlighted") != -1){
              element.className = element.className.replace("not_highlighted", "highlighted");
            }
          }
    }
  }
}


function transferToGroup(){
  var individual = document.getElementById('calendar');
  var group = document.getElementById('group_calendar');

  var elements_indiv = individual.getElementsByTagName('td');
  var elements_group = group.getElementsByTagName('td');
  
  for(var i=0; i<elements_indiv.length; i++){
      elements_group[i].className =  elements_indiv[i].className;
  }

  showMeetingTimes();
  console.log("transferToGroup");

}

function replicate(event){
  var mwf = false;
  if(event.toElement.id==="mwf"){
    mwf=true;
  }
  var num_days = (end_date-start_date)/(1000*60*60*24);
  var day = start_date.getDay();
  var num_hours = end_time-start_time;

  for(var i=0; i<num_days; i++){
    if( ((day==1 || day==3 || day==5)&&mwf) || ((day==2 || day==4)&&!mwf) )
      break;
    day = (day+1)%7;
  }

  var busy_on_day = []

  var date = new Date(start_date.toDateString());
  date.setDate(date.getDate()+(day-start_date.getDay()));

  var elements = document.getElementById('calendar').getElementsByTagName('td');
  var count = 0;
  console.log(date.toLocaleDateString());
  for(var i=0; i<elements.length; i++){
    //console.log(elements)
    
    if(new Date(elements[i].id).toLocaleDateString() === date.toLocaleDateString()){
      console.log(elements[i].className);
      if(elements[i].className.indexOf("not_highlighted") == -1){
        busy_on_day[count++] = {time: new Date(elements[i].id).toLocaleTimeString(), busy: "highlighted"};
      }
      else{
        busy_on_day[count++] = {time: new Date(elements[i].id).toLocaleTimeString(), busy: "not_highlighted"};
      }
    }
  }

  console.log(busy_on_day);
   
   for(var i=0; i<elements.length; i++){
    var e_date = new Date(elements[i].id);
    if(  ((e_date.getDay() == 1 || e_date.getDay() == 3 || e_date.getDay() == 5) && mwf) || ((e_date.getDay() == 2 || e_date.getDay() == 4 ) && !mwf) ){
      if(elements[i].className.indexOf("not_highlighted") != -1){
        for(var j=0; j<busy_on_day.length; j++){
          if( e_date.toLocaleTimeString() === busy_on_day[j].time){
            elements[i].className = elements[i].className.replace("not_highlighted", busy_on_day[j].busy);
          }
        }
      }
      else{
        for(var j=0; j<busy_on_day.length; j++){
          if( e_date.toLocaleTimeString() === busy_on_day[j].time){
            elements[i].className = elements[i].className.replace("highlighted", busy_on_day[j].busy);
          }
        }
      }
    }
  }
}

function showOptions(){
  var container = document.getElementById("options");
  
  if(document.getElementById("options_table")!=null){
    container.removeChild(document.getElementById("options_table"));
  }
  
  var table = container.appendChild(document.createElement("table"));
  table.width="100%";
  table.border="0";
  table.cellspacing="0";
  table.cellpadding="0";
  table.id="options_table";
  container.appendChild(table);

  var row = document.createElement("tr");
  row.className="fltl";
  table.appendChild(row);
  
  

  var rep = document.createElement("td");
  rep.innerHTML = 'Replicate';
  row.appendChild(rep);

  rep.appendChild(document.createElement("br")).appendChild(document.createElement("br"));


  var box = rep.appendChild(document.createElement("input"));
  box.type="checkbox";
  box.id="mwf"
  box.onclick=replicate;

  var label = rep.appendChild(document.createElement("label"));
  label.innerHTML = "MWF";

  rep.appendChild(document.createElement("br"));

  box = rep.appendChild(document.createElement("input"));
  box.type="checkbox";
  box.id="tr"
  box.onclick=replicate;

  label = rep.appendChild(document.createElement("label"));
  label.innerHTML = "TR";


  rep.appendChild(document.createElement("hr"));
  
  var row = table.appendChild(document.createElement("tr"));
  row.className="fltl";
  
  var td = row.appendChild(document.createElement("td"))
  var div = td.appendChild(document.createElement("div"));
  div.id='content';

  var button = div.appendChild(document.createElement("input"));
  button.type="button";
  button.value="Find Google Calendars";
  button.onclick=handleAuthClick;

  td.appendChild(document.createElement("hr"));

  var row = table.appendChild(document.createElement("tr"));
  row.className="fltl";
  var div = row.appendChild(document.createElement("td")).appendChild(document.createElement("div"));
  div.id='emails';

  var who = div.appendChild(document.createElement("h4"));
  who.innerHTML = "Who's Invited?";

  var info = div.appendChild(document.createElement("h6"));
  info.innerHTML="Add group members via email"
  
  var text = div.appendChild(document.createElement("input"));
  text.type="text";
  text.id="email";

  var button = div.appendChild(document.createElement("input"));
  button.type="button";
  button.value="+";
  button.onclick=invite;


}

function invite(){
  var email = document.getElementById("email");
  var email_div = document.getElementById("emails");

  email_div.appendChild(document.createElement("br"));
  var line = document.createElement("label");
  line.innerHTML = email.value + " X ";

  email_div.appendChild(line);

}


function showMeetingTimes(){
  console.log("shown");
  var container = document.getElementById("options");

  if(document.getElementById("options_table")!=null){
    container.removeChild(document.getElementById("options_table"));
  }

  var table = container.appendChild(document.createElement("table"));
  table.id="options_table";


  table.appendChild(document.createElement("tr"))
       .appendChild(document.createElement("td")).innerHTML="Suggested Meeting Times";


  var meeting_times = ["Monday, April 8th, 10:00 am", "Wednesday, April 10th, 4:00 pm", "Thursday, April 11th, 3:00 pm"];
  
  for(var i=0; i<meeting_times.length; i++){
    
    var element = table.appendChild(document.createElement("tr"))
                       .appendChild(document.createElement("td"));
    
    var radio_button = element.appendChild(document.createElement("input"));
    radio_button.type="radio";
    radio_button.name= "meeting_times";
    radio_button.value= meeting_times[i];

    var label = element.appendChild(document.createElement("label"));
    label.innerHTML=meeting_times[i];
  }
table.appendChild(document.createElement("tr"))
       .appendChild(document.createElement("td")).innerHTML='&nbsp;';

table.appendChild(document.createElement("tr"))
       .appendChild(document.createElement("td")).innerHTML="Filter By Availability";

  var percentages = ["100%", "+75%", "+50%", "+25%"];
  for(var i=0; i<percentages.length; i++){
    
    var element = table.appendChild(document.createElement("tr"))
                       .appendChild(document.createElement("td"));
    
    var radio_button = element.appendChild(document.createElement("input"));
    radio_button.type="radio";
    radio_button.name= "percentages";
    radio_button.value= percentages[i];
    
    var label = element.appendChild(document.createElement("label"));
    label.innerHTML=percentages[i];
  }

}
