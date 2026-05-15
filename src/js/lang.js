( lang => {

	if ( lang ) {

		const btn = lang.querySelector('.lang__current');
		const current = lang.querySelector('.lang__current-value');

		btn.addEventListener('click', () => {

			lang.classList.toggle('is-open');

		});

		window.addEventListener("click", event => {

			if ( event.detail > 1 || event.target.closest('.lang') ) {

				return;

			}

			lang.classList.remove('is-open');

		});

	}

})(document.querySelector('.lang'));