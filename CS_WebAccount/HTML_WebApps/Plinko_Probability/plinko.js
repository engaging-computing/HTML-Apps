var start, end;

// Detect when the user clicks on one of the buttons.
/*
$("#A").click(function(event){
	console.log("You clicked A!");
});
*/

$("button").click(function() {
	alert($(this).attr('A'));
});

function submitter() 
{
	// Make the URL links.
	var API_URL = 'http://isenseproject.org/api/v1/projects/556/jsonDataUpload';
	var USER_URL = 'http://isenseproject.org/projects/556';
	var USER_URL_TEXT = 'Click here to go to your project!';

	// Get current time - used for timestamp
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
	  		// Fix this.
	 	}
	}
	
	// Modify the title to be either A, B or C
	upload.title = "Plinko " + [timestamp];
	
	if(confirm("Do you want to upload this data to iSENSE?")) {
		// Post to iSENSE
		$.post(API_URL, upload);
		
		// Add a link in the HTML file to the project they contributed to.
		The_URL.innerHTML = '<br/><a href="'+ USER_URL +'">' + USER_URL_TEXT + '</a> <br/> <br/>';
	}
	else {
		The_URL.innerHTML = "<br/>Canceled!<br/><br/>";
	}
}
