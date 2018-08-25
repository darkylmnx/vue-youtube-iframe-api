import { MIN_SIZES, SIZES } from './config'
import _Player from './components/Player'

const plugin = {
  install (Vue, {width, height, loadComponent = true} = {}) {
    console.log('yes')
    if (width && width > MIN_SIZES.WIDTH) {
      SIZES.WIDTH = width
    }

    if (height && height > MIN_SIZES.HEIGHT) {
      SIZES.HEIGHT = height
    }

    // load iframe api
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'

    const first_script = document.getElementsByTagName('script')[0]
    first_script.parentNode.insertBefore(tag, first_script)

    // load component globally
    loadComponent && Vue.component('VytiaPlayer', _Player)
  }
}

typeof window.Vue === 'function' && window.Vue.use(plugin) 

export default plugin
export const Player = _Player
