function POST_jsonDataUpload_Email()
{
	var API_URL;		// EX: 'http://isenseproject.org/api/v1/projects/556/jsonDataUpload';
	var USER_URL; 		// EX: 'http://isenseproject.org/projects/556';
	var USER_URL_TEXT;	// EX: 'Click here to go to your project!';
	
	var currentTime = new Date();
	var timestamp = JSON.stringify(currentTime);

	var    email;	// EX: a@a.a
	var password;	// EX: a
	var title;		// EX: Table A's Awesome Lab Data
	
	var upload = {
		'email': email,			
		'password': password,		
		'title': title,				 
		'data':						
	  	{							 			 
	  		// Fill in the fields for your project here.		 
	 	}
	}
	
	// POST the data to iSENSE
	if(confirm("Do you want to upload this data to iSENSE?")) {
		$.post(API_URL, upload);

		// Add a link in the HTML file to the project they contributed to.
		The_URL.innerHTML = '<p><a href="'+ USER_URL +'">' + USER_URL_TEXT + '</a></p>';
	}
	else {
		// Change the HTML to show that the user canceled the upload request.
		The_URL.innerHTML = "<br/>Canceled!<br/><br/>";
	}
}

function POST_jsonDataUpload_ContributorKey()
{
	var API_URL;		// EX: 'http://isenseproject.org/api/v1/projects/555/jsonDataUpload';
	var USER_URL;		// EX: 'http://isenseproject.org/projects/555';
	var USER_URL_TEXT	// EX: 'Click here to go to your project!';


	var currentTime = new Date();
	var timestamp = JSON.stringify(currentTime);

	var   key;		// EX: '12345';
	var  name;		// EX: 'WebApp';
	var title;		// EX: 'My awesome WebApp!'
	
	/* 	You probably want to use some JavaScript functions here, such as 
		document.getElementById("PUT ID HERE").value;
		This way you can get user input and then submit that data to iSENSE.
	*/

	var upload = {
		'title': title,
		'contribution_key': key,
		'contributor_name': name,
		'data':
	  	{
			'2639': [formData]
	 	}
	}

	// POST the data to iSENSE
	if(confirm("Do you want to upload this data to iSENSE?")) {
		var result = $.post(API_URL, upload);

		/*	This is quick check to see if the above POST command worked. */
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
		// Change the HTML to show that the user canceled the upload request.
		The_URL.innerHTML = "<p>Canceled!</p>";
	}
}
