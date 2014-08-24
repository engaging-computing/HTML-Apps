function submitter()
{
	/*	This grabs the field ID that the user entered.
		The URL is created for making the GET request to iSENSE.	*/
	var ID = document.getElementById("dataset_name").value;
	var URL = "http://isenseproject.org/api/v1/fields/"+ID;

	/*	This is an ajax request, which is how we can contact iSENSE to "GET" data
		about the given project.

		type: 	Must be either "POST" or "GET" for iSENSE - in this case it MUST be
				a "GET" request because we aren't posting anything to iSENSE.
		url: use the URL variable at the top. You could also hardcode this in.
		async: false, because we want to make a cross domain request.
		dataType: "JSON" because we are requesting the data in JSON format.
		.responseText: We want to store the response that the server gives us. 	*/
	var response = $.ajax(
	{ 	type: "GET",
		url: URL,
		async: false,
		dataType: "JSON"
	}).responseText;

	//console.log(response);	// Debugging

	/*	If the response text ends up being undefined, we weren't able to find
		anything about the field. IE it doesn't exist.			*/
	if(response === undefined)
	{
		rev.innerHTML = "That field ID could not be found!";
	}
	else{

		/* 	Now we should have some information about the field. This should let
			us parse the request and then store the information about the field. */
		var arg = JSON.parse(response);
		var array = [];
		array[0] = arg['name'];
		array[1] = arg['type'];
		array[2] = arg['unit'];
		array[3] = arg['restrictions'];

		/*	Here I display some of the information about the field.
			Note: there really isn't anymore information about fields other
			than what I have listed below. You can however use these fields to
			upload data to iSENSE.		*/
		rev.innerHTML = "Information about this field: " 	+
						"<br/>Name: " 			+ array[0] 	+
						"<br/>Type: " 			+ array[1] 	+
						"<br/>Unit: " 			+ array[2] 	+
						"<br/>Restrictions: " 	+ array[3];

		//console.log(arg);	// Debugging
	}
}
