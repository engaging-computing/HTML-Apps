// Global variables for keeping track of what the user has selected.
var start_choice = 0, end_choice = 0;

// Set the start variable when the user clicks a button.
function start(choice) {
	start_choice = choice;
	START.innerHTML = start_choice;
	//console.log(start_choice); 	// DEBUGGING.
}

// Ending variable gets set here.
function end(choice) {
	end_choice = choice;
	END.innerHTML = end_choice;
	//console.log(end_choice);		// DEBUGGING
}

function submitter() 
{
	if(start_choice == 0 || end_choice == 0)
	{
		alert("ERROR - select a letter AND a number!");
		return;
	}
	
	// Make the URL links.
	var API_URL = 'http://isenseproject.org/api/v1/projects/598/jsonDataUpload';
	var USER_URL = 'http://isenseproject.org/projects/598';
	var USER_URL_TEXT = 'Click here to go to your project!';

	/* 	Get current time - used for making the title different 
		every time the user uploads data. 	*/
	var currentTime = new Date();
	var timestamp = JSON.stringify(currentTime);

	/*  In the future: allow different projects, contributor keys and username
		and passwords. 	*/
	
	// Data to be uploaded to iSENSE
	var upload = {
		'email': 'j@j.j',
		'password': 'j',
		'title': [],
		'data':
	  	{
	  		'2878': [end_choice],
	  		'2879': [start_choice]
	 	}
	}
	
	console.log(upload.data);
	
	// Modify the title to be either A, B or C
	upload.title = "Plinko " + [timestamp];
	
	if(confirm("Do you want to upload this data to iSENSE?")) {
		// Post to iSENSE
		$.post(API_URL, upload);
		
		// Add a link in the HTML file to the project they contributed to.
		The_URL.innerHTML = '<a href="'+ USER_URL +'">' + USER_URL_TEXT + '</a>';
	}
	else {
		The_URL.innerHTML = "Canceled!";
	}
}
