function submitter()
{
	/*	This grabs the letter that the user entered.
		The URL is created for making the GET request to iSENSE.	*/
	var letter = document.getElementById("dataset_name").value;
	var URL = "http://isenseproject.org/api/v1/projects/?search="
							+letter+"&sort=updated_at&order=DESC";

	/*	This is an ajax request, which is how we can contact iSENSE to "GET" data
		about the given project.

		type: 	Must be either "POST" or "GET" for iSENSE - in this case it MUST be
				a "GET" request because we aren't posting anything to iSENSE.
		url: use the URL variable at the top. You could also hardcode this in.
		async: false, because we want to make a cross domain request.
		dataType: "JSON" because we are requesting the data in JSON format.
		.responseText: We want to store the response that the server gives us.		*/
	var response = $.ajax({ type: "GET",
							url: URL,
							async: false,
							dataType: "JSON"
							}).responseText;

	// Now that we have the response text from the server, we can show the user
	// a name of a project that matches what they typed. (Hopefully)
	var arg = JSON.parse(response);
	if(arg[0] != undefined)
	{
		var object = arg[0].name;
		rev.innerHTML = "The closest project I have to that name is: <br/>"+ object;
		console.log(arg[0]);
	}
	else{
		rev.innerHMML = "Sorry, couldn't find anything. :(";
	}
}