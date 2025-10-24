/*Header*/
import { loadHeader } from "/js/header.js";
loadHeader();

/*Carousel*/
import { initCarousel } from '/js/carousel.js';
initCarousel();

import { initEpisodios } from '/js/episodios.js';

document.addEventListener("DOMContentLoaded", function() {
    initEpisodios(); 
});