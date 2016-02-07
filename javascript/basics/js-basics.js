// JavaScript in-class exercises for IO Lab 2/5/2016


// Pop-up the site's title
function displaySiteTitle() {
	var siteTitle = document.getElementById('site-title');
	// alert("This site's title is: " + siteTitle.innerHTML);
	console.log(siteTitle.innerHTML);
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
	var eventListenerButton	= document.getElementById('event-listener-button');
	// var eventListenerButton	= $('#event-listener-button');
	// console.log(eventListenerButton);
	eventListenerButton.addEventListener("click", function() {
		console.log('The event listener works!');
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

}

// Add Dr. Franklin to the end of the list
function addCats() {

}

// Swap the position of the sidebar and main container, increase the width of each grid item to 50%, and change the font
function changeGridLayout() {

}


// Create 3 'cat' objects and insert them into the DOM
// Instructions
// 1. Include 'alt' and 'src' as keys within each of the 3 objects - values should correspond to the cat's name and img source (you can re-use name and URLs from the existing cat elements in the HTML)
// 2. Put these 3 objects into an array - you can do this programmatically or hard-coded
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