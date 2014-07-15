function submitter() 
{
	// Get the data that the user entered
	var formData = document.getElementById("scores").value;
	var letter = document.getElementById("dataset_name").value;
	var URL = 'http://isenseproject.org/api/v1/projects/555/jsonDataUpload';
	/*	PUT VARIABLES BETWEEN []S	*/
	
	// Data to be uploaded
	var upload = {
		'title': [],
		'contribution_key': '12345',
		'contributor_name': 'WebApp',
		'data':
	  	{
			'2639': [formData]
	 	}
	}
	
	// Modify this title to be the dataset name
	upload.title = '' + [letter];

	// Post to iSENSEPROJECT V1 - Works.
	var result = $.post(
		'http://isenseproject.org/api/v1/projects/555/jsonDataUpload',
		upload
	); 
	
	result.done(function(){
		rev.innerHTML = "Posted successfully!";
	});
	
	result.fail(function(){
		rev.innerHTML = "FAILED TO POST TO PROJECT!";
	});

/*  This part doesn't work. Was trying to display the final URL of the dataset.
	Something must be wrong with my code.

	var result = $.ajax({
		type: "POST",
		url: URL,
		async: false,
		data: upload,
		dataType: "JSON"
	}).resultText;
	
	if(result === undefined)
	{
		rev.innerHTML = "FAILED TO POST TO PROJECT!";
	}
	else{
		rev.innerHTML = "Posted successfully!";
	}
	
	console.log(result);
*/
	
}
