Pages = (function() {

	var logInRegisterHandler = function() {
		$('.log-in').on('click', function(e) {
			console.log('click');
			e.preventDefault();
			$('.register-container').addClass('hidden');
			$('.login-container').removeClass('hidden');
		});

		$('.register').on('click', function(e) {
			console.log('click');
			e.preventDefault();
			$('.register-container').removeClass('hidden');
			$('.login-container').addClass('hidden');
		});
	};

	var start = function() {
		logInRegisterHandler();
	};

	return {
		start: start
	};
})();
