$(window).load(function() {
	(function() {
		console.log('here');
		var $target = $('.login-register');
		$('.log-in').on('click', function(e) {
			console.log('click');
			e.preventDefault();
			$('.register-container').addClass('hidden');
			$('.login-container').removeClass('hidden');

		})
		$('.regester').on('click', function(e) {
			console.log('click');
			e.preventDefault();
			$('.register-container').removeClass('hidden');
			$('.login-container').addClass('hidden');
		})
	})()
});

