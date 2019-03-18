import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store/store'

Vue.use(Vuetify);
Vue.use(VeeValidate);

Vue.config.productionTip = false

new Vue({
  store: store,
  render: h => h(App),

  beforeCreate() {
		this.$store.commit('initializeStore');
	}
}).$mount('#app')
