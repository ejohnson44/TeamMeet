
function showOptions(){
  var container = document.getElementById("options");
  
  if(document.getElementById("options_table")!=null){
    container.removeChild(document.getElementById("options_table"));
  }
  
  //generate the table that holds everything in this section
  var table = container.appendChild(document.createElement("table"));
  table.border="0";
  table.cellspacing="0";
  table.cellpadding="0";
  table.id="options_table";
  table.align="center";
  container.appendChild(table);


  //make the row to hold everything for the replication
  var rep_row = document.createElement("tr");
  rep_row.className="fltl";
  table.appendChild(rep_row);
  
  

  //make the element to hold all of the replicate stuff
  var rep_element = document.createElement("td");
  rep_element.innerHTML = '<strong>Replicate</strong>';
  rep_row.appendChild(rep_element);

  rep_element.appendChild(document.createElement("br"));


  var box = rep_element.appendChild(document.createElement("input"));
  box.type="checkbox";
  box.id="mwf"
  box.onclick=replicate;

  var label = rep_element.appendChild(document.createElement("label"));
  label.innerHTML = "MWF";

  rep_element.appendChild(document.createElement("br"));

  box = rep_element.appendChild(document.createElement("input"));
  box.type="checkbox";
  box.id="tr"
  box.onclick=replicate;

  label = rep_element.appendChild(document.createElement("label"));
  label.innerHTML = "TR";


  rep_element.appendChild(document.createElement("hr"));
  
  var cal_row = table.appendChild(document.createElement("tr"));
  
  var cal_element = cal_row.appendChild(document.createElement("td"))
  var div = cal_element.appendChild(document.createElement("div"));
  div.id='content';

  var button = div.appendChild(document.createElement("input"));
  button.type="button";
  button.value="Find My Google Calendars";
  button.onclick=handleAuthClick;

  cal_element.appendChild(document.createElement("hr"));

  var email_row = table.appendChild(document.createElement("tr"));
  email_row.className="fltl";
  var div = email_row.appendChild(document.createElement("td")).appendChild(document.createElement("div"));
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
  line.innerHTML = email.value +  '&nbsp;' + '&nbsp;' + '&nbsp;' + " X ";

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
       .appendChild(document.createElement("td")).innerHTML="<strong>Suggested Meeting Times<strong>";


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
       .appendChild(document.createElement("td")).innerHTML="<strong>Filter By Availability</strong>";

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

  table.appendChild(document.createElement("tr"))
       .appendChild(document.createElement("td")).innerHTML='&nbsp;';
  
  table.appendChild(document.createElement("tr"))
       .appendChild(document.createElement("td")).innerHTML="<strong>1/4 Members Have Responded</strong>";

}
