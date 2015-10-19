// (function($) {


// })(jQuery)

(function() {
	$(document).ready(function() {
		console.log('ready');
		$('.log-in').click(function(e) {
			e.preventDefault();
			e.stopPropagation();
			console.log("pressed");
			$('.register-container').addClass('hidden');
			$('.login-container').removeClass('hidden');
		});

		$('.register').click(function(e) {
			e.preventDefault();
			e.stopPropagation();
			console.log("pressed");
			$('.login-container').addClass('hidden');
			$('.register-container').removeClass('hidden');
		});
	})
})()