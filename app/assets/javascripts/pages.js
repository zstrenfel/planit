$(window).load(function() {
	(function() {
		console.log('here');
		$('.log-in').on('click', function(e) {
			console.log('click');
			e.preventDefault();
			$('.register-container').addClass('hidden');
			$('.login-container').removeClass('hidden');
		})
	})()
});

