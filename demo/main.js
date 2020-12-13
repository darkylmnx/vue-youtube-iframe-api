import Vue from 'vue/dist/vue.min.js';
import VuePlayer from '../src/main';

Vue.use(VuePlayer);

new Vue({
  el: '#app',

  data () {
    return {
      url: null,
      id: null,
      quality: null,
    };
  },

  methods: {
    onPlayerReady() {
      window.player = this.$refs.p.player; 
    },
    onQualityChange(event) {
      console.log('quality', event);
    },
    play() {
      this.$refs.p.player.playVideo();
    },
    pause() {
      this.$refs.p.player.pauseVideo();
    },
  },
});
