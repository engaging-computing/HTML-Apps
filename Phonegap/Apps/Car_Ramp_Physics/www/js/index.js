function redir(msg) {
	alert(JSON.stringify(msg));
}

console = {
	log: redir,
	error: redir,
	warn: redir,
	info: redir
};

var watch = 0;
var post_array_x = [];
var post_array_y = [];
var post_array_z = [];
var post_array_t = [];

function start()
{
	//init();
	document.addEventListener("deviceready", init, false);
}

function init()
{
	 watch = navigator.accelerometer.watchAcceleration(success, failure, {frequency: 100});
}

function success(accel)
{
	var currentTime = new Date();

	document.getElementById("xOut").innerHTML = accel.x;
	document.getElementById("yOut").innerHTML = accel.y;
	document.getElementById("zOut").innerHTML = accel.z;

	post_array_x.push(accel.x);
	post_array_y.push(accel.y);
	post_array_z.push(accel.z);
	post_array_t.push(JSON.stringify(currentTime));
}

function post()
{
	var post_data =  {
		email: 'tyler.puleo22@gmail.com',
		password: '414991@Westland',
		title: 'TEST',
		data: {
			'2504': post_array_t,
			'2505': post_array_x,
			'2506': post_array_y,
			'2507': post_array_z,
		}};
	alert(JSON.stringify(post_data));
	$.post('http://rsense-dev.cs.uml.edu/api/v1/projects/547/jsonDataUpload', post_data
	);
}
function myfunction()
{
	var currentTime = new Date();
	var timestamp = JSON.stringify(currentTime);
	console.log('current time: ', currentTime);
}