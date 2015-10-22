$(document).ready(function() {
  console.log('ready');
  (function() {
  	$('.log-in').on('click', function(e) {
  		console.log('doing');
  		e.preventDefault();
  		$('.register-container').addClass('hidden');
  		$('.login-container').removeClass('hidden');
  	})
  })()
})
