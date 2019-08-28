window.onload = function(){
	var plp = document.getElementById("plp");
	var mymusic = document.getElementById("mymusic");
	var currenttime = document.getElementById("currenttime");
	var duration = document.getElementById("duration");
	var cur = document.getElementById("cur");
	var loopone = document.getElementById("loopone");

	plp.onclick = function() {
		if(this.className == "plypas pas") {
			this.className = "plypas ply";
			mymusic.pause();
		}
		else {
			this.className = "plypas pas";
			mymusic.play();
			
		}
	}

	var musicduration = mymusic.duration;
	
	// alert(mymusic.duration);

	setInterval(function(){
		var percent = (mymusic.currentTime/mymusic.duration)*100;

		cur.style.width = percent + "%";


		var muisiccurrent = mymusic.currentTime;
		// alert(muisiccurrent);
		var currentminute = parseInt(muisiccurrent/60);
		var currentsecond = parseInt(muisiccurrent%60);
		if(currentminute < 10) {
			currentminute = "0" + currentminute;
		}
		if(currentsecond < 10) {
			currentsecond = "0" + currentsecond;
		}
		var currenttimerstr = currentminute + ":" + currentsecond; 
		currenttime.innerHTML = currenttimerstr;

	}, 1000)



	var minute = parseInt(musicduration/60);
	var second = parseInt(musicduration%60);
	if(minute < 10) {
		minute = "0" + minute;
	}
	if(second < 10) {
		second = "0" + second;
	}
	var timerstr = minute + ":" + second; 
	duration.innerHTML = timerstr;


	loopone.onclick = function() {
		if(mymusic.loop) {
			mymusic.loop = false;
			loopone.className = "one";
		}
		else {
			mymusic.loop = true;
			loopone.className = "loopone";
		}
		
	}
}
