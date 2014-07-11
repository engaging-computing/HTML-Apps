document.addEventListener("DOMContentLoaded", check_photo, false);

var zoom_num = 1.0;
var user = "--";
var project_title = "Test";
var project_id = 567;
var contributor_key = 0;
var API_URL;
var USER_URL;
var USER_URL_TEXT = 'Click here to go to your project!';

// Google Maps API variables
var map = null;
var marker = null;

var infowindow = new google.maps.InfoWindow(
{ 
	size: new google.maps.Size(150,50)
});


// A function to create the marker and set up the event window function 
function createMarker(latlng, name, html) {
    var contentString = html;
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        zIndex: Math.round(latlng.lat()*-100000)<<5
	});

    google.maps.event.addListener(marker, 'click', 
    function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker);
	});
        
    google.maps.event.trigger(marker, 'click');    
    return marker;
}

// Initialize the map.
function initialize() {
	var myOptions = {
		zoom: 2,
		center: new google.maps.LatLng(0, 0),
		mapTypeControl: true,
		mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
		navigationControl: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
 
	google.maps.event.addListener(map, 'click', 
	function() {
    	infowindow.close();
	});

	google.maps.event.addListener(map, 'click', 
	function(event) {
	
		//call function to create marker
		if (marker) {
			marker.setMap(null);
			marker = null;
		}
		marker = createMarker(event.latLng, "name", "<b>Location</b><br>"+event.latLng);
	});

}

function popup_user() {
	user = prompt("This is a work in progress. All it does ATM is change -- to whatever you type in this box.");
	
	if(user != "--")
	{
		document.getElementById("user_id").innerHTML = user;
	}
}

function popup_title() {
	var title = prompt("Please enter the title\nfor this submission: ");
	
	// If they didn't enter anything, "Test" will be the title.
	if(title != "Test")
	{
		project_title = title;
		
		// Change the HTML to show the title changed.
		document.getElementById("project_title").innerHTML = project_title;
	}
}

function popup_contributor() {
	var key = prompt("Please enter the contributor key that you want to use for this WebApp: ");
	
	// Only do the following if the user enters something!
	if(key != null)
	{
		contributor_key = key;
		
		// Change the HTML to show that the contributor key has been set.
		document.getElementById("contrib_key").innerHTML = contributor_key;
		
		// DEBUGGING
		//console.log(contributor_key);
		//console.log(key);
		//console.log(answer);
	}
}

function popup_projID() {
	// Prompt to get PROJECT ID from user
	var id = prompt("Please enter the project ID \nthat you want to use for this WebApp: ");

	// Only do the following if the user enters something!
	if(id != null)
	{
		project_id = id;
	
		// Update the HTML file to indicate the change.
		document.getElementById("project_num").innerHTML = project_id;
	
		// DEBUGGING
		//console.log(id);	
		//console.log(project_id);
		//console.log(answer);
	}
}

function check_photo()
{
	var canvas = document.getElementById("world");
	canvas.addEventListener("mousedown", getCoords, false);
}

function getCoords(event)
{	
	// Make the URL links.	- ALWAYS DOUBLE CHECK THESE... USER_URL WAS WRONG!
	if(project_id === 567)	{
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
	
	/* 	ADDED SUPPORT FOR OTHER PROJECT IDs. This means I will need to GET the 
		field #s for lat, long and color!!	*/
	if(project_id == 567 ) {
		// Data to be uploaded to iSENSE
		var upload = {
			'title': [],
			'email': 'j@j.j',
			'password': 'j',
			'data':
		  	{
				'2704': [lat],
				'2705': [long],
				'2706': [color]
		 	}
		}
	}
	else{
		// This part is tricky...
		
	}
	
	// Just a test to see if I can get contributor key upload supported.
	if(contributor_key != 0) {
		// Contributor key upload
		var upload = {
			'title': [],
			'contribution_key': [contributor_key],
			'contributor_name': 'Eye Color',
			'data':
		  	{
				'2704': [lat],
				'2705': [long],
				'2706': [color]
		 	}
		}
	}
	
	// Modify this title to be the dataset name
	upload.title = project_title + " " + timestamp;
	
	if(confirm("Do you want to upload this data to iSENSE?")) {
		// Post to iSENSE
		var result = $.post(API_URL, upload)
		
		// If we were able to upload to iSENSE, then show them the URL to their project!
		result.done(function() {
			RES.innerHTML = "Uploaded to iSENSE! " + '<a href="' + USER_URL + '">' + USER_URL_TEXT + '</a> <br/>';
			console.log("Success");
		});
		
		// If we failed to upload to iSENSE, show an error and why it failed.
		result.fail(function(textStatus) {
			RES.innerHTML = "Failed to post to iSENSE!";
			var resp = JSON.stringify(textStatus);
			console.log("Failed. Response Text:\n" + resp);
		});

	}
	else {
		// User canceled the upload.
		RES.innerHTML = "Canceled!";
	}
}
