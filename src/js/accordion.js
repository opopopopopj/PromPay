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
			arrow.innerHTML = `<path fill="#000" d="m16 17.562 6.6-6.6 1.885 1.886L16 21.333l-8.485-8.485L9.4 10.962z"/>`;

			head.append(arrow);

			head.addEventListener('click', () => item.classList.toggle('is-open'));

		});

	});

})(document.querySelectorAll('.accordion'));