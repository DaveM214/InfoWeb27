function initialisePages(){

	var subtopics = document.getElementById("subpagelist").getElementsByTagName("a");
	for (var i = 0; i < subtopics.length; i++){
		var subtopic = subtopics[i];
		if (subtopic.id !== "Home"){
			subtopic.onclick = function() { requestData("xml_files/" + this.id + ".xml", loadContent); }
		} else if (subtopic.id === "Home"){
			subtopic.onclick = function() { loadHome(); }
		}
	}

	var footerTopics = document.getElementById("footer").getElementsByTagName("div");
	for (var i = 0; i < footerTopics.length; i++){
		var footerTopic = footerTopics[i];
		footerTopic.onclick = function() {setUpFunction(this);}
	}
}

function setUpFunction(div){

	var id = div.id;
	var name = id.replace("group","");

	requestData("xml_files/" + name + ".xml", loadContent);

}

function loadHome(){
	//Fetch the div of class "content" and remove if it exists
	var divs = document.getElementsByTagName("div");
	for (var i = 0; i < divs.length; i++){
		var div = divs[i];
		if (div.className === "content") div.remove();
	}

	//Fetch the div of id "main" and "footer" and set it display mode to none
	var divMain = document.getElementById("main");
	var divFooter = document.getElementById("footer");
	divMain.style.display = "block";
	divFooter.style.display = "block";
}

//This function will be called for every link in the menu (except the "Home" link)
function requestData(url, callBack) {
	// Create a new XMLHttpRequest object
	var xmlhttp;
	if (window.XMLHttpRequest) {
		// XMLHttpRequest is supported
		xmlhttp = new XMLHttpRequest();
	}
	else {
		// Create an ActiveX Object
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	} 
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			callBack(xmlhttp);
		}
	}
	// Open the object with the filename
	xmlhttp.open("POST", url, true);
	// Send the request
	xmlhttp.send(null);
}


function loadContent(xmlhttp){

	//Fetch the div of class "content" and remove if it exists
	var divs = document.getElementsByTagName("div");
	for (var i = 0; i < divs.length; i++){
		var div = divs[i];
		if (div.className === "content") div.remove();
	}

	//Fetch the div of id "main" and "footer" and set it display mode to none
	var divMain = document.getElementById("main");
	var divFooter = document.getElementById("footer");
	divMain.style.display = "none";
	divFooter.style.display = "none";

	//Retrieve the XML document
	var xml = xmlhttp.responseXML;

	var content = xml.getElementsByTagName("content")[0]; //The XML file can only have one element "content"
	var contentId = content.id; 
	var title = xml.getElementsByTagName("title")[0]; //The page title
	var summary = xml.getElementsByTagName("sumary")[0]; //The summary
	var intro = xml.getElementsByTagName("intro")[0];
	var subsections = content.getElementsByTagName("subsections")[0]; //The first level of subsections

	/** Creating the HTML elements **/

	//Div Content - Everything else goes into this div
	var divContent = document.createElement("div");
	divContent.id = contentId;
	divContent.className = "content";

	//Title
	var titleElem = document.createElement("h1");
	titleElem.className = "title";
	titleElem.innerHTML = title.firstChild.data;
	divContent.appendChild(titleElem);

	//Summary
	var divSummary = document.createElement("div");
	divSummary.className = "summary";
	var ul = document.createElement("ul");

	var summaryItems = summary.getElementsByTagName("item"); //Fetch all the items in the summary list
	for (var i = 0; i < summaryItems.length; i++){
		var item = summaryItems[i]
		var li = document.createElement("li");
		var a = document.createElement("a");
		a.href = "#" + item.getAttribute("ref");
		a.innerHTML = item.firstChild.data;
		li.appendChild(a);
		ul.appendChild(li); //Appending the li elements to the ul element
	}

	divSummary.appendChild(ul);
	divContent.appendChild(divSummary);

	//Introduction
	var divIntro = document.createElement("div");
	divIntro.className = "intro";
	var pIntro = document.createElement("p");
	pIntro.innerHTML = intro.firstChild.data;
	divIntro.appendChild(pIntro);
	divContent.appendChild(divIntro);



	//Subsections
	var subsectionsElems = subsections.getElementsByTagName("subsection");
	var subsectionList = [];
	//Get all the elements "subsection" with level 1
	for (var i = 0; i < subsectionsElems.length; i++){
		var subsection = subsectionsElems[i];
		if (subsection.getAttribute("level") == "1"){
			subsectionList.push(subsection);
		}
	}

	//Create divs for each subsection
	for (var i = 0; i < subsectionList.length; i++){
		var subsection = subsectionList[i];
		var subtitle = subsection.getElementsByTagName("subtitle")[0];
		var subcontent = subsection.getElementsByTagName("subcontent")[0];

		//Div
		var divSubsection = document.createElement("div");
		divSubsection.className = "subsection"
		divSubsection.id = subsection.id;

		//Subtitle
		var subtitleElem = document.createElement("h2");
		subtitleElem.className = "subtitle";
		subtitleElem.innerHTML = subtitle.firstChild.data;
		divSubsection.appendChild(subtitleElem);

		//Subcontent
		var subsections2 = subcontent.getElementsByTagName("subsections")[0];
		//Check if there are other subsections inside
		if (subsections2){
			//If there are subsections, create elements for those
			var subsectionsElems2 = subsections2.getElementsByTagName("subsection");
			for (var j = 0; j < subsectionsElems2.length; j++){
				var subsection2 = subsectionsElems2[j];

				var subtitle2 = subsection2.getElementsByTagName("subtitle")[0];
				var subcontent2 = subsection2.getElementsByTagName("subcontent")[0];

				//Create Elements
				//Div
				var subsection2Div = document.createElement("div");
				subsection2Div.id = subsection2.id;
				subsection2Div.className = "subsection2";

				//Subtitle
				var  subtitle2Elem = document.createElement("h3");
				subtitle2Elem.className = "subtitle-2";
				subtitle2Elem.innerHTML = subtitle2.firstChild.data;
				subsection2Div.appendChild(subtitle2Elem);

				//Content
				var subcontent2Elems = subcontent2.childNodes;
				for (var k = 0; k < subcontent2Elems.length; k++){
					var elem = subcontent2Elems[k];

					if (elem.tagName === "text") { //Creating paragraphs
						var p = document.createElement("p");
						p.innerHTML = elem.firstChild.data;
						subsection2Div.appendChild(p);
					} else if (elem.tagName === "list"){ //Creating lists
						var ul = document.createElement("ul");
						var items = elem.getElementsByTagName("item");
						for (var l = 0; l < item.length; l++){
							var item = items[l];
							var li = document.createElement("li");
							li.innerHTML = item.firstChild.data;
							ul.appendChild(li);
						}
						subsection2Div.appendChild(ul);
					}
				}

				divSubsection.appendChild(subsection2Div);

			} 

		} else {

				var subcontentElems = subcontent.childNodes;
				for (var j = 0; j < subcontentElems.length; j++){
					var elem = subcontentElems[j];

					if (elem.tagName === "text") { //Creating paragraphs
						var p = document.createElement("p");
						p.innerHTML = elem.firstChild.data;
						divSubsection.appendChild(p);
					} else if (elem.tagName === "list"){ //Creating lists
						var ul = document.createElement("ul");
						var items = elem.getElementsByTagName("item");
						for (var l = 0; l < item.length; l++){
							var item = items[l];
							var li = document.createElement("li");
							li.innerHTML = item.firstChild.data;
							ul.appendChild(li);
						}
						divSubsection.appendChild(ul);
					}
				}
		}

		divContent.appendChild(divSubsection);

	}

	divContent.style.display = "none";
	document.body.appendChild(divContent);
	$(".content").fadeIn();

}




