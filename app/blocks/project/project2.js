import $ from 'jquery';

function SlideshowProject(element) {
	this.slider = document.getElementsByClassName(element)[0];
	this.sliderWrapper = this.slider.getElementsByClassName('projects__wrapper_flex')[0];
	this.slides = this.slider.getElementsByClassName('projects__item_flex');
	this.bullets = this.slider.getElementsByClassName('nav__out');
	this.bulletsIn = this.slider.getElementsByClassName('nav__inner');
	this.numSlides = this.slides.length;
	this.currentSlide = 0;
	this.prevSlide = this.numSlides - 1;
	// this.slideWidth = this.slides[0].offsetWidth;
	// this.sliderWrapperWidth = this.slideWidth * this.numSlides;
	this.slideClassName = this.slides[this.currentSlide + 1].className;
	this.slideClassNameActive = this.slides[this.currentSlide].className;
	this.bulletClassName = this.bullets[this.currentSlide + 1].className;
	this.bulletClassNameActive = this.bullets[this.currentSlide].className;
	this.bulletInClassName = this.bulletsIn[this.currentSlide + 1].className;
	this.bulletInClassNameActive = this.bulletsIn[this.currentSlide].className;
	console.log(this.slideWidth);
	this.interval = null;
	this.changeSlideOrder.bind(this);
	this.isTranslate.bind(this);
}

SlideshowProject.prototype.intervalSlideshow = function () {
	Array.prototype.forEach.call(this.slides, (slide, index) => {
		if (index === this.prevSlide) {
			slide.style.order = '0';
		}
		else {
			slide.style.order = String(index + 1);
		}
	});
	this.interval = setInterval(this.nextSlide.bind(this), 5000);
	this.userClick();
	this.userTouch();
	console.log('interval', this.sliderWrapper);
};

SlideshowProject.prototype.changeSlideOrder = function (click, reverse, bullet) {
	if (click) {
		this.prevSlide = (bullet - 1) >= 0 ? (bullet - 1) : (this.numSlides - 1);
	}
	else if (reverse) {
		this.prevSlide = (this.prevSlide - 1) >= 0 ? (this.prevSlide - 1) : (this.numSlides - 1);
	}
	else {
		this.prevSlide = bullet;
	}
	this.slides[this.prevSlide].style.order = '0';
	Array.prototype.forEach.call(this.slides, (slide, index) => {
		if (index < this.prevSlide) {
			slide.style.order = String(this.numSlides - (this.prevSlide - index));
		}
		else if (index > (this.prevSlide)) {
			slide.style.order = String(index - this.prevSlide);
		}
	});
};

SlideshowProject.prototype.isTranslate = function (reverse) {
	if (reverse) { $(this.sliderWrapper).addClass('is-transform_reverse'); }
	$(this.slider).addClass('background_none');
	$(this.sliderWrapper).removeClass('translate_none');
	setTimeout(() => $(this.sliderWrapper).addClass('translate_none'), 50);
	setTimeout(() => $(this.slider).removeClass('background_none'), 1000);
	this.bullets[this.currentSlide].className = this.bulletClassName;
	this.bulletsIn[this.currentSlide].className = this.bulletInClassName;
	this.currentSlide = (this.prevSlide + 1) < this.numSlides ? (this.prevSlide + 1) : 0;
	this.bullets[this.currentSlide].className = this.bulletClassNameActive;
	this.bulletsIn[this.currentSlide].className = this.bulletInClassNameActive;
	this.interval = setInterval(this.nextSlide.bind(this), 4000);
};

SlideshowProject.prototype.nextSlide = function () {
	Array.prototype.forEach.call(this.slides, (slide, index) => {
		if (index === this.prevSlide) {
			slide.style.order = String(this.numSlides - 1);
		}
		else {
			const order = slide.style.order;
			slide.style.order = String(order - 1);
		}
	});
	$(this.slider).addClass('background_none');
	$(this.sliderWrapper).removeClass('is-transform_reverse');
	$(this.sliderWrapper).removeClass('translate_none');
	setTimeout(() => $(this.sliderWrapper).addClass('translate_none'), 50);
	setTimeout(() => $(this.slider).removeClass('background_none'), 1000);
	// setTimeout(() => $(this.slider).css('background-size', 'auto'), 50);
	this.bullets[this.currentSlide].className = this.bulletClassName;
	this.bulletsIn[this.currentSlide].className = this.bulletInClassName;
	this.currentSlide = (this.currentSlide + 1) % this.numSlides;
	this.prevSlide = (this.prevSlide + 1) % this.numSlides;
	this.bullets[this.currentSlide].className = this.bulletClassNameActive;
	this.bulletsIn[this.currentSlide].className = this.bulletInClassNameActive;
};

SlideshowProject.prototype.userClickOrigin = function () {
	const self = this;
	for (let bullet = 0; bullet < self.bullets.length; bullet++) {
		self.bullets[bullet].addEventListener('click', function () {
			clearInterval(self.interval);
			$(self.sliderWrapper).removeClass('is-transform is-transform_reverse');
			self.prevSlide = (bullet - 1) >= 0 ? (bullet - 1) : (self.numSlides - 1);
			self.slides[self.prevSlide].style.order = '0';
			Array.prototype.forEach.call(self.slides, (slide, index) => {
				if (index < self.prevSlide) {
					slide.style.order = String(self.numSlides - (self.prevSlide - index));
				}
				else if (index > self.prevSlide){
					slide.style.order = String(index - self.prevSlide);
				}
			});
			if (bullet !== self.currentSlide) {
				$(self.slider).addClass('background_none');
				if (bullet < self.currentSlide) {
					$(self.sliderWrapper).addClass('is-transform_reverse');
				}
				$(self.sliderWrapper).removeClass('translate_none');
				setTimeout( () => $(self.sliderWrapper).addClass('translate_none'), 50);
				setTimeout(() => $(self.slider).removeClass('background_none'), 1000);
			}
			self.bullets[self.currentSlide].className = self.bulletClassName;
			self.bulletsIn[self.currentSlide].className = self.bulletInClassName;
			self.bullets[bullet].className = self.bulletClassNameActive;
			self.bulletsIn[bullet].className = self.bulletInClassNameActive;
			self.currentSlide = bullet;
			self.interval = setInterval(self.nextSlide.bind(self), 4000);
		});
	}
};

SlideshowProject.prototype.userClick = function () {
	const self = this;
	for (let bullet = 0; bullet < self.bullets.length; bullet++) {
		self.bullets[bullet].addEventListener('click', function () {
			/* const reIndex = function () {
				self.prevSlide = (bullet - 1) >= 0 ? (bullet - 1) : (self.numSlides - 1);
				self.slides[self.prevSlide].style.order = '0';
				Array.prototype.forEach.call(self.slides, (slide, index) => {
					if (index < self.prevSlide) {
						slide.style.order = String(self.numSlides - (self.prevSlide - index));
					}
					else if (index > self.prevSlide){
						slide.style.order = String(index - self.prevSlide);
					}
				});
			}; */
			const isTranslate = function (reverse) {
				if (reverse) { $(self.sliderWrapper).addClass('is-transform_reverse'); }
				$(self.slider).addClass('background_none');
				$(self.sliderWrapper).removeClass('translate_none');
				setTimeout(() => $(self.sliderWrapper).addClass('translate_none'), 50);
				setTimeout(() => $(self.slider).removeClass('background_none'), 1000);
			};
			clearInterval(self.interval);
			$(self.sliderWrapper).removeClass('is-transform is-transform_reverse');
			if (bullet > self.currentSlide) {
				if ((bullet - self.currentSlide) > 1) {
					self.slides[self.currentSlide].style.order = '-2';
					self.slides[bullet].style.order = '-1';
					isTranslate(false);
					setTimeout(() => self.changeSlideOrder(true, false, bullet), 1000);
				}
				else {
					self.changeSlideOrder(true, false, bullet);
					isTranslate(false);
				}
			}
			else if (self.currentSlide > bullet) {
				if ((self.currentSlide - bullet) > 1) {
					self.prevSlide = (bullet - 1) >= 0 ? (bullet - 1) : (bullet + 1);
					self.slides[self.prevSlide].style.order = '-3';
					self.slides[self.currentSlide].style.order = '-1';
					self.slides[bullet].style.order = '-2';
					isTranslate(true);
					setTimeout(() => self.changeSlideOrder(true, false, bullet), 1000);
				}
				else {
					self.changeSlideOrder(true, false, bullet);
					isTranslate(true);
				}
			}
			self.bullets[self.currentSlide].className = self.bulletClassName;
			self.bulletsIn[self.currentSlide].className = self.bulletInClassName;
			self.bullets[bullet].className = self.bulletClassNameActive;
			self.bulletsIn[bullet].className = self.bulletInClassNameActive;
			self.currentSlide = bullet;
			self.interval = setInterval(self.nextSlide.bind(self), 4000);
		});
	}
};
SlideshowProject.prototype.userTouch = function () {
	const self = this;
	let startX = 0;
	let dist = 0;
	let halfSlideWidth = 0;
	const touchstart = function (e) {
		const touchObj = e.changedTouches[0];
		startX = parseInt(touchObj.clientX, 10);
		e.preventDefault();
	};
	const touchmove = function (e) {
		const touchObj = e.changedTouches[0];
		dist = startX - parseInt(touchObj.clientX, 10);
		e.preventDefault();
	};
	const touchend = function (slide) {
		$(this.sliderWrapper).removeClass('is-transform is-transform_reverse');
		if ((Math.abs(dist) >= halfSlideWidth) && (dist > 0)) {
			clearInterval(this.interval);
			this.changeSlideOrder(false, false, slide);
			this.isTranslate(false);
		}
		else if ((Math.abs(dist) >= halfSlideWidth) && (dist < 0)) {
			clearInterval(this.interval);
			this.changeSlideOrder(false, true, slide);
			this.isTranslate(true);
		}
	};
	for (let slide = 0; slide < self.slides.length; slide++) {
		halfSlideWidth = self.slides[slide].offsetWidth / 2;
		self.slides[slide].addEventListener('touchstart', touchstart);
		self.slides[slide].addEventListener('touchmove', touchmove);
		self.slides[slide].addEventListener('touchend', e => {
			touchend.bind(this)(slide);
			e.preventDefault();
		});
	}
};

export default SlideshowProject;
