( btn => {

	if ( btn ) {

		btn.addEventListener('click', event => {

			if ( event.detail > 1 ) {

				return;

			}

			document.body.classList.toggle('is-menu-open');

		});

		window.addEventListener("click", event => {

			if ( event.detail > 1 || event.target.closest('.header__menu') || event.target.closest('.header__mobile') ) {

				return;

			}

			document.body.classList.remove('is-menu-open');

		});

	}

})(document.querySelector('.btn-menu-toggle'));