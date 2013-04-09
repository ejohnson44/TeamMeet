

var email_list = [];

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
  var email_div = email_row.appendChild(document.createElement("td")).appendChild(document.createElement("div"));
  email_div.id='emails';

  var who = email_div.appendChild(document.createElement("h4"));
  who.innerHTML = "Who's Invited?";

  var info = email_div.appendChild(document.createElement("h6"));
  info.innerHTML="Add group members via email"
  
  var text = email_div.appendChild(document.createElement("input"));
  text.type="text";
  text.id="email";
  text.addEventListener("keydown", function(e) {
    // Enter is pressed
    if (e.keyCode == 13) { 
		  invite(); 
      text.value = "";
	  }
  });
  
  var button = email_div.appendChild(document.createElement("input"));
  button.type="button";
  button.value="+";
  button.onclick=invite;

  for(var i=0; i<email_list.length; i++){
    if(email_list[i] != null){
      var line = document.createElement("div");
      line.id = "email"+i;
      line.innerHTML = email_list[i] + "<input type='button' value = 'x' onClick = 'uninvite("+i+")'/>";
      email_div.appendChild(line);
    }
  }

}


function invite(){
  var email = document.getElementById("email");
  var email_div = document.getElementById("emails");
  if (email.value !== '') {
	  var line = document.createElement("div");
	  line.id = "email"+email_list.length;
	  line.innerHTML = email.value + "<input type='button' value = 'x' onClick = 'uninvite("+email_list.length+")'/>";
	  email_div.appendChild(line);
	  email_list[email_list.length] = email.value;
	}

}
function uninvite(idNum) {
	  var elem = document.getElementById("email"+(idNum));
	  elem.parentNode.removeChild(elem);
    email_list[idNum] = null;
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

  var button_data = table.appendChild(document.createElement("tr"))
       .appendChild(document.createElement("td"));
  var button = button_data.appendChild(document.createElement("input"));
  button.type="button";
  button.value="Send Meeting Choice to Group";
  
  
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
