//File:  http://jjra928.github.io/assignment7/assignment7HTML.html
//91.461 Assignment7 :  Creating a Single Page Navigation Interface
//Joseph Raffa, UMass Lowell Computer Science Undergradute, jraffa@cs.uml.edu
//Date: 11-03-2014
//Copyright (c) 2014 by Joseph Raffa.  All rights reserved.  
//An html file to lay out the structure for a web page that will create 
//a little blog site for my band.   

//getContent takes a fragment id, and a callback function
//var request gets a new request for some html code
//it loads the request (text) and sends to the callback
//tacks on .html to the id in order to grab the right html file
//sends request
function getContent(fragmentId, callback) {
	var request = new XMLHttpRequest();
	
	request.onload = function() {
		callback(request.responseText);
	};
	
	request.open("GET", fragmentId + ".html");
	request.send(null);
}

//function that sets the active class for the link  who's page we are currently on. 
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

//this function uses get content to obtain text, and then sets it as the inner html of a div on the page!
function navigate() {
	var contentDiv = document.getElementById("content"),
			fragmentId = location.hash.substr(1);
	
	getContent(fragmentId, function (content) {
		contentDiv.innerHTML = content;
		});
	
	setActiveLink(fragmentId);
}

//grabs the has at the end of the web address.
if(!location.hash) {
	location.hash = "#about";
}

navigate();

//adds listener for if the hash at the end of the page changes.
window.addEventListener("hashchange", navigate);