( everywhere => {

	if(everywhere) {

		const btn = everywhere.querySelector('.everywhere__btn .btn'),
			  textDefault = btn.textContent,
			  textShowAll = btn.dataset.alt;

		btn.addEventListener('click', () => {

			btn.textContent = everywhere.classList.contains('is-showall') ? textDefault : textShowAll;

			everywhere.classList.toggle('is-showall');

		});

	}

})(document.querySelector('.everywhere'));