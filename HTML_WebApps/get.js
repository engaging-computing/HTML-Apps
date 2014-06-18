function submitter()
{
	var letter = document.getElementById("dataset_name").value;


	var response = $.ajax({ type: "GET",
							url: "http://isenseproject.org/api/v1/projects/",
							data: letter,
							async: false
							}).responseText;

/*
	var response = $.get(
		'http://isenseproject.org/api/v1/projects/',
		letter, 
		function(data)
		{
			//$('#rev').html(data);	
		},
		JSON
	);

	var obj = response['responseText'];
	
	rev.innerHTML = response['responseText'];
	console.log(response);
*/

	// Now that we have the response text from the server, we can show the user
	// a name of a project that matches what they typed. (Hopefully)
	rev.innerHTML = response;
	
	// DEBUG
	//rev.innerHTML = response;
	//console.log(response);

}
