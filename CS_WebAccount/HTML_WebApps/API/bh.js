function submitter() 
{
	// Get location - lat & long
	var location = document.getElementById("loc");
	var lat, long;
	
	if(navigator.gelocation) 
	{
		// We can get the location!
		navigator.geolocation.getCurrentPosition(successCallback,errorCallback,{timeout:10000});
		function successCallback() {
			lat = position.coords.latitude;
			long = position.coords.longitude;
			location.innerHTML = "Latitude: " + position.coords.latitude + 								 
							 "<br>Longitude: " + position.coords.longitude;
		}
	}
	else {
		function errorCallback() {
			// Location isn't available.
			location.innerHTML = "Geolocation is not supported by this browser.";
		}
	}
	
	console.log("Latitude is: " + lat);
	console.log("Longitude is: " + long);

	// Get current time - used for timestamp
	var currentTime = new Date();
	var timestamp = JSON.stringify(currentTime);

	// Get the data that the user entered
	var formData = [];
	formData.push(document.boathouse.tp.value);
	formData.push(document.boathouse.ph.value);
	formData.push(document.boathouse.o2.value);
	formData.push(document.boathouse.phos.value);
	var letter = document.getElementById("dataset_name").value;

	/*	PUT VARIABLES BETWEEN []S	*/
	
	// rSENSE
	var upload = {
		'email': 'j@j.j',
		'password': 'j',
		'title': [],
		'data':
	  	{
			'2308': [formData[0]],
			'2309': [formData[1]],
			'2310': [formData[2]],
			'2311': [formData[3]],
			'2500': [timestamp],
			'2501': [lat],
			'2502': [long]
	 	}
	}
	
	// Modify this title to be the dataset name
	upload.title = '' + [letter];
	
	// iSENSE
	var upload2 = {
		'email': 'j@j.j',
		'password': 'j',
		'title': [],
		'data':
	  	{
			'2640': [formData[0]],
			'2641': [formData[1]],
			'2642': [formData[2]],
			'2643': [formData[3]],
			'2685': [timestamp],
			'2687': [lat],
			'2688': [long]
	 	}
	}
	
	// Modify this title to be the dataset name
	upload2.title = '' + [letter];
	
	// Post to rSENSE-DEV
	$.post(
		'http://rsense-dev.cs.uml.edu/api/v1/projects/511/jsonDataUpload', 
		upload
	);

	// Post to iSENSEPROJECT
	$.post(
		'http://isenseproject.org/api/v1/projects/556/jsonDataUpload',
		upload2
	);
}
