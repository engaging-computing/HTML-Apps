var email = null;
var password = null;

var project_title = "Test";
var project_id = 593;			// RESET THESE TO 0 & NULL.
var contributor_key = "MIT";

var API_URL = null;
var POST_URL = null;
var USER_URL = null;
var USER_URL_TEXT = null;

var fields = [];
var field_id = [];		// Contains all the FIELD IDs for uploading to iSENSE.
var proj_data = [];			// Contains all the DATA to be uploaded to iSENSE.
var arrayLength = 0;
var timestamp = null;

function get_fields() {
	console.log("Proj ID = " + project_id);
	
	/* 	
		Now pull the fields off iSENSE.
		We will need to do a GET request.
		Use the "Projects" address - /api/v1/projects/XX
		which XX will be replaced by the project_id variable we got.
	*/
	
	// Set the URLs needed for later.
	      API_URL = 'http://rsense-dev.cs.uml.edu/api/v1/projects/' + project_id;
	     POST_URL = 'http://rsense-dev.cs.uml.edu/api/v1/projects/' + project_id + '/jsonDataUpload';
	     USER_URL = 'http://rsense-dev.cs.uml.edu/projects/' + project_id;
	USER_URL_TEXT = 'Click here to go to your project!';
	
	console.log("API_URL = " + API_URL);
	
	// Make the GET request
	var response = $.ajax({ type: "GET",
							 url: API_URL,
						   async: false,
					    dataType: "JSON"
	}).responseText;
	
	// debugging.
	console.log(response);
	
	if(response === undefined)
	{
		resp.innerHTML = "That Project ID could not be found!";
		
		// This warns the user when they don't bother entering a project ID.
		if(project_id === 0) {
			resp.innerHTML = "You haven't entered a PROJECT ID yet! :(";
		}
	}
	else{
		resp.innerHTML = "Found the Project ID. Enter data for the following fields: <br/>";
		
		// Let's try printing all the fields to the HTML doc!

		var arg = JSON.parse(response);
		console.log(arg);
		
		var js_Obj = arg["fields"];
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
		arrayLength = fields.length;
		for(i = 0; i < arrayLength; i++) {
			console.log(fields[i]);
		}
		
		var id, name, type, unit, restrict;
		var obj;
		
		// Let's try to make our generic uploader...
		// This will display the field IDs, Names, etc.
		for(i = 0; i < arrayLength; i++) {
			// This array will push a bunch of HTML input type stuff to the HTML file.

			// Get field ID
			obj = fields[i]
			id = obj["id"];
			field_id[i] = obj["id"];
			
			// Get field Name
			obj = fields[i]
			name = obj["name"];
			
			// Get field Type
			obj = fields[i]
			type = obj["type"];
			
			// Get field Units
			obj = fields[i]
			unit = obj["unit"];
				
			// Add TIMESTAMPs, Lat & Long (if HTML 5 Geolocation feels like working...)
			switch(type) {
				case 1:
					/* 	Get current time - used for making the title different 
						every time the user uploads data. 	*/
					var currentTime = new Date();
					timestamp = JSON.stringify(currentTime);
					proj_data[i] = timestamp;
					break;
					
				case 2:
					$("#user_input").append("<tr><td align=\'right\'>" + name + ": </td" +
									"<td align=\'left\'><input type=\'number\'" + 
									"id=\'uploader_input" + i + "\'></td></tr>");
					proj_data[i] = "uploader_input" + i;
					break; 	
					
				case 3:
					$("#user_input").append("<tr><td align=\'right\'>" + name + ": </td" +
									"<td align=\'left\'><input type=\'text\'" + 
									"id=\'uploader_input" + i + "\'></td></tr>");
					proj_data[i] = "uploader_input" + i;
					break;	
					
				case 4:
					// GET HTML 5 Geolocation to work! For now it says 0, 0...
					proj_data[i] = 0;
					break;
					
				case 5:
					// Same as above.
					proj_data[i] = 0;
					break;
			}
			
			// Now update the "Pull information" button to a "Submit to rSENSE" button
			change_me.innerHTML = "<button id=\"rSENSE\" onclick=\"submitter()\">" +
				"Click here to submit to rSENSE" + "</button>";
		}
	}

}
// Some of this is probably needed.

function submitter() 
{
	// Data to be uploaded to iSENSE
	var upload;
	var jsonData = {};
	
	// Set up the data array.
	for(var i = 0; i < arrayLength; i++) {
		if(proj_data[i] === "uploader_input" + i) {
			proj_data[i] = document.getElementById("uploader_input"+i).value;
	}
}
	// Need to add email support.
	
//	if(email != null && password != null) {
//		// Use contributor key
//		upload = {
//			'email': email,
//			'password': password,
//			'title': [],
//			'data': {}
//		}
//	}

	if(contributor_key != null) {
		// Use email/password
		upload = {
			'contribution_key': contributor_key,
			'contributor_name': "HTML5 WEBAPP",
			'title': [],
			'data': {}
		}		
	}
	
	// If everything is null, we've got a problem...
	if(email === null && password === null && contributor_key === null) {
		The_URL.innerHTML = "Please enter either an EMAIL/PASSWORD or a CONTRIBUTOR KEY.";
		return;
	}
	
	// This needs to be figured out.
	
//	if( (email === null || password === null) || contributor_key != null) {
//		The_URL.innerHTML = "You need to enter BOTH an email & a password.";
//		console.log("the key is: " + contributor_key);
//		return;
//	}
	
	// Modify the title to be w/e the user entered.
	upload.title = [project_title] + " " + [timestamp];
	
//  This kinda worked.
//	upload.data[field_id] = proj_data;
	
	// Modify the data variable to actually contain the field IDs and the data.
	for(var i = 0; i < arrayLength; i++) {
		upload.data[field_id[i]] = [proj_data[i]];	// REMEMBER BRACKETS.
		console.log(upload.data[field_id[i]]);
	}
	console.log(upload.data);
	
	if(confirm("Do you want to upload this data to iSENSE?")) {
		// Post to iSENSE
		console.log(JSON.stringify(upload));
		$.post(POST_URL, upload);
		
		// Add a link in the HTML file to the project they contributed to.
		The_URL.innerHTML = '<a href="'+ USER_URL +'">' + USER_URL_TEXT + '</a>';
		
		// Should add support for error codes in case it doesn't submit correctly.
	}
	else {
		The_URL.innerHTML = "Canceled!";
	}
	
	
	/******** The following is some debugging stuff. **********/
	//// Making sure that field IDs are correct.
	//console.log("FIELDS: ");
	//for(var i = 0; i < arrayLength; i++) {
	//	console.log(field_id[i]);		
	//	
	//}

	//// Making sure input is correct.
	//console.log("DATA: ");
	//for(var i = 0; i < arrayLength; i++) {
	//	console.log(data[i]);
	//}
}

function popup_user() {
	user_prompt.innerHTML = "<br/> <th align=\"right\">Enter an email: </th>" + 
	"<th align=\"left\"><input type=\"letter\" name=\"table\" id=\"email\"></th>";
	
	password_prompt.innerHTML = "<th align=\"right\">Enter a password: </th>" +
	"<th align=\"left\"><input type=\"password\" name=\"table\" id=\"password\"></th>"
	
	submit_user.innerHTML = "<button id=\"rSENSE\" onClick=\"change_User()\">" +
							"Click here to submit email/password</button> <br/><br/>";
}

function change_User() {
	   email = document.getElementById("email").value;
	password = document.getElementById("password").value;

	if(email != null && password != null)
	{
		document.getElementById("user_id").innerHTML = email;
		document.getElementById("user_prompt").innerHTML = " ";
		document.getElementById("password_prompt").innerHTML = " ";
		document.getElementById("submit_user").innerHTML = " ";
	}
}

function popup_title() {
	var title = prompt("Please enter the title\nfor this submission: ");
	
	// If they didn't enter anything, "Test" will be the title.
	if(title != "Test")
	{
		project_title = title;
		
		// Change the HTML to show the title changed.
		document.getElementById("project_title").innerHTML = project_title;
	}
}

function popup_contributor() {
	var key = prompt("Please enter the contributor key that you want to use for this WebApp: ");
	
	// Only do the following if the user enters something!
	if(key != null)
	{
		contributor_key = key;
		
		// Change the HTML to show that the contributor key has been set.
		document.getElementById("contrib_key").innerHTML = contributor_key;
	}
}

function popup_projID() {
	// Prompt to get PROJECT ID from user
	var id = prompt("Please enter the project ID \nthat you want to use for this WebApp: ");

	// Only do the following if the user enters something!
	if(id != null)
	{
		project_id = id;
	
		// Update the HTML file to indicate the change.
		document.getElementById("project_num").innerHTML = project_id;
	
	}
}
