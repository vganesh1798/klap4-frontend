import Vue from 'vue'
import App from './App.vue'

import router from './router';

Vue.config.productionTip = false

router.afterEach(to => {
  const title = to.meta.title;

  if (title) {
    document.title = title + ' - KMNR';
  } else {
    document.title = 'KMNR';
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
