function submitter()
{
	var ID = document.getElementById("dataset_name").value;
	var URL = "http://isenseproject.org/api/v1/fields/"+ID;

	var response = $.ajax(
	{ 	type: "GET",
		url: URL,
		async: false,
		dataType: "JSON"
	}).responseText;	// Getting response text from this ajax request.
	
	console.log(response);

	if(response === undefined)
	{
		rev.innerHTML = "That field ID could not be found!";
	}
	else{

	// Now we should have some information about the project.
	var arg = JSON.parse(response);
	var array = [];
	array[0] = arg['name'];
	array[1] = arg['type'];
	array[2] = arg['unit'];
	array[3] = arg['restrictions'];

	rev.innerHTML = "Information about this field: " 
	+ "<br/>Name: " + array[0] 
	+ "<br/>Type: " + array[1] 
	+ "<br/>Unit: " + array[2] 
	+ "<br/>Restrictions: " + array[3];
	 
	console.log(arg);
	}
}
