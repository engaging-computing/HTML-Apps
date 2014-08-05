function submitter() 
{
	// Make the URL links.
	var API_URL = 'http://isenseproject.org/api/v1/projects/555/jsonDataUpload';
	var USER_URL = 'http://isenseproject.org/projects/556';
	var USER_URL_TEXT = 'Click here to go to your project!';
	
	// Get the data that the user entered
	var formData = document.getElementById("scores").value;
	var title = document.getElementById("dataset_name").value;
	
	// Get current time - used for timestamp
	var currentTime = new Date();
	var timestamp = JSON.stringify(currentTime);
		
	// Data to be uploaded
	var upload = {
		'title': [],
		'contribution_key': '12345',
		'contributor_name': 'WebApp',
		'data':
	  	{
			'2639': [formData]
	 	}
	}
	
	// Modify this title to be the dataset name
	upload.title = [title] + ' ' + [timestamp];
	
	// Post to iSENSEPROJECT V1 - Works.
	if(confirm("Do you want to upload this data to iSENSE?")) {
		// Post to iSENSE
		var result = $.post(API_URL, upload);
		
		if(result.done) {
			rev.innerHTML = "<p>Successfully posted to iSENSE!</p>";
		}
		else if(result.fail) {
			rev.innerHTML = "<p>Failed to post to iSENSE!</p>";
		}
		
		// Add a link in the HTML file to the project they contributed to.
		The_URL.innerHTML = '<p><a href="'+ USER_URL +'">' + USER_URL_TEXT + '</a></p>';
	}
	else {
		The_URL.innerHTML = "<p>Canceled!</p>";
	}
}
