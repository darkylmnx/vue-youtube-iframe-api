import VytiaService from '../Service';
import { getIdFromUrl, swapObject } from '../utils'

const STATES = {}

export default {
  props: {
    id: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
    startAt: {
      type: Number,
      default: null,
    },
    endAt: {
      type: Number,
      default: null,
    },
    quality: {
      type: String,
      default: null,
    },
    width: {
      type: [String, Number],
      default() {
        return VytiaService.options.width;
      },
    },
    height: {
      type: [String, Number],
      default() {
        return VytiaService.options.height;
      },
    },
    playerVars: {
      type: Object,
      default() {
        return { ...VytiaService.options.playerVars };
      },
    }
  },

  watch: {
    id(newId) {
      this.loadById(newId, this.getVideoOptions());
    },
    url(newUrl) {
      this.loadByUrl(newUrl, this.getVideoOptions());
    }
  },

  methods: {
    getVideoOptions() {
      return {
        startSeconds: this.startAt,
        endSeconds: this.endAt,
        suggestedQuality: this.quality,
      };
    },
    onReady(event) {
      this.url && this.loadByUrl(this.url);
      this.id && this.loadById(this.id);

      // console.log('ready', event);
      this.$emit('ready', event);
    },
    onError(event) {
      // console.log('error', event);
      this.$emit('error', event);
    },
    onApiChange(event) {
      // console.log('api-change', event);
      this.$emit('api-change', event);
    },
    onStateChange(event) {
      console.log('state-change', event);
      this.$emit('state-change', event);
      this.$emit(STATES[event.data], event)
    },
    onPlaybackRateChange(event) {
      // console.log('playback-rate-change', event);
      this.$emit('playback-rate-change', event);
    },
    onPlaybackQualityChange(event) {
      // console.log('playback-quality-change', event);
      this.$emit('playback-quality-change', event);
    },
    loadByUrl(videoUrl, options = null) {
      const videoId = getIdFromUrl(videoUrl);
      this.loadById(videoId, options);
    },
    loadById(videoId, options = null) {
      const method = Number(this.playerVars.autoplay) === 1 ? 'loadVideoById' : 'cueVideoById';
      const params = options ? { videoId, ...options } : videoId;
      console.log(params);
      this.player[method](params);
    }
  },

  created() {
    this.player = null;
  },

  mounted() {
    VytiaService.ready().then(() => {
      Object.assign(STATES, swapObject(window.YT.PlayerState));

      this.player = new window.YT.Player(this.$el, {
        width: this.width,
        height: this.height,
        videoId: this.id,
        playerVars: this.playerVars,
        events: {
          onReady: this.onReady,
          onError: this.onError,
          onApiChange: this.onApiChange,
          onStateChange: this.onStateChange,
          onPlaybackRateChange: this.onPlaybackRateChange,
          onPlaybackQualityChange: this.onPlaybackQualityChange,
        },
      });
    });
  },

  destroyed() {
    this.player.destroy();
  },

  render: (h) => h('div'),
};
