// JavaScript in-class exercises for IO Lab 2/5/2016


// Pop-up the site's title
function displaySiteTitle() {
	var siteTitle = document.getElementById('site-title');
	alert("This site's title is: " + siteTitle.innerHTML);
}

// Change around a few cat names
function changeEvenNames() {
	var newNames = ['George', 'Roberta', 'Phoenix'];
	var cats = document.getElementsByClassName('ib-grid-item');

	for (var i=0; i < cats.length; i++) {
		if (i % 2 === 0) {
			pName = cats[i].getElementsByTagName('p')[0];
			pName.innerHTML = newNames[i];
		}
	}
}

// Add an event listener to a button
window.onload = function() {
	var eventListenerButton = document.getElementById('event-listener-button');
	console.log(eventListenerButton);
	eventListenerButton.addEventListener('click', function() {
		alert('This alert was created with addEventListener');
	});
}

// Switch page background between white and grey
var colorSwitch = false;
function switchBodyBackgroundColor() {
	body = document.getElementsByTagName('body')[0];

	if (colorSwitch) {
		colorSwitch = false;
		body.style.backgroundColor = "#ffffff";
	} else {
		colorSwitch = true;
		body.setAttribute("style", "background-color: #a7a7a7");
	}
}

// Remove the first cat in the grid
function removeFirstCat() {
	child = document.getElementsByClassName("ib-grid-item")[0];
	mainContainer = document.getElementsByClassName("main-container")[0];

	mainContainer.removeChild(child);
}

// Add Dr. Franklin to the end of the list
function addCats() {
	var newDiv = document.createElement("div");
	newDiv.className += "ib-grid-item";

	var newImg = document.createElement("img");
	imgSrc = "https://pbs.twimg.com/profile_images/447460759329460224/mt2UmwGG_400x400.jpeg";
	imgAlt = "Dr. Franklin"
	newImg.setAttribute("src", imgSrc);
	newImg.setAttribute("alt", imgAlt);

	var newPara = document.createElement("p");
	newPara.innerHTML = "Dr. Franklin";

	newDiv.appendChild(newImg);
	newDiv.appendChild(newPara);

	container = document.getElementsByClassName("main-container")[0];
	container.appendChild(newDiv);
}

// Swap the position of the sidebar and main container, increase the width of each grid item to 50%, and change the font
function changeGridLayout() {
	mainContainer = document.getElementsByClassName("main-container")[0];
	sidebar = document.getElementsByClassName("sidebar")[0];
	gridItems = document.getElementsByClassName("ib-grid-item");

	body = document.getElementsByTagName("body")[0];
	mainContainer.setAttribute("style", "width: 80%");
	sidebar.setAttribute("style", "width: 20%");

	for (var i=0; i < gridItems.length; i++) {
		gridItems[i].setAttribute("style", "width: 50%");
	}

	body.insertBefore(mainContainer, sidebar);

	body.setAttribute("style", "font-family: Verdana, sans-serif");
}


// Create 3 'cat' objects and insert them into the DOM
// Instructions
// 1. Include 'alt' and 'src' as keys within each of the 3 objects - values should correspond to the cat's name and img source (you can re-use name and URLs from the existing cat elements in the HTML)
// 2. Put these 3 objects into a list
// 3. Create a handler for the 'Cats from Obj' button in the HTML (use the function below)
function populateFromObj() {

	// 1. Iterate through each 'cat' object in the list you created above
	// 2. For each obj:
		// a) create a new div element with class 'ib-grid-item'
		// b) create a new img element
		// c) set the 'src' and 'alt' attributes on the img with the corresponding values from the object
		// d) create a new p element
		// e) set the p element's innerHTML to the 'alt' value of the object
		// f) append the img and p elements to the div from step a
		// g) append the div element to the parent container
}