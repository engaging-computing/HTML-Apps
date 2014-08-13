var email = null;
var password = null;
var contributor_key = null;
var PROJECT_ID = null;

var API_URL = null;
var USER_URL = null;
var USER_URL_TEXT = null;

function get_fields() {
	// Get information that the user entered.
	PROJECT_ID = document.getElementById("project_ID").value;

	console.log("Proj ID = " + PROJECT_ID);

	user_input.innerHTML = " ";

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
		for(i = 0; i < arrayLength; i++){
			// This array will push a bunch of HTML input type stuff to the HTML file.
			// &nbsp; -> insert tab

			// Get field ID
			obj = fields[i]
			id = obj["id"];
			$("#user_input").append("Field ID: " + id + "<br/>");

			// Get field Name
			obj = fields[i]
			name = obj["name"];
			$("#user_input").append("Field Name: " + name + "<br/>");

			// Get field Type
			obj = fields[i]
			type = obj["type"];
			$("#user_input").append("Field Type: " + type + "<br/>");

			// Get field Units
			obj = fields[i]
			unit = obj["unit"];
			$("#user_input").append("Field Unit: " + unit + "<br/><br/>");
		}

	}

}
