function submitter()
{
	/*	This grabs the field ID that the user entered.
		The URL is created for making the GET request to iSENSE.	*/
	var ID = document.getElementById("dataset_name").value;
	var URL = "http://isenseproject.org/api/v1/fields/"+ID;

	/*	This is an ajax request, which is how we can contact iSENSE to "GET" data
		about the given project.
<<<<<<< HEAD
		
=======

>>>>>>> 87e882c5f54fb1ae5e1af16e2cada5687061d3af
		type: 	Must be either "POST" or "GET" for iSENSE - in this case it MUST be
				a "GET" request because we aren't posting anything to iSENSE.
		url: use the URL variable at the top. You could also hardcode this in.
		async: false, because we want to make a cross domain request.
		dataType: "JSON" because we are requesting the data in JSON format.		*/
	var response = $.ajax(
	{ 	type: "GET",
		url: URL,
		async: false,
		dataType: "JSON"
	}).responseText;	// Getting response text from this ajax request.
<<<<<<< HEAD
	
	//console.log(response);	// Debugging

	/*	If the response text ends up being undefined, we weren't able to find
		anything about the field. IE it doesn't exist.			*/ 
=======

	//console.log(response);	// Debugging

	/*	If the response text ends up being undefined, we weren't able to find
		anything about the field. IE it doesn't exist.			*/
>>>>>>> 87e882c5f54fb1ae5e1af16e2cada5687061d3af
	if(response === undefined)
	{
		rev.innerHTML = "That field ID could not be found!";
	}
	else{

<<<<<<< HEAD
		/* 	Now we should have some information about the field. This should let 
=======
		/* 	Now we should have some information about the field. This should let
>>>>>>> 87e882c5f54fb1ae5e1af16e2cada5687061d3af
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
<<<<<<< HEAD
		 
=======

>>>>>>> 87e882c5f54fb1ae5e1af16e2cada5687061d3af
		//console.log(arg);	// Debugging
	}
}
