( btn => {

	let windowScroll = null;

	btn.addEventListener('click', () => {

		if ( document.body.classList.contains('menu-show') ) {

			document.body.classList.remove('menu-show');
			document.documentElement.classList.remove('scroll-behavior-off');

		}
		else {

			windowScroll = window.pageYOffset;

			window.requestAnimationFrame( () => {

				document.body.classList.add('menu-show');
				document.documentElement.classList.add('scroll-behavior-off');

			});

		}

	});

})(document.querySelector('.btn-menu-toggle'));