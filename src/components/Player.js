import { SIZES, IframeAPIReady } from '../config'
import { getIdFromUrl, swapObject } from '../utils'

const STATES = {}

export default {
  props: {
    ytid: {
      type: String
    },
    yturl: {
      type: String
    },
    width: {
      type: [String, Number],
      default() {
        return SIZES.WIDTH
      }
    },
    height: {
      type: [String, Number],
      default() {
        return SIZES.HEIGHT
      }
    },
    playerVars: {
      type: Object,
      default: {}
    }
  },

  watch: {
    ytid (new_ytid) {
      this.loadById(new_ytid)
    },
    yturl (new_yturl) {
      this.loadByUrl(new_yturl)
    }
  },

  methods: {
    onReady (event) {
      if (this.shouldLoadByUrl) {
        this.loadByUrl(this.yturl)
        this.shouldLoadByUrl = false
      }

      // console.log('ready', event)
      this.$emit('ready', event)
    },
    onError (event) {
      // console.log('error', event)
      this.$emit('error', event)
    },
    onApiChange (event) {
      // console.log('api-change', event)
      this.$emit('api-change', event)
    },
    onStateChange (event) {
      // console.log('state-change', event)
      this.$emit('state-change', event)
      this.$emit(STATES[event.data].toLowerCase(), event)
    },
    onPlaybackRateChange (event) {
      // console.log('playback-rate-change', event)
      this.$emit('playback-rate-change', event)
    },
    onPlaybackQualityChange (event) {
      // console.log('playback-quality-change', event)
      this.$emit('playback-quality-change', event)
    },
    loadByUrl (url) {
      const id = getIdFromUrl(url)
      const method = Number(this.playerVars.autoplay) === 1 ? 'loadVideoById' : 'cueVideoById'

      id && this.player[method](id)
    },
    loadById (id) {
      const method = Number(this.playerVars.autoplay) === 1 ? 'loadVideoById' : 'cueVideoById'

      this.player[method](id)
    }
  },

  created () {
    this.player = null
    this.shouldLoadByUrl = (typeof this.yturl === 'string' && this.yturl.length)
  },

  mounted () {
    IframeAPIReady.then(() => {
      Object.assign(STATES, swapObject(window.YT.PlayerState))

      this.player = new window.YT.Player(this.$refs.player, {
        width: this.width,
        height: this.height,
        videoId: this.ytid,
        playerVars: this.playerVars,
        events: {
          onReady: this.onReady,
          onError: this.onError,
          onApiChange: this.onApiChange,
          onStateChange: this.onStateChange,
          onPlaybackRateChange: this.onPlaybackRateChange,
          onPlaybackQualityChange: this.onPlaybackQualityChange
        }
      })
    })
  },

  destroyed () {
    this.player.destroy()
  },

  render (h) {
    return h('div', {ref: 'player'})
  }
}
