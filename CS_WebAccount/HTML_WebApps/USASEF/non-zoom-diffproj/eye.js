document.addEventListener("DOMContentLoaded", check_photo, false);

var project_id = 0, contributor_key = 0;
var reply;
var API_URL;
var USER_URL;
	
function pop_up_contributor() {
	var answer = prompt("Please enter the contributor key\nthat you want to use for this WebApp: ");
	
	// Only do the following if the user enters something!
	if(answer != null)
	{
		change_contributor_key(answer);
		//console.log(answer);	// DEBUGGING
	}
}

function change_contributor_key(key) {
	contributor_key = key;
	
	// Change the HTML to show that the contributor key has been set.
	document.getElementById("contrib_key").innerHTML = contributor_key;
	
	// DEBUGGING
	//console.log(contributor_key);
	//console.log(key);
}

function pop_up() {
	// Prompt to get PROJECT ID from user
	var answer = prompt("Please enter the project ID \nthat you want to use for this WebApp: ");

	// Only do the following if the user enters something!
	if(answer != null)
	{
		change_project_id(answer);
		//console.log(answer);	// DEBUGGING
	}
}

function change_project_id(id) {
	project_id = id;
	
	// Update the HTML file to indicate the change.
	document.getElementById("project_num").innerHTML = project_id;
	
	// DEBUGGING
	//console.log(id);	
	//console.log(project_id);
}

function check_photo()
{
	var canvas = document.getElementById("world");
	canvas.addEventListener("mousedown", getCoords, false);
}

function getCoords(event)
{
	var USER_URL_TEXT = 'Click here to go to your project!';
	
	// Make the URL links.	- ALWAYS DOUBLE CHECK THESE... USER_URL WAS WRONG!
	if(project_id == 0)	{
		API_URL = 'http://isenseproject.org/api/v1/projects/567/jsonDataUpload';
		USER_URL = 'http://isenseproject.org/projects/567';
	}
	else {
		API_URL = 'http://isenseproject.org/api/v1/projects/' + project_id +'/jsonDataUpload';
		USER_URL = 'http://isenseproject.org/projects/' + project_id + '/';
	}	

	var canvas = document.getElementById("world");
	
	/*  Get x & y coordinates. NOTE: the numbers 500 and 249 are to center
		the x & y coordinates on the center of the map. I also change the sign
		of the y coordinate for converting it to lat and long.	*/
	var x = (event.x - canvas.offsetLeft) - 500;
	var y = (event.y - canvas.offsetTop)  - 249;
	y = y * -1;
	
	// Update the HTML file.
	coord_x.innerHTML = x;
	coord_y.innerHTML = y;
	
	/*	Convert x & y to Lat & Long
		Long = (360 / Map Width)  * X
		Lat  = (180 / Map Height) * Y		*/
	var long = (360 / 1000) * x;
	var lat  = (180 /  500) * y; 
	
	// Round the lat & long
	var long_round, lat_round;
	long_round = long.toFixed(2);
	 lat_round = lat.toFixed(2);
	
	// Update HTML page to show current Lat/Long
	GPS_LONG.innerHTML = long_round;
	GPS_LAT.innerHTML  = lat_round;
	
	// Get eye color that user selected.
	var c = document.getElementById("eye_color");
	var color = c.options[c.selectedIndex].text;
	
	/* Get current time - used for timestamp & 
	   also to make title different for each data set. */
	var currentTime = new Date();
	var timestamp = JSON.stringify(currentTime);
	
	// Data to be uploaded to iSENSE
	var upload = {
		'email': 'j@j.j',
		'password': 'j',
		'title': [],
		'data':
	  	{
			'2704': [lat],
			'2705': [long],
			'2706': [color]
	 	}
	}
	
	// Modify this title to be the dataset name
	upload.title = 'Test ' + timestamp;
	
	if(confirm("Do you want to upload this data to iSENSE?")) {
		// Post to iSENSE
		var result = $.post(API_URL, upload)
		
		// Add a link in the HTML file to the project they contributed to.
		if(result.done) {
			reply = "Uploaded to iSENSE <br/><br/>" + '<a href="' + USER_URL + '">' + USER_URL_TEXT + '</a> <br/>';
			console.log("Success");
		}
		else if(result.fail) {
			reply = "Failed to post to iSENSE!";
			console.log("Failed");
		}
	}
	else {
		reply = "Canceled!";
	}
	
	RES.innerHTML = reply;
}
