( btn => {

	if ( btn ) {

		const menu = document.querySelector('.header__menu-list');

		btn.addEventListener('click', () => {

			menu.classList.toggle('is-open');

		});

		window.addEventListener("click", event => {

			if ( event.detail > 1 || event.target.closest('.header__menu') ) {

				return;

			}

			menu.classList.remove('is-open');

		});

	}

})(document.querySelector('.btn-menu-toggle'));