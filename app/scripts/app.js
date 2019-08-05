import svg4everybody from 'svg4everybody';
import $ from 'jquery';

import Slideshow from '../blocks/slide/slideshow.js';
import SlideshowProject from '../blocks/project/project2.js';

$(() => {
	svg4everybody();
});

window.onload = function () {
	const projectSlider = new SlideshowProject('projects__carousel');
	projectSlider.intervalSlideshow();
	const slider = new Slideshow('slideshow');
	slider.intervalSlideshow();
};
