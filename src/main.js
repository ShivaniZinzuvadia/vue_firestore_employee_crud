import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {auth} from './firebase'
import { firestorePlugin } from 'vuefire'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(firestorePlugin)

Vue.config.productionTip = false

let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})