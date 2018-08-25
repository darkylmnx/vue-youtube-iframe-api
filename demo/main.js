import Vue from 'vue/dist/vue.min.js'
import VuePlayer from '../src/main'

Vue.use(VuePlayer)

new Vue({
  el: '#app',

  data () {
    return {
      url: null,
      id: null
    }
  },

  methods: {
    onPlayerReady () {
      console.log(this.$refs.p.player)
    },
    play() {
      this.$refs.p.player.playVideo()
    },
    pause() {
      this.$refs.p.player.pauseVideo()
    }
  }
})
