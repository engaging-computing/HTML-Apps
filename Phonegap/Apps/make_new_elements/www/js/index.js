	var project_id_from_user;
	var email_from_user;
	var password_from_user;
	var latitude_for_post;
	var longitude_for_post;
	var currentTime = new Date();
	var timestamp = JSON.stringify(currentTime);
	var URL;
	var response;
	var arg;
	var j = 0;
	var i = 0;
	var m = 0;
	var number_of_fields;
	var field_number;
	var field_id;
	var keys = [];

jQuery(document).ready(function(){
	$("#post").hide();
});

jQuery(document).ready(function(){
	$("#geolocation").hide();
});

function post(){

		var values = {};
		var id = arg.fields[i].id;
		var email = email_from_user;
		var password = password_from_user;
		var data = {};
		var key1 = id;
		var text = [];
		var k = 0;
		var l = 0;


		number_of_fields_post_1 = number_of_fields;
		number_of_fields_post_2 = number_of_fields;

		if(arg.fields[number_of_fields-1].type === 5)
		{
			number_of_fields_post_1 = number_of_fields_post_1 - 2;

		}

		if(arg.fields[m].type === 1)
		{
			text.push(timestamp);
			k++;
			number_of_fields_post_1--;
		}

		while(number_of_fields_post_1 > 0)
		{
			text.push($('#'+keys[k]).val());
			number_of_fields_post_1--;
			k++;
		}

		if(arg.fields[number_of_fields-1].type === 5)
		{
			text.push(latitude_for_post);
			text.push(longitude_for_post);
		}

		console.log(text);

		while(number_of_fields_post_2)
		{
			data[keys[l]] = [text[l]];
			l++;
			number_of_fields_post_2--;
		}

		currentTime = new Date();
		timestamp = JSON.stringify(currentTime);
		console.log(data);
		var upload = {
				'email': email,
				'password': password,
				'title': ''+timestamp,
				'data': data
		}

		$.post('http://rsense-dev.cs.uml.edu/api/v1/projects/'+project_id_from_user+'/jsonDataUpload',upload);

		alert("Successfully Posted");

		//$("input:text").val("");
}

function get(number_of_fields){

	$("#divID").hide();
	$("#Project_ID").hide();
	$("#user_email_div").hide();
	$("#user_email").hide();
	$("#user_password_div").hide();
	$("#user_password").hide();

	number_of_fields_if = number_of_fields;

	onDeviceReady();

	if(arg.fields[m].type === 1)
	{
		keys.push(arg.fields[j].id);
		number_of_fields--;
		j++;
	}

	while(number_of_fields > 0)
	{
		number_of_fields--;

		keys.push(arg.fields[j].id);               //Adding field numbers to keys

		field_number = arg.fields[j].name;         //Changing to next field_number

		$("p").append('<div id="field'+keys[j]+'">'+field_number+'</div>');  //Creating new div with field_number
		$("p").append('<input type="text" id="'+keys[j]+'" name="field">');   // Creating new text box for that field number

		j++;
	}
	if(arg.fields[number_of_fields_if-1].type === 5)
	{
		$('#field'+keys[number_of_fields_if-1]).hide();
		$('#field'+keys[number_of_fields_if-2]).hide();
		$('#'+keys[number_of_fields_if-2]).hide();
		$('#'+keys[number_of_fields_if-1]).hide();
	}



	$("#create").hide();
	$("#post").show();
};

function refresh(){
	history.go(0);
}




function onDeviceReady() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}



function onSuccess(position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                        'Longitude: '          + position.coords.longitude             + '<br />' +
                        'Altitude: '           + position.coords.altitude              + '<br />' +
                        'Accuracy: '           + position.coords.accuracy              + '<br />' +
                        'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                        'Heading: '            + position.coords.heading               + '<br />' +
                        'Speed: '              + position.coords.speed                 + '<br />' +
                        'Timestamp: '          +                                   position.timestamp          + '<br />';
   	latitude_for_post = position.coords.latitude;
   	longitude_for_post = position.coords.longitude;
}


function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

function ID_from_user(){



	project_id_from_user = $("#Project_ID").val();
	email_from_user = $("#user_email").val();
	password_from_user = $("#user_password").val();

	if(project_id_from_user <= 0)
	{
		alert("Please enter a valid project ID");
	}

	if(email_from_user === "")
	{
		alert("Please enter a valid email");
	}

	if(password_from_user === "")
	{
		alert("Please enter a valid password");
	}

	URL = 'http://rsense-dev.cs.uml.edu/api/v1/projects/'+project_id_from_user+'';
	response = $.ajax({ type: "GET",
					url: URL,
					async: false,
					dataType: "JSON"
					}).responseText;
	arg = JSON.parse(response);
	number_of_fields = arg.fieldCount;
	field_number = arg.fields[j].name;
	field_id = arg.fields[i].id;

	get(number_of_fields);




}