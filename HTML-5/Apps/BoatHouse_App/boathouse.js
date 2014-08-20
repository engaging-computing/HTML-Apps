function submitter()
{
	/*
		Here are all the various URLs that are used.
		API_URL => used in making the POST to iSENSE.
		(Check out the iSENSE API for more information.)

		USER_URL & USER_URL_TEXT => these are for the dynamic links.
		(Note the differences between the API_URL and the USER_URL!
		 /api/v1/projects/PROJECT ID/jsonDataUpload is for the API
		 /projects/PROJECT ID is for linking someone or yourself to the iSENSE
		 																website.)
	*/
	var API_URL = 'http://isenseproject.org/api/v1/projects/556/jsonDataUpload';
	var USER_URL = 'http://isenseproject.org/projects/556';
	var USER_URL_TEXT = 'Click here to go to your project!';

	/*
		Change this portion with your own email & password.
		You can also customize the app so the user can put their own
		email and password.
	*/
	var    email = 'j@j.j';
	var password = 'j';

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
	var letter = document.getElementById("table_val").value;
	var temp = document.getElementById("tp").value;
	var ph = document.getElementById("ph").value;
	var dox = document.getElementById("o2").value;
	var phos = document.getElementById("phos").value;

	// Console.log sometimes helps to find bugs!
	console.log(letter + temp + ph + dox + phos);

	/*
		This is the main data that will be uploaded to iSENSE.
		The right side must be in quotes, and set up as it is in order to do
		a post to the iSENSE dataset jsonDataUpload API. The iSENSE API
		documentation can be found at http://isenseproject.org/api/v1/docs

		Email, Password, Title and data are all
		Required. Email/Password/Title must be strings.
		To use variables instead of text, put the variables name where the text
		would be.
		Note: brackets are required for the FIELDS. You can also put empty brackets
		if you will be doing a complex title, like I did for the title. Empty
		brackets as in [].
		(	For the title, I could have also just used a variable like the email
			and password.)

		If you want to hardcode the email or any other variable, put the text
		in quotes like so:
		'generic_email@gmail.com'
		The full line would look like this:
		'email': 'generic_email@gmail.com'
		You could also just set the email variable to generic_email@gmail.com.
	*/

	var upload = {
		'email': email,
		'password': password,
		'title': [],
		'data':
	  	{
	  		'2685': [timestamp],
			'2640': [temp],
			'2641': [ph],
			'2642': [dox],
			'2643': [phos]
	 	}
	}
	/*
		One other note about fields - they are UNIQUE to each project ID.
		If you decide to make your own project, you WILL need to change these
		fields - that is, the field IDs, which are the numbers in quotes on the
		left hand side. To find the field IDs for your project, you can go
		to the folllowing address, making sure to replace "--PROJECT ID--"
		with your own project ID:
		http://isenseproject.org/api/v1/projects/--PROJECT ID--/

		The field IDs are listed at the end. An example of one field ID from
		project 556 is this:

		{"id":2685,"name":"Timestamp","type":1,"unit":null,"restrictions":null}
	*/

	/*
		This portion modifies the title to include the letter of the table,
		and a timestamp in the title to 'randomize' the title. This is because
		iSENSE datasets cannot have the exact same title. If you attempt to hard
		code in a title, such as "table" and then try to upload a dataset several
		times with "table" as the title, you WILL get an error from the iSENSE API.
		Most likely:
	*/
	upload.title = "Table " + [letter] + " " + [timestamp];

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
		$.post(API_URL, upload);

		// Add a link in the HTML file to the project they contributed to.
		The_URL.innerHTML = '<p><a href="'+ USER_URL +'">' + USER_URL_TEXT + '</a></p>';
	}
	else {
		// Change the HTML to show that the user canceled the upload request.
		The_URL.innerHTML = "<br/>Canceled!<br/><br/>";
	}
}
