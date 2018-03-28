import Vue from 'vue'
import VueResource from 'vue-resource'
import VueMoment from 'vue-moment'
import App from './App.vue'

Vue.use(VueMoment);
Vue.use(VueResource);

// Setup a global header
Vue.http.options.xhr = {withCredentials: true};
Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;
Vue.http.options.crossOrigin = true;
Vue.http.options.crossDomain = true;

Vue.http.headers.common['content-type'] = 'application/x-www-form-urlencoded';

new Vue({
  el: '#app',
  render: h => h(App)
});
