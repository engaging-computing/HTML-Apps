function submitter() 
{
	// Make the URL links.
	var API_URL = 'http://isenseproject.org/api/v1/projects/556/jsonDataUpload';
	var USER_URL = 'http://isenseproject.org/projects/556';
	var USER_URL_TEXT = 'Click here to go to your project!';

	// Get current time - used for timestamp
	var currentTime = new Date();
	var timestamp = JSON.stringify(currentTime);
	
	// Get the variables that the user entered in the HTML portion of the app.
	var formData = [];

	formData.push(document.boathouse.tp.value);
	formData.push(document.boathouse.ph.value);
	formData.push(document.boathouse.o2.value);
	formData.push(document.boathouse.phos.value);
	
	// get the letter they entered. Make it easier to submit the other data.
	var letter = document.getElementById("table_val").value;
	var temp = formData[0];
	var ph = formData[1];
	var dox = formData[2];
	var phos = formData[3];

	/*  In the future: allow different projects, contributor keys and username
		and passwords. 	*/
	
	// Data to be uploaded to iSENSE
	var upload = {
		'email': 'j@j.j',
		'password': 'j',
		'title': [],
		'data':
	  	{
	  		'2685': [timestamp],
			// LAT AND LONG ARE NOT USED FOR THIS WEB APP.
			'2640': [temp],
			'2641': [ph],
			'2642': [dox],
			'2643': [phos]
	 	}
	}
	
	// Modify the title to be either A, B or C
	upload.title = "Table " + [letter] + " " + [timestamp];
	
	// Post to iSENSEPROJECT
	$.post(API_URL, upload);
	
	// Add a link in the HTML file to the project they contributed to.
	The_URL.innerHTML = '<br/> <a href="'+ USER_URL +'">' + USER_URL_TEXT + '</a> <br/> <br/>';
		
	//	$('#myResults').html(upload.formData);
	alert("Thanks for submitting your data!");
}
