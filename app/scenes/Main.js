alert('SceneMain.js loaded');
var startTime = 0;
var start = 0;
var end = 0;
var diff = 0;
var timerID = 0;
function chrono() {
	end = new Date();
	diff = end - start;
	diff = new Date(diff);
	var msec = diff.getMilliseconds();
	var sec = diff.getSeconds();
	var min = diff.getMinutes();
	
	if (min < 10){
		min = "0" + min;
	}
	if (sec < 10){
		sec = "0" + sec;
	}
	if(msec < 10){
		msec = "00" +msec;
	}
	else if(msec < 100){
		msec = "0" +msec;
	}

	$('#min').sfLabel({
		text: min
	});

	$('#second').sfLabel({
		text: sec
	});

	$('#cent').sfLabel({
		text: msec
	});
	
	timerID = setTimeout("chrono()", 10);
}

function SceneMain() {

};

SceneMain.prototype.initialize = function () {
	alert("SceneMain.initialize()");
	
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called
	$('#min').sfLabel({
		text:'00'
	});

	$('#second').sfLabel({
		text:'00'
	});

	$('#cent').sfLabel({
		text:'000'
	});
	$('#svecKeyHelp_zw5a').sfKeyHelp({
		'return':'Return'
	});
	$('#st_btn').sfButton({
		text:'Start'
	});
	$('#reset').sfButton({
		text:'Reset'
	});
	
	index = new Array('#st_btn', '#reset');
	id = 0;
	running = false;
	pause = false;

	$('#svecLabel_ulh8').sfLabel({
		text:':'
	});

	$('#svecLabel_c02c').sfLabel({
		text:':'
	});
	$('#svecImage_as7b').sfImage({
		src:'images/logo.png'
	});
	$('#svecLabel_gkpk').sfLabel({
		text:'Developped by Djothi Grondin'
	});
	$('#st_btn').sfButton('focus');
};

SceneMain.prototype.handleShow = function (data) {
	alert("SceneMain.handleShow()");
	// this function will be called when the scene manager show this scene
};

SceneMain.prototype.handleHide = function () {
	alert("SceneMain.handleHide()");
	// this function will be called when the scene manager hide this scene
};

SceneMain.prototype.handleFocus = function () {
	alert("SceneMain.handleFocus()");
	// this function will be called when the scene manager focus this scene
};

SceneMain.prototype.handleBlur = function () {
	alert("SceneMain.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
};

SceneMain.prototype.handleKeyDown = function (keyCode) {
	alert("SceneMain.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focused
	switch (keyCode) {
		case sf.key.RETURN:
			alert("return pressed");
			break;
		case sf.key.LEFT:
		case sf.key.RIGHT:
			$(index[id]).sfButton('blur');
	        id = (id == 0 ? 1 : 0);
	        $(index[id]).sfButton('focus');
			break;
		case sf.key.UP:
			break;
		case sf.key.DOWN:
			break;
		case sf.key.ENTER:
			if (id == 0) {
				if (running == false)
				{
					running = true;
					$('#st_btn').sfButton({
						text:'Stop'
					});
					if (pause == false)
					{
						start = new Date();
						chrono();
					}
					else
					{
						start = new Date()-diff;
						start = new Date(start);
						chrono();
					}
				}
				else
				{
					running = false;
					$('#st_btn').sfButton({
						text:'Start'
					});
					clearTimeout(timerID);
					pause = true;
				}
            } else if (id == 1) {
            	running = false;
            	pause = false;
            	clearTimeout(timerID);
				$('#st_btn').sfButton({
					text:'Start'
				});
				$('#hours').sfLabel({
					text:'00'
				});

				$('#min').sfLabel({
					text:'00'
				});

				$('#second').sfLabel({
					text:'00'
				});

				$('#cent').sfLabel({
					text:'000'
				});
				start = new Date();
            }
			$(index[id]).sfButton('focus');
			break;
		default:
			alert("handle default key event, key code(" + keyCode + ")");
			break;
	}
};