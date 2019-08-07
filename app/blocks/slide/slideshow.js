function Slideshow(element) {
	this.slider = document.getElementsByClassName(element)[0];
	this.slides = this.slider.getElementsByClassName('slide');
	this.bullets = this.slider.getElementsByClassName('slideshow__nav-out');
	this.bulletsIn = this.slider.getElementsByClassName('slideshow__nav-inner');
	this.currentSlide = 0;
	this.slideClassName = this.slides[this.currentSlide + 1].className;
	this.slideClassNameActive = this.slides[this.currentSlide].className;
	this.bulletClassName = this.bullets[this.currentSlide + 1].className;
	this.bulletClassNameActive = this.bullets[this.currentSlide].className;
	this.bulletInClassName = this.bulletsIn[this.currentSlide + 1].className;
	this.bulletInClassNameActive = this.bulletsIn[this.currentSlide].className;
	console.log(this.bulletClassName, this.bulletClassNameActive);
	this.interval = null;
}

Slideshow.prototype.intervalSlideshow = function () {
	this.interval = setInterval(this.nextSlide.bind(this), 4000);
	this.userClick();
};

Slideshow.prototype.nextSlide = function () {
	// $(this.slides[this.currentSlide]).fadeOut();
	this.slides[this.currentSlide].className = this.slideClassName;
	// this.slides[this.currentSlide].style.display = 'none';
	this.bullets[this.currentSlide].className = this.bulletClassName;
	this.bulletsIn[this.currentSlide].className = this.bulletInClassName;
	this.currentSlide = (this.currentSlide + 1) % this.slides.length;
	// $(this.slides[this.currentSlide]).fadeIn('slow');
	this.slides[this.currentSlide].className = this.slideClassNameActive;
	this.bullets[this.currentSlide].className = this.bulletClassNameActive;
	this.bulletsIn[this.currentSlide].className = this.bulletInClassNameActive;
};

Slideshow.prototype.userClick = function () {
	const self = this;
	for (let ind = 0; ind < self.bullets.length; ind++) {
		self.bullets[ind].addEventListener('click', function () {
			clearInterval(self.interval);
			self.slides[self.currentSlide].className = self.slideClassName;
			self.bullets[self.currentSlide].className = self.bulletClassName;
			self.bulletsIn[self.currentSlide].className = self.bulletInClassName;
			self.slides[ind].className = self.slideClassNameActive;
			self.bullets[ind].className = self.bulletClassNameActive;
			self.bulletsIn[ind].className = self.bulletInClassNameActive;
			self.currentSlide = ind;
			self.interval = setInterval(self.nextSlide.bind(self), 4000);
		});
	}
};
export default Slideshow;

