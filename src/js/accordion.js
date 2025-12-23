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
			arrow.innerHTML = `<line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" stroke-width="2"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/>`;

			head.append(arrow);

			head.addEventListener('click', () => item.classList.toggle('is-open'));

		});

	});

})(document.querySelectorAll('.accordion'));