( everywhere => {

	if(everywhere) {

		const btn = everywhere.querySelector('.everywhere__btn .btn'),
			  listBox = everywhere.querySelector('.everywhere__list'),
			  lists = [...listBox.querySelectorAll('ul')],
			  textDefault = btn.textContent,
			  textShowAll = btn.dataset.alt;

		btn.addEventListener('click', () => {

			btn.textContent = everywhere.classList.contains('is-showall') ? textDefault : textShowAll;

			everywhere.classList.toggle('is-showall');

		});

		let resizeTimeout,
			windowWidthOLd = window.innerWidth;

		const originalHTML = listBox.innerHTML;

		function regroupEverywhereList() {

			if (windowWidthOLd >= 1024) {

				listBox.innerHTML = originalHTML;

				return;

			}

			const items = [...listBox.querySelectorAll('li')];

			listBox.innerHTML = '';

			const pattern = [6, 5];

			let index = 0;
			let ulIndex = 0;

			while (index < items.length) {

				const ul = document.createElement('ul');
				const limit = pattern[ulIndex % 2];

				for (let i = 0; i < limit && index < items.length; i++) {
					ul.append(items[index]);
					index++;
				}

				listBox.append(ul);
				ulIndex++;

			}

			const count = listBox.firstElementChild.children.length;
			const gap = parseFloat(getComputedStyle(listBox.firstElementChild).gap);
			const width = ( listBox.clientWidth - ( ( count - 1) * gap ) ) / count;
			document.documentElement.style.setProperty('--everywhereWidth', width + 'px');

		}

		window.addEventListener("load", regroupEverywhereList);

		window.addEventListener("resize", () => {

			window.requestAnimationFrame( () => {

				clearTimeout(resizeTimeout);

				resizeTimeout = setTimeout( () => {

					resizeTimeout = null;

					if(windowWidthOLd !== window.innerWidth) {

						windowWidthOLd = window.innerWidth;

						regroupEverywhereList();

					}

				}, 1000);

			});

		});


	}

})(document.querySelector('.everywhere'));