$(document).ready( function() {

var playlistSongs = [];

function addToPlaylist(songObject) {
	// console.log(songObject);
	var elem = songObject;
	$('div.playlist').append(elem);
	image = elem.children('img');
	controlContainer = $.parseHTML('<div class="control-container"><div class="controls"><ul><li class="move-up">&and;</li><li class="move-down">&or;</li><li class="delete">x</li></ul></div><div class="playlist-image"></div></div>');
	elem.append(controlContainer);
	elem.children('div.control-container').children('div.playlist-image').append(image);
	elem.children('div.playlist-add').remove()

	// event handler for hover effect on images
	$('div.playlist-image > img').hover(function() {
		$(this).parent().children('div.play').css('opacity','1');
		$(this).fadeTo('fast', 0.5);
	}, function() {
		$(this).fadeTo('fast', 1);
	});
}

function insertResults(data, playlistSongs) {
	$('div.main-container').empty();
	// iterate over 20 results from API call
	for (i=0; i<20; i++) {
		
		// clear previous results
		var img_url = '';
		
		// check if artwork url is present
		if (data[i]['artwork_url'] != null) {
			img_url = data[i]['artwork_url'];
		}
		else {
			img_url = 'http://placehold.it/100x100?text=?';
		}
		
		// populate elements for song box element
		var play = '<div class=play></div>';
		var image = '<img src="' + img_url + '"><br/>';
		var username = "<a href='" + data[i]['user']['permalink_url'] + "' class='username'>" + data[i]['user']['username'] + "</a><br/>";
		var title = "<a href='" + data[i]['permalink_url'] + "' class='title'>" + data[i]['title'] + '</a>';
		var info_div = "<div class='song-info'>" + username + title + "</div>"
		var playlist_add = "<div class='playlist-add'>+</div>"

		// compile all pieces into single div and append to main container
		elem = "<div class='box'>" + play + image + info_div + playlist_add + "</div>";
		elem = $.parseHTML(elem);
		$(elem).children('img').click(function() {
			changeTrack(data[i]['permalink_url']);
		});
		$('div.main-container').append(elem);
	}

	// event handler for hover effect on images
	$('div.box > img').hover(function() {
		$(this).parent().children('div.play').css('opacity','1');
		$(this).fadeTo('fast', 0.5);
	}, function() {
		$(this).fadeTo('fast', 1);
	});

	// event handler for click to add to playlist
	$('div.playlist-add').click(function() {

		// change plus sign for dot
		if ($(this).text() == '+') {
			$(this).text('·');

			// if first song to be added
			if ($('div.playlist').children().length == 0) {
				// remove span
			}

			// clone element and pass to addTolaylist function
			var chosen = $(this).parent().clone();
			chosen.addClass('playlist-item');
			addToPlaylist(chosen); 
		}

	});

}

// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
			var keysList = Object.keys(data[0]);
			insertResults(data);

		},'json'
	);
}

// 'Play' button event handler - play the track in the Stratus player
function changeTrack(url) {
	// Remove any existing instances of the Stratus player
	$('#stratus').remove();
	console.log(url);

	// Create a new Stratus player using the clicked song's permalink URL
	$.stratus({
      key: "b3179c0738764e846066975c2571aebb",
      auto_play: true,
      align: "bottom",
      links: url
    });
}

// event listener for keypress 'Enter'
$('input[name="search"]').keypress(function(e) {
	if(e.which == 13) {
		val = $(this).val();
		callAPI(val, playlistSongs);
	}
});

});