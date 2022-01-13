$(document).ready(function () {

	// Мобильное меню
	function myMenu(menu) {
		if (menu.length) {
			menu.each(function () {
				var $this = $(this),
						menuBtn = $this.find('#ie-menu-btn'),
						over = $this.find('#ie-menu-over'),
						close = $this.find('#ie-menu-close'),
						body = $('body'),
						scrollbarWidth;
				menuBtn.on('click', toggleOpenMenu);
				over.on('click', menuClose);
				close.on('click', menuClose);
				function menuOpen() { // Открывание меню
					body.addClass('lock').css('padding-right', scrollbarWidth);
					$this.addClass('open');
					menuBtn.addClass('is-active');
				}
				function menuClose() { // Закрывание меню
					body.removeClass('lock').css('padding-right', 0);
					$this.removeClass('open');
					menuBtn.removeClass('is-active');
				}
				function scrollbarWidthCalc() { // Вычисление ширины скролла
					var documentWidth = parseInt(document.documentElement.clientWidth),
							windowsWidth = parseInt(window.innerWidth);
							scrollbarWidth = windowsWidth - documentWidth;
				}
				function toggleOpenMenu() { // Открывание/закрывание меню
					if ($this.hasClass('open')) {
						menuClose();
					}else {
						menuOpen();
					}
				}
				scrollbarWidthCalc();
				$(window).resize(scrollbarWidthCalc);
			})
		};
	};
	myMenu($('.js-ie-menu'));

	// Swiper ieSlider
	const ieSlider = new Swiper('#ieSlider', {
		slidesPerView: "auto",
		pagination: {
			el: '.ie-slider__pagination',
			clickable: true,
		},
	});

	// Swiper ieSlider2
	const ieSlider2 = new Swiper('#ieSlider2', {
		slidesPerView: "auto",
	});

	// Выпадайки при клике по кнопке
	// Задать блокам выпадайкам айдишник совпадающий с data-drop="" в кнопке для этого блока
	// Задать кнопкам .js-drop-btn и data-drop="" с айдишником блока выпадайки
	function dropBlock(btn) {
		var $this = undefined,
				drop = undefined,
				close = $('.js-drop-close');
		btn.on('click', function () {
			$this = $(this);
			drop = $('#' + $this.data('drop'));
			$this.toggleClass('is-active');
			drop.toggleClass('open');
			$(document).mouseup(function (e) {
				if (!$this.is(e.target)
					&& $this.has(e.target).length === 0
					&& !drop.is(e.target)
					&& drop.has(e.target).length === 0) {
					$this.removeClass('is-active');
					drop.removeClass('open');
				}
			});
		})
		close.on('click', function () {
			$('[data-drop="' + $(this).data('drop') +'"]').removeClass('is-active');
			$('#' + $(this).data('drop')).removeClass('open');
		})
	}
	dropBlock($('.js-drop-btn'));

	// Смена положения блока при изменении ширины окна
	// function(блок, куда переместить, куда вернуть)
	function replace(block, to, from, mediaBreak) {
		function replaceToggle() {
			if ($(window).width() <= mediaBreak) { // условие на ширину окна
				block.appendTo(to); // Переместить блок
			} else {
				block.appendTo(from); // Вернуть блок обратно
			}
		}
		replaceToggle();
		$(window).resize(function () {
			replaceToggle();
		})

	}
	replace($('#blockReplace'), $('#to'), $('#from'), breakSm);

	// Переключение цвета тем
	function switchTheme() {
		var switchBtn = $('#switchTheme'),
				body = $('body');
		switchBtn.on('click', function () {
			if (body.hasClass('dark-theme')) {
				body.removeClass('dark-theme');
				body.addClass('light-theme');
			}else {
				body.addClass('dark-theme');
				body.removeClass('light-theme');
			}
		})
	}
	switchTheme();

	$(function () {
		window.addEventListener("scroll", function (event) {

			var top = this.pageYOffset;

			var layers = $(".parallax__layer");
			var speed, yPos;
			layers.each(function () {
				speed = $(this).attr('data-speed');
				var yPos = -(top * speed / 100);
				$(this).attr('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');
			});
		});
	});

});