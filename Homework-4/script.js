$(document).ready( function() {

	$('#submit-button').click(function() {
		var someText = $('input#exampleInput').val();
		var elem = "<li ><div class='checkbox'><label><input type='checkbox' class='checkb'>"+ someText + "</label><a href='#'' class='del'>  (remove)</a></div></li>";
		
		$("#list").append(elem);

		$(".checkb").click( function() {
			console.log('test');
			var listItem = $(this).closest( "li" );

		});
	});


	if ($('.checkb').is(':checked')) {
		console.log('checked');
	}

});