// $(document).ready(function() {
// 	console.log('dashboard ready');
// 	(function() {
// 		var width = $('.menu-base').width();
// 		var $menu-open = $('.menu-open');
// 		console.log(width + 'menu base width');

// 		$('.trips').on('click', function(e) {
// 			e.preventDefault();
// 			if($menu-open.css('left') == width + 'px') {
// 				$menu-open.animate({"left": '-=' + width}, 'slow','easeOutBounce');
// 			} else {
// 				$menu-open.animate({"left": '+=' + width}, 'slow','easeInBounce');
// 			}
// 			$menu-open.animate("slide", { direction: "left" }, 1000);
// 		})
// 	})()
// })

// $(document).ready(function() {
//   console.log('ready2');
  // (function() {
console.log('ready2');
var width = $('.menu-base').width();
var $menu-open = $('.menu-open');
console.log(width + 'menu base width');

$('.trips').on('click', function(e) {
	e.preventDefault();
	if($menu-open.css('left') == width + 'px') {
		$menu-open.animate({"left": '-=' + width}, 'slow','easeOutBounce');
	} else {
		$menu-open.animate({"left": '+=' + width}, 'slow','easeInBounce');
	}
	$menu-open.animate("slide", { direction: "left" }, 1000);
})
  // })()
// })
