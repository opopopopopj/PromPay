( items => {

	if(!items.length) {

		return;

	}

	[...items].forEach( accordion => {

		const items = accordion.querySelectorAll('.accordion__item');

		[...items].forEach( item => {

			const head = item.querySelector('.accordion__head'),
				  arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");

			arrow.setAttributeNS(null, "viewBox", "0 0 32 32");
			arrow.setAttributeNS(null, "width", 32);
			arrow.setAttributeNS(null, "height", 32);
			arrow.innerHTML = `<path d="M19.453 22.316 7.977 10.841l1.886-1.886L21.338 20.43V10.316h2.667v14.667H9.338v-2.667z"/>`;

			head.append(arrow);

			head.addEventListener('click', () => item.classList.toggle('is-open'));

		});

	});

})(document.querySelectorAll('.accordion'));