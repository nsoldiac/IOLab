$(document).ready( function() {

	// When you click the submit button...
	$('#submit-button').click(function() {
		var someText = $('input#exampleInput').val();
		var elem = "<li ><div class='checkbox'><label><input type='checkbox' class='checkb'>"+ someText + "</label><a href='#'' class='del'>  (remove)</a></div></li>";
		
		// add new element at top of list
		$("#list").prepend(elem);

		// if checkbock is clicked
		$(".checkb").click( function() {
			console.log('test'); // test functionality
			var listItem = $(this).closest( "li" ); // get parent li element
			$(this).closest("li").remove(); // eliminate element from to do list
			$("#doneList").prepend(listItem);// add new element at top of done list


			$(".del").click( function() {
				$(this).closest("li").remove(); // eliminate element if click remove
			});

			// reverse functionality from done to to-do list
			$("#doneList > li > div > label > input.checkb").click( function() {
				console.log('other test');
				var listItem = $(this).closest( "li" );
				$(this).closest("li").remove();
				$("#list").prepend(listItem);

				$(".del").click( function() {
					$(this).closest("li").remove();
				});
			});

		});

		$(".del").click( function() {
			$(this).closest("li").remove();
		});
	});

});