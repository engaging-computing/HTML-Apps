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
