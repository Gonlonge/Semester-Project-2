new Vue({
  el: "#app",
  components: {
    carousel: VueCarousel.Carousel,
    slide: VueCarousel.Slide,
  },

  data: {
    slide: 0,
    sliding: null,
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
  },
});
