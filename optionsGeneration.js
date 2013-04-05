
function showOptions(){
  var container = document.getElementById("options");
  
  if(document.getElementById("options_table")!=null){
    container.removeChild(document.getElementById("options_table"));
  }
  
  var table = container.appendChild(document.createElement("table"));
  //table.width="100%";
  table.border="0";
  table.cellspacing="0";
  table.cellpadding="0";
  table.id="options_table";
  table.align="center";
  container.appendChild(table);

  var row = document.createElement("tr");
  row.className="fltl";
  table.appendChild(row);
  
  

  var rep = document.createElement("td");
  rep.innerHTML = '<strong>Replicate</strong>';
  row.appendChild(rep);

  rep.appendChild(document.createElement("br"));


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
  button.value="Find My Google Calendars";
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
