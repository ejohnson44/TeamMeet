var start_date;
var end_date;

var start_time;
var end_time;


function setDatesAndTimes(){
	start_date = $("#datepicker").datepicker("getDate");
	end_date = $("#datepicker2").datepicker("getDate"); 

	setStartTime();
	setEndTime();

	document.getElementById('transitionToCal').href = 'calendar.html?'+"startTime="+start_time+'&endTime='+end_time
		+ "&startDate="+start_date+'&endDate='+end_date;
	//console.log()
}

function setStartTime(){
	var timeElement = document.getElementById('startTime');
	var time = timeElement.options[timeElement.selectedIndex].text;
	time = parseInt(time.split(":")[0]);

	//console.log(document.getElementById("RadioGroup1_1").checked);
	if(document.getElementById("RadioGroup1_1").checked)
		time += 12;

	start_time = time;
	//console.log(start_time);
}

function setEndTime(){
	var timeElement = document.getElementById('endTime');
	var time = timeElement.options[timeElement.selectedIndex].text;
	time = parseInt(time.split(":")[0]);

	//console.log(document.getElementById("RadioGroup2_1").checked);
	if(document.getElementById("RadioGroup2_1").checked)
		time += 12;

	end_time = time;
	
}