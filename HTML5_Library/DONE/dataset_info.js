function submitter()
{
	/*
		This part gets the ID that the user entered.
		It also uses that ID to fill in a URL variable that we can use to
		contact iSENSE to get some information about the given project.
		
		Note: the USER_URL_TEXT is optional; I use it to show the link to the 
		project at the bottom of the HTML document.
	*/
	var ID = document.getElementById("dataset_name").value;
	var URL = "http://isenseproject.org/api/v1/projects/"+ID;
	var USER_URL_TEXT = "Click here to view project #" + ID + "!";
	
	/*
		This is an ajax request, which is how we can contact iSENSE to "GET" data
		about the given project.
		
		type: 	Must be either "POST" or "GET" for iSENSE - in this case it MUST be
				a "GET" request because we aren't posting anything to iSENSE.
		url: use the URL variable at the top. You could also hardcode this in.
		async: false, because we want to make a cross domain request.
		dataType: "JSON" because we are requesting the data in JSON format.
	*/
	var response = $.ajax({ type: "GET",
							url: URL,
							async: false,
							dataType: "JSON"
							}).responseText;
	console.log(response);	// This is for debugging purposes

	/*
		If the response text ends up being undefined, we weren't able to find
		anything about the project.
	*/ 
	if(response === undefined)
	{
		rev.innerHTML = "That project ID could not be found!";
	}
	else{

		/* 
			Now we should have some information about the project. This should
			let us parse the request and then store the information about the
			project.			
		*/
		var arg = JSON.parse(response);
		var array = [];
		array[0] = arg['name'];
		array[1] = arg['createdAt'];
		array[2] = arg['ownerName'];
		array[3] = arg['url'];

		/*
			Here I display some of the information about the project.
			
			Note: 	Use the output of the console.log(response) command to find
					out more information about a given project. There are other
					properties you can display to the user.
		*/
		rev.innerHTML = "Information about this project: <br/>Name: "+ array[0]
		+ "<br/>Created at: "+ array[1] + "<br/> Owner: "+ array[2]
		+ '<br/>URL: <a href="' + array[3] + '">' + USER_URL_TEXT + '</a>';

	}
}
