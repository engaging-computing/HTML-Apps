var lat = 0, long = 0;

function submitter()
{
	// Make the URL links.
	var API_URL = 'http://isenseproject.org/api/v1/projects/556/jsonDataUpload';
	var USER_URL = 'http://isenseproject.org/projects/556';
	var USER_URL_TEXT = 'Click here to go to your project!';

	// Get current time - used for timestamp
	var currentTime = new Date();
	var timestamp = JSON.stringify(currentTime);

	// Get the data that the user entered
	var formData = [];
	formData.push(document.boathouse.tp.value);
	formData.push(document.boathouse.ph.value);
	formData.push(document.boathouse.o2.value);
	formData.push(document.boathouse.phos.value);
	var title = document.getElementById("dataset_name").value;

	// iSENSE
	var upload = {
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
	upload.title = [title] + " " + [timestamp];

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
