var spanlist = document.getElementsByClassName("placeholder");
	var inputlist = document.getElementsByClassName("field");
	
	
	for(var i =0;i<spanlist.length;i++){
		spanlist[i].onclick = function(){
			this.nextSibling.nextSibling.focus();
			this.style.display = "none";
		}
	}
	function checkedinput(which){
		var inputname = which.getAttribute("name");
		var regtxt ="";
		switch(inputname){
			case "regPhone":
			regtxt = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
//			if(/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(which.value)){
//  		return;
//  	}else{
//  		which.parentNode.nextSibling.nextSibling.innerHTML = which.getAttribute("warning");
//  		which.parentNode.style.border = "1px solid red";
//  	  }
    		break;
    		case "regName":
    		regtxt = /^[\u4E00-\u9FA5A-Za-z0-9]{1,16}$/;
    		break;
    		case "regPwd":
    		regtxt = /^[a-zA-Z\d_]{8,}$/;
    		break;
    		case "regPwdRepeat":
    		
    		break;
    		case "mobileCode":
    		regtxt = /^[a-zA-Z0-9]{4,10}$/; 
    		break;
	   	}
			if(regtxt.test(which.value)){
				return;
			}else{
				which.parentNode.nextSibling.nextSibling.innerHTML = which.getAttribute("warning");
    			which.parentNode.style.border = "1px solid red";
			}
		}
	for(var j=0;j<inputlist.length;j++){
	    inputlist[j].onblur = function(){
		    checkedinput(this);
	    }
	}