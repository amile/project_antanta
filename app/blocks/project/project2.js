// import $ from 'jquery';

function SlideshowProject(element) {
	this.slider = document.getElementsByClassName(element)[0];
	this.sliderWrapper = this.slider.getElementsByClassName('projects__wrapper_flex')[0];
	this.slides = this.slider.getElementsByClassName('projects__item_flex');
	this.bullets = this.slider.getElementsByClassName('nav__out');
	this.bulletsIn = this.slider.getElementsByClassName('nav__inner');
	this.currentSlide = 0;
	this.numSlides = this.slides.length;
	this.slideWidth = this.slides[0].offsetWidth;
	this.sliderWrapperWidth = this.slideWidth * this.numSlides;
	this.slideClassName = this.slides[this.currentSlide + 1].className;
	this.slideClassNameActive = this.slides[this.currentSlide].className;
	this.bulletClassName = this.bullets[this.currentSlide + 1].className;
	this.bulletClassNameActive = this.bullets[this.currentSlide].className;
	this.bulletInClassName = this.bulletsIn[this.currentSlide + 1].className;
	this.bulletInClassNameActive = this.bulletsIn[this.currentSlide].className;
	console.log(this.slideWidth);
	this.interval = null;
}

SlideshowProject.prototype.intervalSlideshow = function () {
	Array.prototype.forEach.call(this.slides, (slide, index) => {
		slide.style.order = String(index);

	});
	this.interval = setInterval(this.nextSlide.bind(this), 5000);
	this.userClick();
};

/* SlideshowProject.prototype.resizeSlideshow = function () {
	const self = this;
	window.addEventListener('resize', function () {
		clearInterval(self.interval);
		self.slideWidth = self.slides[0].offsetWidth;
		// self.sliderWrapper.style.transform = 'translate(-' + (self.currentSlide * 100) + '%)';
		self.interval = setInterval(self.nextSlide.bind(self), 4000);
	});
};*/

SlideshowProject.prototype.nextSlide = function () {
	Array.prototype.forEach.call(this.slides, (slide, index) => {
		if (index === this.currentSlide) {
			slide.style.order = String(this.numSlides - 1);
			// $(this.slides[this.currentSlide]).fadeOut();
		}
		else {
			const order = slide.style.order;
			slide.style.order = String(order - 1);
		}
	});
	this.bullets[this.currentSlide].className = this.bulletClassName;
	this.bulletsIn[this.currentSlide].className = this.bulletInClassName;
	this.currentSlide = (this.currentSlide + 1) % this.numSlides;
	// $(this.slides[this.currentSlide]).fadeIn('slow');
	this.bullets[this.currentSlide].className = this.bulletClassNameActive;
	this.bulletsIn[this.currentSlide].className = this.bulletInClassNameActive;
};

SlideshowProject.prototype.userClick = function () {
	const self = this;
	for (let current = 0; current < self.bullets.length; current++) {
		self.bullets[current].addEventListener('click', function () {
			clearInterval(self.interval);
			self.slides[current].style.order = '0';
			Array.prototype.forEach.call(self.slides, (slide, index) => {
				if (index < current) {
					slide.style.order = String(self.numSlides - (current - index));
				}
				else if (index > current){
					slide.style.order = String(index - current);
				}
			});
			self.bullets[self.currentSlide].className = self.bulletClassName;
			self.bulletsIn[self.currentSlide].className = self.bulletInClassName;
			self.bullets[current].className = self.bulletClassNameActive;
			self.bulletsIn[current].className = self.bulletInClassNameActive;
			self.currentSlide = current;
			self.interval = setInterval(self.nextSlide.bind(self), 4000);
		});
	}
};
export default SlideshowProject;
