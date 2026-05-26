( btn => {

	if ( btn ) {

		const header = document.querySelector('.header');

		btn.addEventListener('click', event => {

			if ( event.detail > 1 ) {

				return;

			}

			header.classList.toggle('is-menu-open');

		});

		window.addEventListener("click", event => {

			if ( event.detail > 1 || event.target.closest('.header__menu') || event.target.closest('.header__mobile') ) {

				return;

			}

			header.classList.remove('is-menu-open');

		});

	}

})(document.querySelector('.btn-menu-toggle'));