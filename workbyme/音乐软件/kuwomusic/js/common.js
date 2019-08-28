        
        
//音乐播放器        
        var mymusic = document.getElementById("mymusic");
		var wp_playBtn = document.getElementById("wp_playBtn");
		var wp_playNextBtn = document.getElementById("wp_playNextBtn");
		var wp_playPreBtn = document.getElementById("wp_playPreBtn");
		var intervalId;
		

		setInterval(function(){
		var percent = (mymusic.currentTime/mymusic.duration)*100;

		cur.style.width = percent + "%";


		var muisiccurrent = mymusic.currentTime;
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
		
		
		//暂停，播放按钮
		wp_playBtn.onclick = function(){
		    if(this.className == "zan") {
				mymusic.pause();
				this.className = "play";
			}
			else {
				mymusic.play();
				this.className = "zan";
			}
		}
		
		//下一曲
		wp_playNextBtn.onclick = function() {
	     mymusic.src = "Only One.mp3";
	     wp_playBtn.className = "zan";
	     mymusic.load();
	}
		
		//上一曲
		wp_playPreBtn.onclick = function(){
		mymusic.src = "Bad Boy.mp3";
		wp_playBtn.className = "zan";
	    mymusic.load();
		}
		

//登陆
    	$("#loginBtn").mousemove(function(){
           	 $(".loginMenu").css("display","block");
    	})
    	$("#loginBtn").mouseout(function(){
            	$(".loginMenu").css("display","none");
    	})

    	$("#top .top .tools .more").mousemove(function(){
    	        $(this).find('ul').css("display","block");
    	})
    	$("#top .top .tools .more").mouseout(function(){
     	       $(this).find('ul').css("display","none");
    	})


    	$("#loginBtn").click(function(){
    	$("#shadowlogin").css("display","block");
    	$("#loginShadow").css("display","block");
    	})
    	
    	$(".closeWindow").click(function(){
    	$("#shadowlogin").css("display","none");
    	$("#loginShadow").css("display","none");
    	})

//banner tab切换
    	$("#banner").mouseover(function(){
	    		$("#tabLeft,#tabRight").css("display","block")
	    	})
	    	$("#banner").mouseout(function(){
	    		$("#tabLeft,#tabRight").css("display","none")
	    	})
	    	
	    	
//歌单和歌手的隐藏显示
    	$("#song ul li .cover").mouseover(function(){
    	    	$(this).find(".play_pl").css("display","block");
    	})
    	$("#song ul li .cover").mouseout(function(){
    	    	$(this).find(".play_pl").css("display","none");
    	})
    	
    	$("#singer ul li").mouseover(function(){
    	    	$(this).find(".songListSplice").css("display","block").siblings('.songList').show().siblings('.infoSplice').hide().siblings('.info').hide();
    	})
    	$("#singer ul li").mouseout(function(){
    	    	$(this).find('.songListSplice').css("display","none").siblings('.songList').hide().siblings('.infoSplice').show().siblings('.info').show();
    	})
 

