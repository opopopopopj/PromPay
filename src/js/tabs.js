( tabs => {

	if ( tabs.length > 0 ) {

		[...tabs].forEach( tab => {

			const btns = tab.querySelectorAll('.tabs__btn'),
				  items = tab.querySelectorAll('.tabs__item');

			[...btns].forEach( (btn,index) => {

				btn.addEventListener('click', () => {

					[...btns].forEach( _btn => _btn.classList.toggle('is-current', _btn === btn) );

					[...items].forEach( (item,_index) => item.classList.toggle('visuallyhidden', _index !== index) );

				});

			});

		});

	}

})(document.querySelectorAll('.tabs'));