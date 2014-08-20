function submitter()
{
	/*
		Here are all the various URLs that are used.
		API_URL => used in making the POST to iSENSE.
		(Check out the iSENSE API for more information.)

		USER_URL & USER_URL_TEXT => these are for the dynamic links.
		(Note the differences between the API_URL and the USER_URL!

		 /api/v1/projects/PROJECT ID/jsonDataUpload => is for the API
		 /projects/PROJECT ID =>	is for linking someone
		 							or yourself to the iSENSE website.)
	*/
	var API_URL = 'http://isenseproject.org/api/v1/projects/555/jsonDataUpload';
	var USER_URL = 'http://isenseproject.org/projects/555';
	var USER_URL_TEXT = 'Click here to go to your project!';

	/*
		Change this portion with your own contributor key.
		You can also customize the app so the user can put in a different key.
	*/
	var  key = '12345';
	var name = 'WebApp';

	/*
		This portion gets a timestamp by using the JavaScript new Data() function.
		Stringify the timestamp to get the correct format for iSENSE.
	*/
	var currentTime = new Date();
	var timestamp = JSON.stringify(currentTime);

	/*
		This portion grabs all the data that the user entered in the HTML.
		This is done using the document.getElementById function of JavaScript,
		which given an element (a button, selection, form, etc) and its ID, it
		can get the value of that element. It can also be used to change the element,
		or append stuff to the HTML document.
	*/
	var formData = document.getElementById("scores").value;
	var title = document.getElementById("dataset_name").value;

	/* 	I also usually add a timestamp to the title. This makes it easy to see
		when the data was submitted. It also prevents errors as no two datasets can
		have the exact same title.	*/
	title = title + ' ' + timestamp;

	/*
		This is the main data that will be uploaded to iSENSE.
		The right side must be in quotes, and set up as it is in order to do
		a post to the iSENSE dataset jsonDataUpload API. The iSENSE API
		documentation can be found at http://isenseproject.org/api/v1/docs

		This version uses contributor keys. This means you do NOT need to have
		an account on iSENSE to use this webapp. This works great for classes
		or events where making accounts can be time consuming.

		Note that should you hardcode in a title, key or name they MUST be in
		quotes like this:
		'title': 'my awesome title I hardcoded in'

		If you do not include quotes, you will get an error when trying to submit!
		(either syntax error or uncaught error or even an error when submitting
		to iSENSE.
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

	/*
		This part does the actual uploading to iSENSE.
		Note, the $.post() function is a jquery library. Make sure to include
		one in your HTML file. Google has one that can easily be included - see
		the HTML doc for more information.

		Also, the if/else isn't necessarily required by iSENSE. I used it to detect
		if the user wants to quit/disregard the current upload.
	*/
	// Side note - the confirm part is a JavaScript popup that just asks for "OK" or "Cancel".
	if(confirm("Do you want to upload this data to iSENSE?")) {

		/*
			The POST command. All that is required for iSENSE datasets is the API_URL,
			and the data, which should be formatted as outlined in the API docs.
			See the above upload variable for how to do so.
		*/
		var result = $.post(API_URL, upload);

		/*
			This is quick check to see if the above POST command worked. Because
			I saved the result of the POST command into a variable called 'result'
			I can just check the variable to see if the POST command went through
			or if it failed.
		*/
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
