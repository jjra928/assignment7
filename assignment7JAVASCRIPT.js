function getContent(fragmentId, callback) {
	var request = new XMLHttpRequest();
	
	request.onload = function() {
		callback(request.responseText);
	};
	
	request.open("GET", fragmentId + ".html");
	request.send(null);
}

function setActiveLink(fragmentId) {
	var navbarDiv = document.getElementById("navbar"),
			links = navbarDiv.children,
			i, link, pagename;
		
	for(i = 0; i < links.length; i++) {
		link = links[i];
		pageName = link.getAttribute("href").substr(1);
		if(pageName === fragmentId) {
			link.setAttribute("class", "active");
		} else {
			link.removeAttribute("class");
		}
	}
}

function navigate() {
	var contentDiv = document.getElementById("content"),
			fragmentId = location.hash.substr(1);
	
	getContent(fragmentId, function (content) {
		contentDiv.innerHTML = content;
		});
	
	setActiveLink(fragmentId);
}

if(!location.hash) {
	location.hash = "#Jennie";
}

navigate();

window.addEventListener("hashchange", navigate);