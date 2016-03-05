$(document).ready( function() {

var apiResults = [];
var listMultiplier = 0;

function addToPlaylist(songObject) {
	// edit songObject to match specifications of playlist div
	var elem = songObject;
	$('div.playlist').append(elem);
	image = elem.children('img');
	controlContainer = $.parseHTML('<div class="control-container"><div class="controls"><ul><li class="move-up">&and;</li><li class="move-down">&or;</li><li class="delete">x</li></ul></div><div class="playlist-image"></div></div>');
	elem.prepend(controlContainer);
	elem.children('div.control-container').children('div.playlist-image').append(image);
	elem.children('div.playlist-add').remove()

	// event handler for hover effect on images
	$('div.playlist-image > img').hover(function() {
		$(this).parent().children('div.play').css('opacity','1');
		$(this).fadeTo('fast', 0.5);
	}, function() {
		$(this).fadeTo('fast', 1);
	});

	// event handler for deletion
	$(elem).find('.delete').click(function() {
		var temp = $(this).closest('div.playlist-item');
		temp.remove();
	});

	// event handler for moving up and down
	$(elem).find('.move-up').click(function() {
		var elem_div = $(this).closest('div.playlist-item');
		var prev = elem_div.prev();
		$(elem_div).insertBefore(prev);
	});	

	// event handler for moving up and down
	$(elem).find('.move-down').click(function() {
		var elem_div = $(this).closest('div.playlist-item');
		var after = elem_div.next();
		$(elem_div).insertAfter(after);
	});	

	// click event handler to play song
	$(elem).find('img').click(function() {
		var song_url = $(this).closest('div.playlist-item').find('a.title').attr('href');
		console.log(song_url);
		changeTrack(song_url);
	});

}


function insertResults(data) {
	
	if (apiResults.length > 0) {
		data = apiResults;
	} 
	else {
		apiResults = data;
	}

	// iterate over 20 results from API call
	var start = parseInt(listMultiplier) * 20;
	for (i=(0 + start); i<(20+start); i++) {
		
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
		var url = data[i]['permalink_url'];
		var play = '<div class=play></div>';
		var image = '<img src="' + img_url + '"><br/>';
		var username = "<a href='" + data[i]['user']['permalink_url'] + "' class='username'>" + data[i]['user']['username'] + "</a><br/>";
		var title = "<a href='" + url + "' class='title'>" + data[i]['title'] + '</a>';
		var info_div = "<div class='song-info'>" + username + title + "</div>"
		var playlist_add = "<div class='playlist-add'>+</div>"

		// compile all pieces into single div and append to main container
		elem = "<div class='box'>" + play + image + info_div + playlist_add + "</div>";
		elem = $.parseHTML(elem);

		// click event handler to play song
		$(elem).children('img').click(function() {
			var song_url = $(this).parent().children('div.song-info').children('a.title').attr('href');
			console.log(song_url);
			changeTrack(song_url);
		});

		// add new element to main-container
		$('div.main-container').append(elem);
	}

	listMultiplier =  listMultiplier + 1;

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

    $('div.main-container').on('scroll', function() {
        if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
            console.log('here');
            insertResults('test');
        }
    });

}

// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	listMultiplier = 0;
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
    $('#bars').css('top','23px');

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
		$('.main-container').empty();
		apiResults = [];
		val = $(this).val();
		callAPI(val);
	}
});



});