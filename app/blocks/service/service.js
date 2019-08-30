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
};

SlideshowServices.prototype.nextSlide = function () {};

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

export default SlideshowServices;
