// Variables for uploading to iSENSE
var upload;
var color;
var timestamp;
var user = "--";
var project_title = "Test";
var project_id = 567;
var contributor_key = 0;
var API_URL = 'www.google.com';		// In case the user tries to submit before clicking.
var USER_URL = 'www.google.com';
var USER_URL_TEXT = 'Click here to go to your project!';

// Google Maps API variables
var map = null;
var marker = null;
var lat = 0;
var long = 0;

// Creates the marker on the screen.
function createMarker(latlng) {

    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
	});

    return marker;
}

// Initializes the map.
function initialize_map() {
	var options = {
		zoom: 2,
		center: new google.maps.LatLng(20, 0),
		mapTypeControl: false,
		mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
		navigationControl: true,
		mapTypeId: google.maps.MapTypeId.HYBRID
	}

	map = new google.maps.Map(document.getElementById("map_canvas"), options);

	/* DOM listener using Google Maps JavaScript API. Whenever the user clicks:
		A marker is created.
		The GPS location of the click is recorded.
		The user is asked if they want to upload the data or cancel.
	*/
	google.maps.event.addListener(map, 'click',
	function(event) {

		// Removes old markers.
		if (marker) {
			marker.setMap(null);
			marker = null;
		}

		// Get Lat & Long from the mouse click.
		lat = event.latLng.lat();
  		long = event.latLng.lng();

  		// Change the HTML to show updates Lat & Long
  		GPS_LONG.innerHTML = long;
		GPS_LAT.innerHTML  = lat;

  		// Debugging.
  		//console.log("LAT: " + lat + " LONG: " + long);

		// Call the function that makes the marker.
		marker = createMarker(event.latLng);

		// Make the URL links.	- ALWAYS DOUBLE CHECK THESE... USER_URL WAS WRONG!
		if(project_id === 567)	{
			API_URL = 'http://isenseproject.org/api/v1/projects/567/jsonDataUpload';
			USER_URL = 'http://isenseproject.org/projects/567';
		}
		else {
			API_URL = 'http://isenseproject.org/api/v1/projects/' + project_id +'/jsonDataUpload';
			USER_URL = 'http://isenseproject.org/projects/' + project_id + '/';
		}

		// Get eye color that user selected.
		var c = document.getElementById("eye_color");
		color = c.options[c.selectedIndex].text;

		/* Get current time - used for timestamp &
		   also to make title different for each data set. */
		var currentTime = new Date();
		timestamp = JSON.stringify(currentTime);

		/* 	ADDED SUPPORT FOR OTHER PROJECT IDs. This means I will need to GET the
			field #s for lat, long and color!!	*/
		if(project_id == 567 ) {
			// Data to be uploaded to iSENSE
			upload = {
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
			// (This is where support for other Project IDs would be.)
		}

		// Just a test to see if I can get contributor key upload supported.
		if(contributor_key != 0) {
			// Contributor key upload
			upload = {
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

		// Modify the dataset name - use what the user gave us + a timestamp.
		upload.title = project_title + " " + timestamp;
	});

}

function upload_to_iSENSE() {

	// Post to iSENSE.
	var result = $.ajax({
		type: "POST",
		url: API_URL,
		data: upload,
		dataType: "html",
		success: function() {	// Makes a link to iSENSE for the user to see.
			RES.innerHTML = "Uploaded to iSENSE! " + '<a href="' +
						 	USER_URL + '">' + USER_URL_TEXT + '</a> <br/>';
			console.log("Success");
		},
		error:  function(xhr) {	// Should print an error message to the user.
			RES.innerHTML = "Failed to post to iSENSE! Error: " + xhr.responseText;
			//var resp = jQuery.parseJSON(textStatus);
			console.log("Failed. Response Text:\n" + xhr.responseText);
		}
	});


/*	// WORKING VERSION
	// Post to iSENSE
	var result = $.post(API_URL, upload)

	// If we were able to upload to iSENSE, then show them the URL to their project!
	result.done(function() {
		RES.innerHTML = "Uploaded to iSENSE! " + '<a href="' +
						 USER_URL + '">' + USER_URL_TEXT + '</a> <br/>';
		console.log("Success");
	});

	// If we failed to upload to iSENSE, show an error and why it failed.
	result.fail(function(textStatus) {
		RES.innerHTML = "Failed to post to iSENSE!";
		var resp = jQuery.parseJSON(textStatus);
		console.log("Failed. Response Text:\n" + resp);
	});
*/
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

	}
}
