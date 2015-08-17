$(document).ready(function() {
	$('.movie-btn').click(function(e) {
		var id = $(this).data('movid');
		var that = this;
		var ageHolder = $(that)
		 .parent()
		 .parent()
		 .children('.bottom')
		 .children('.age');
		
		 ageHolder.html('<div class="preloader-wrapper big active"><div class="spinner-layer spinner-blue-only">' +
			     '<div class="circle-clipper left">' +
			      	'<div class="circle"></div>' +
			     '</div><div class="gap-patch">' +
			        '<div class="circle"></div>' +
			     '</div><div class="circle-clipper right">' +
			        '<div class="circle"></div>' +
			     '</div></div></div>');

		$.ajax({
			url: '/movie/' + id,
			success: function(data, status, obj) {
				var age = (data.avg === 0) ? "Not available" : data.avg.toString().substr(0, 4);
				ageHolder
				 .html('<h2>' + age + '</h2>');
			},
			error: function(x, t, m) {
        if(t==="timeout") {
            ageHolder.html('<h3>Request timed out. Try again!</h3>')
        } else {
           console.log(t); 
      	}
    	},
    	timeout: 20000// timeout at 20 seconds
		})


	});
});