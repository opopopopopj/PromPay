( cookie => {

	if(cookie) {

		if(localStorage.getItem('YourPrivacy') !== 'Accept') {

			cookie.classList.remove('hide');

			cookie.querySelector('.cookie__accept').addEventListener('click', () => {

				localStorage.setItem('YourPrivacy', 'Accept');

				cookie.classList.add('hide');

			});

		}

	}

})(document.querySelector('.cookie'));