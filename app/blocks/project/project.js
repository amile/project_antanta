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
	this.interval = setInterval(this.nextSlide.bind(this), 5000);
	this.resizeSlideshow();
	this.userClick();
};

SlideshowProject.prototype.resizeSlideshow = function () {
	const self = this;
	window.addEventListener('resize', function () {
		clearInterval(self.interval);
		self.slideWidth = self.slides[0].offsetWidth;
		self.sliderWrapper.style.transform = 'translate(-' + (self.currentSlide * 100) + '%)';
		self.interval = setInterval(self.nextSlide.bind(self), 5000);
	});
};

SlideshowProject.prototype.nextSlide = function () {
	if (this.currentSlide === (this.numSlides - 1)) {
		Array.prototype.forEach.call(this.slides, (slide, index) => {
			// slide.style.order = String(index);
		});
	}
	this.bullets[this.currentSlide].className = this.bulletClassName;
	this.bulletsIn[this.currentSlide].className = this.bulletInClassName;
	this.currentSlide = (this.currentSlide + 1) % this.numSlides;
	const translate = this.currentSlide * this.slideWidth * (-1);
	console.log(this.currentSlide);
	this.sliderWrapper.style.transform = 'translate(' + translate + 'px)';
	// this.slides[this.currentSlide].style.opacity = '1';
	this.bullets[this.currentSlide].className = this.bulletClassNameActive;
	this.bulletsIn[this.currentSlide].className = this.bulletInClassNameActive;
};

SlideshowProject.prototype.nextSlide2 = function () {
	// this.slides[this.currentSlide].style.opacity = '0';
	if (this.currentSlide === (this.numSlides - 1)) {
		Array.prototype.forEach.call(this.slides, (slide, index) => {
			// slide.style.order = String(index);
		});
	}
	this.bullets[this.currentSlide].className = this.bulletClassName;
	this.bulletsIn[this.currentSlide].className = this.bulletInClassName;
	this.currentSlide = (this.currentSlide + 1) % this.numSlides;
	const translate = this.currentSlide * this.slideWidth * (-1);
	console.log(this.currentSlide);
	this.sliderWrapper.style.transform = 'translate(' + translate + 'px)';
	// this.slides[this.currentSlide].style.opacity = '1';
	this.bullets[this.currentSlide].className = this.bulletClassNameActive;
	this.bulletsIn[this.currentSlide].className = this.bulletInClassNameActive;
};

SlideshowProject.prototype.userClick = function () {
	const self = this;
	for (let ind = 0; ind < self.bullets.length; ind++) {
		self.bullets[ind].addEventListener('click', function () {
			clearInterval(self.interval);
			// self.slides[self.currentSlide].style.opacity = '0';
			self.bullets[self.currentSlide].className = self.bulletClassName;
			self.bulletsIn[self.currentSlide].className = self.bulletInClassName;
			const translate = ind * self.slideWidth * (-1);
			self.sliderWrapper.style.transform = 'translate(' + translate + 'px)';
			// self.slides[ind].style.opacity = '1';
			self.bullets[ind].className = self.bulletClassNameActive;
			self.bulletsIn[ind].className = self.bulletInClassNameActive;
			self.currentSlide = ind;
			self.interval = setInterval(self.nextSlide.bind(self), 5000);
		});
	}
};
export default SlideshowProject;

