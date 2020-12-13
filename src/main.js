export { default as VytiaService } from './Service';
export { default as Player } from './components/Player';

import VytiaService from './Service';
import Player from './components/Player';

export default {
  install(Vue, options = {}) {
    VytiaService.mergeOptions(options);
    Vue.component('VytiaPlayer', Player);
    Vue.prototype.$vytia = VytiaService;
  }
}

typeof window.Vue === 'function' && window.Vue.use(plugin);
