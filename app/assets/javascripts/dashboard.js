$(window).load(function() {
	console.log('dashboard ready');
	(function() {
		var $menu = $('.menu-open');
		var width = $('.menu-base').outerWidth() + $menu.outerWidth();
		console.log(width);


		$('.trips').on('click', function(e) {
			e.preventDefault();
			if($menu.css('left') == width - 180 + 'px') {
				$menu.animate({"left": '-=' + width}, 'slow','swing');
			} else {
				$menu.animate({"left": '+=' + width}, 'slow','swing');
			}
			$menu.animate("slide", { direction: "left" }, 1000);
		})
	})()
})

