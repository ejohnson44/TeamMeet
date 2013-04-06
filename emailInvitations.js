// JavaScript Document
  var id = 0;
  function addEmail() {
	  emailToAdd = $('#emailToAdd').val();
	  if (emailToAdd !== '') {
		  emailList = $('#emailList');
		  emailList.append("<div id='email"+id+"'>" + emailToAdd + "<input type='button' value = 'x' onClick = 'removeEmail("+id+")'/></div>");
		  id = id + 1;
	  }
  };
  function removeEmail(idNum) {
	  var elem = document.getElementById("email"+(idNum));
	  elem.parentNode.removeChild(elem);
	  
  };
