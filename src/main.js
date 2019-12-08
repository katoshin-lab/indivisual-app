import Vue from 'vue'
import App from './App.vue';
import axios from 'axios';
import router from './router'
import store from './store'

Vue.config.productionTip = false

axios.defaults.baseURL = 
  "https://firestore.googleapis.com/v1/projects/indivisual-app/databases/(default)/documents"
// axios.defaults.headers.common['Authorization'] = "49ndfa0384r";
// axios.defaults.headers.get["Accept"] = "application/json";       //このようにデフォルトの設定がかけます

const interceptorsRequest =
  axios.interceptors.request.use(        // リクエストを送る前に処理
    config => {
      return config;
    },
    error => {
      return Promise.reject(error);       // catchにいく
    }
  )
const interceptorsResponse =
  axios.interceptors.response.use(       // レスポンスがthenやcatchに送られる前に処理
    response => {
      return response;
    },
    error => {
      return Promise.reject(error);       // catchにいく
    }
  )

axios.interceptors.request.eject(interceptorsRequest);  //インターセプターを使用しない
axios.interceptors.response.eject(interceptorsResponse);

store.dispatch('autoLogin')

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
