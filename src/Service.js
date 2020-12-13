export default {
  isReady: false,
  isLoaded: false,
  options: {
    scriptUrl: 'https://www.youtube.com/iframe_api',
    width: 640,
    height: 360,
    playerVars: {},
    onLoad: null,
    onError: null,
  },
  setOptions(options = {}) {
    this.options = options;
  },
  mergeOptions(options = {}) {
    this.options = { ...this.options, ...options };
  },
  ready() {
    return this.isReady ? Promise.resolve() : new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.async = true;
      script.src = this.options.scriptUrl;
      script.onload = () => {
        this.isLoaded = true;
        window.onYouTubeIframeAPIReady = () => {
          this.isReady = true;
          resolve();
        };
        typeof onLoad === 'function' && onLoad();
      };
      script.onerror = () => {
        this.isLoaded = true;
        typeof onError === 'function' && onError();
        reject(new Error('SCRIPT_LOAD_FAILED'));
      };
      document.body.appendChild(script);
    });
  },
};
