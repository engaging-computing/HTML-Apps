var email = null;
var password = null;
var contributor_key = null;
var PROJECT_ID = null;

var API_URL = null;
var USER_URL = null;
var USER_URL_TEXT = null;

var timestamp = null;

function get_fields() {
	// Get information that the user entered.
	          email = document.getElementById("email").value;
	       password = document.getElementById("password").value;
	contributor_key = document.getElementById("contributor_key").value;
	     PROJECT_ID = document.getElementById("project_ID").value;

	console.log("Proj ID = " + PROJECT_ID);
	
	/* 	Now pull the fields off iSENSE.
		We will need to do a GET request.
		Use the "Projects" address - /api/v1/projects/XX
		which XX will be replaced by the project_ID variable we got.
	*/
	
	// Set the URLs needed for later.
	      API_URL = 'http://rsense-dev.cs.uml.edu/api/v1/projects/' + PROJECT_ID;
	     USER_URL = 'http://rsense-dev.cs.uml.edu/projects/' + PROJECT_ID;
	USER_URL_TEXT = 'Click here to go to your project!';
	
	console.log("API_URL = " + API_URL);
	
	// Make the GET request
	var response = $.ajax({ type: "GET",
							 url: API_URL,
						   async: false,
					    dataType: "JSON"
	}).responseText;
	
	console.log(response);
	
	if(response === undefined)
	{
		resp.innerHTML = "That Project ID could not be found!";
	}
	else{
		resp.innerHTML = "Found the Project ID, here are all the fields for it: <br/>";
		
		// Let's try printing all the fields to the HTML doc!

		var arg = JSON.parse(response);
		console.log(arg);
		
		var js_Obj = arg["fields"];
		var fields = [];
		var i = 0;
		
		// Console.log all the fields.
		for(var key in js_Obj) {
			fields[i] = js_Obj[key];
			console.log(fields[i]);
			i++;
		}
		
		console.log("---------------");
		
		// Now the fields array should have all the fields, contained within objects.
		// Test this:
		var arrayLength = fields.length;
		for(i = 0; i < arrayLength; i++) {
			console.log(fields[i]);
		}
		
		var id, name, type, unit, restrict;
		var obj;
		
		// Let's try to make our generic uploader...
		// This will display the field IDs, Names, etc.
		for(i = 0; i < arrayLength; i++){
			// This array will push a bunch of HTML input type stuff to the HTML file.
			// &nbsp; -> insert tab
			
			// Get field ID
			obj = fields[i]
			id = obj["id"];
//			$("#user_input").append("Field ID: " + id + "<br/>");
			
			// Get field Name
			obj = fields[i]
			name = obj["name"];
//			$("#user_input").append("Field Name: " + name + "<br/>");
			
			// Get field Type
			obj = fields[i]
			type = obj["type"];
//			$("#user_input").append("Field Type: " + type + "<br/>");
			
			// Get field Units
			obj = fields[i]
			unit = obj["unit"];
//			$("#user_input").append("Field Unit: " + unit + "<br/><br/>");
			
			if(type == 2 || type == 3) {
			// This will actually display the input part.
			$("#user_input").append(
			"<tr>" + 
				"<td align="+'right'+">"+name+": "+"</td"+
				"<td align=\'left\'>");
				
				// Here we need to see what type of input it is.
				switch(type) {
					case 2:
						$("#user_input").append("<input type=\'number\'" + 
										"id=\'uploader_input" + i + "\'>");
						break; 
					case 3:
						$("#user_input").append("<input type=\'text\'" + 
										"id=\'uploader_input" + i + "\'>");
						break;
				}
				
			$("#user_input").append(
				// Makes a unique id for each input box.
				"</td> </tr>");
			}
			
			/*
			<tr>
				<td align='right'>name: </td>
				<td align='left'> <input type="number" id="uploader_input1">
				</td>
			</tr><br/> 
			*/
			
			// Add TIMESTAMPs, Lat & Long (if HTML 5 Geolocation feels like working...)
			switch(type) {
				case 1:
					/* 	Get current time - used for making the title different 
						every time the user uploads data. 	*/
					var currentTime = new Date();
					timestamp = JSON.stringify(currentTime);
					
					break;
				case 4:
					// GET HTML 5 Geolocation to work!
					break;
				case 5:
					// Same as above.
					break;
			}
		}
		/*
		<input  type="number" name="Temperature" id='tp' 
								min="0" max="35" step=".5" value="5">
		*/
	}

}
// Some of this is probably needed.


	/* STUFF FROM THE FIELD SEARCHER API TEST CAN BE USED HERE */
	/*
	
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
	
	rev.innerHTML = "Information about this field: <br/>Name: "+ array[0] +
	 "<br/>Type: "+ array[1] + "<br/> Unit: "+ array[2] + 
	 "<br/>Restrictions: " + array[3];
	console.log(arg);
	}
	
	*/



//function submitter() 
//{
//	if(start_choice == 0 || end_choice == 0)
//	{
//		alert("ERROR - select a letter AND a number!");
//		return;
//	}
//	
//	// Make the URL links.




//	/*  In the future: allow different projects, contributor keys and username
//		and passwords. 	*/
//	
//	// Data to be uploaded to iSENSE
//	var upload = {
//		'email': 'j@j.j',
//		'password': 'j',
//		'title': [],
//		'data':
//	  	{
//	  		'2878': [end_choice],
//	  		'2879': [start_choice]
//	 	}
//	}
//	
//	// Modify the title to be either A, B or C
//	upload.title = "Plinko " + [timestamp];
//	
//	if(confirm("Do you want to upload this data to iSENSE?")) {
//		// Post to iSENSE
//		$.post(API_URL, upload);
//		
//		// Add a link in the HTML file to the project they contributed to.
//		The_URL.innerHTML = '<a href="'+ USER_URL +'">' + USER_URL_TEXT + '</a>';
//	}
//	else {
//		The_URL.innerHTML = "Canceled!";
//	}
//}
