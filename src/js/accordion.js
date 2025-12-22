( items => {

	if(!items.length) {

		return;

	}

	[...items].forEach( accordion => {

		const items = accordion.querySelectorAll('.accordion__item');

		[...items].forEach( item => {

			const head = item.querySelector('.accordion__head'),
				  arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");

			arrow.setAttributeNS(null, "viewBox", "0 0 24 24");
			arrow.setAttributeNS(null, "width", 24);
			arrow.setAttributeNS(null, "height", 24);
			arrow.innerHTML = `<path d="M11 11V2h2v9h9v2h-9v9h-2v-9H2v-2z"/>`;

			head.append(arrow);

			head.addEventListener('click', () => item.classList.toggle('is-open'));

		});

	});

})(document.querySelectorAll('.accordion'));