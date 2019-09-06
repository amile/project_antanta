import $ from 'jquery';

function SlideshowServices(element) {
	this.slider = document.getElementsByClassName(element)[0];
	this.sliderWrapper = this.slider.getElementsByClassName('services__wrapper_flex')[0];
	this.slides = this.slider.getElementsByClassName('services__item_flex');
	this.bulletPrev = this.slider.getElementsByClassName('nav_prev')[0];
	this.bulletNext = this.slider.getElementsByClassName('nav_next')[0];

	this.numSlides = this.slides.length;
	this.prevSlide = this.numSlides - 1;
	// this.slideWidth = this.slides[0].offsetWidth;
	// this.sliderWrapperWidth = this.slideWidth * this.numSlides;
	// this.slideClassName = this.slides[this.currentSlide + 1].className;
	// this.slideClassNameActive = this.slides[this.currentSlide].className;

	this.interval = null;
}

SlideshowServices.prototype.intervalSlideshow = function () {
	// this.interval = setInterval(this.nextSlide.bind(this), 5000);
	// this.nextSlide();
	this.userClick();
	this.userTouch();
};

SlideshowServices.prototype.nextIndex = function (index, numSlides) {
	const nextInd = ((index + 1) <= numSlides - 1) ? (index + 1) : 0;
	return nextInd;
};
SlideshowServices.prototype.prevIndex = function (index, numSlides) {
	const prevInd = ((index - 1) >= 0) ? (index - 1) : (numSlides - 1);
	return prevInd;
};

SlideshowServices.prototype.changeCurrentSlide = function (reverse) {
	$(this.sliderWrapper).removeClass('is-reversing');
	$(this.slides[this.prevSlide]).removeClass('previous');
	if (reverse) {
		this.prevSlide = this.prevIndex(this.prevSlide, this.numSlides);
		$(this.sliderWrapper).addClass('is-reversing');
	}
	else {
		this.prevSlide = this.nextIndex(this.prevSlide, this.numSlides);
	}
	$(this.slides[this.prevSlide]).addClass('previous');
	this.slides[this.prevSlide].style.order = '0';
	Array.prototype.forEach.call(this.slides, (slide, index) => {
		if (index < this.prevSlide) {
			slide.style.order = String(this.numSlides - (this.prevSlide - index));
		}
		else if (index > (this.prevSlide)) {
			slide.style.order = String(index - this.prevSlide);
		}
	});
	$(this.sliderWrapper).removeClass('transform_none');
	setTimeout(() => $(this.sliderWrapper).addClass('transform_none'), 50);
};

SlideshowServices.prototype.userClick = function () {

	const nextIndex = function (index, numSlides) {
		const nextInd = ((index + 1) < numSlides - 1) ? (index + 1) : 0;
		return nextInd;
	};
	const prevIndex = function (index, numSlides) {
		const prevInd = ((index - 1) >= 0) ? (index - 1) : (numSlides - 1);
		return prevInd;
	};
	const self = this;
	this.bulletNext.addEventListener('click', function () {
		$(self.sliderWrapper).removeClass('is-reversing');
		$(self.slides[self.prevSlide]).removeClass('previous');
		self.prevSlide = nextIndex(self.prevSlide, self.numSlides);
		$(self.slides[self.prevSlide]).addClass('previous');
		self.slides[self.prevSlide].style.order = '0';
		Array.prototype.forEach.call(self.slides, (slide, index) => {
			if (index < self.prevSlide) {
				slide.style.order = String(self.numSlides - (self.prevSlide - index));
			}
			else if (index > self.prevSlide){
				slide.style.order = String(index - self.prevSlide);
			}
		});
		$(self.sliderWrapper).removeClass('transform_none');
		setTimeout(() => $(self.sliderWrapper).addClass('transform_none'), 50);
	});
	this.bulletPrev.addEventListener('click', function () {
		$(self.sliderWrapper).addClass('is-reversing');
		$(self.slides[self.prevSlide]).removeClass('previous');
		self.prevSlide = prevIndex(self.prevSlide, self.numSlides);
		$(self.slides[self.prevSlide]).addClass('previous');
		self.slides[self.prevSlide].style.order = '0';
		Array.prototype.forEach.call(self.slides, (slide, index) => {
			if (index < self.prevSlide) {
				slide.style.order = String(self.numSlides - (self.prevSlide - index));
			}
			else if (index > self.prevSlide){
				slide.style.order = String(index - self.prevSlide);
			}
		});
		$(self.sliderWrapper).removeClass('transform_none');
		setTimeout(() => $(self.sliderWrapper).addClass('transform_none'), 50);
	});
};
SlideshowServices.prototype.userTouch = function () {
	let startX = 0;
	let dist = 0;
	let halfSlideWidth = 0;
	const touchstart = function (e) {
		console.log('hello touch services');
		const touchObj = e.changedTouches[0];
		startX = parseInt(touchObj.clientX, 10);
		e.preventDefault();
	};
	const touchmove = function (e) {
		const touchObj = e.changedTouches[0];
		dist = startX - parseInt(touchObj.clientX, 10);
		e.preventDefault();
	};
	const touchend = function () {
		console.log('hello touchend');
		halfSlideWidth = this.sliderWrapper.offsetWidth / 2;
		if ((Math.abs(dist) >= halfSlideWidth) && (dist > 0)) {
			console.log('hello touch false', dist, halfSlideWidth);
			clearInterval(this.interval);
			this.changeCurrentSlide(false);
		}
		else if ((Math.abs(dist) >= halfSlideWidth) && (dist < 0)) {
			console.log('hello touch true', dist, halfSlideWidth);
			clearInterval(this.interval);
			this.changeCurrentSlide(true);
		}
		dist = 0;
	};
	this.bulletNext.addEventListener('touch', function () {
		clearInterval(this.interval);
		this.changeCurrentSlide(false);
	});
	this.bulletPrev.addEventListener('touch', function () {
		clearInterval(this.interval);
		this.changeCurrentSlide(true);
	});
	this.sliderWrapper.addEventListener('touchstart', touchstart);
	this.sliderWrapper.addEventListener('touchmove', touchmove);
	this.sliderWrapper.addEventListener('touchend', e => {
		touchend.bind(this)();
		e.preventDefault();
	});
};

export default SlideshowServices;
