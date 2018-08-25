export const SIZES = {
  WIDTH: 640,
  HEIGHT: 360
}

export const MIN_SIZES = {
  WIDTH: 200,
  HEIGHT: 200
}

// export the ready state promise
export const IframeAPIReady = new Promise((resolve, reject) => {
  window.onYouTubeIframeAPIReady = () => resolve()
})
