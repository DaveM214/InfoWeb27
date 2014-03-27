function initialiseMouseOver(){
	var footerdivs = document.getElementsByClassName("footerelement");
	
	for(var i = 0; i<footerdivs.length; i++){
		footerdivs[i].onmouseover= function() {displayText(this);};
		footerdivs[i].onmouseout = function() {hideText(this);};	
	}
}

function displayText(footerDiv){
 	var text = footerDiv.getElementsByClassName("mouseovertext")[0];
 	text.style.display = "block";
	
}

function hideText(footerDiv){
	 footerDiv.getElementsByClassName("mouseovertext")[0].style.display = "none";
}

