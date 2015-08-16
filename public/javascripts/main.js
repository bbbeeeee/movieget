$(document).ready(function() {
	$('.movie-btn').click(function(e) {
		var id = $(this).data('movid');
		
		$.ajax({
			url: '/movie/' + id,
			success: function(data, status, obj) {
				alert(JSON.stringify(data));
			}			
		})


	});
});