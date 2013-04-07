var start_date;
var end_date;

var start_time;
var end_time;

var weekdays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

//when the window loads, generate the calendar and get the information out of the url
$(window).load(function(){

  if(document.URL.indexOf('?')!=-1){
  	var timeInfo = document.URL.split('?')[1].split("&");
  	
  	start_time = parseInt(timeInfo[0].split("=")[1]);
  	end_time = parseInt(timeInfo[1].split("=")[1]);

    start_date_string = timeInfo[2].split("=")[1].replace(/%20/g, " ");
    end_date_string = timeInfo[3].split("=")[1].replace(/%20/g, " ");

    start_date = new Date(start_date_string);
    end_date = new Date(end_date_string);
    end_date.setHours(end_time);
  }
  else{
    start_date = new Date();
    end_date = new Date();
    end_date.setDate(end_date.getDate()+5);

    start_time = 9;
    end_time = 17;
  }





  generateCalendar('calendar');
  generateCalendar('group_calendar');

  showOptions();

});

function loadCalendars(){
	if(document.getElementById('calendar').getElementsByTagName('td').length == 0){
    	generateCalendar('calendar');
    	generateCalendar('group_calendar');
	}
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

  //make the day labels
  for(var i=0; i<=num_days; i++){
    var date = new Date(start_date.toDateString());
    date.setDate(start_date.getDate()+i);

    var table_entry = document.createElement('td');
    table_entry.className = 'day';
    table_entry.innerHTML = weekdays[date.getDay()] + " " +(date.getMonth()+1) + "/" + date.getDate();

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
    //loop for each day
    for(var j=0; j<=num_days; j++){
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
