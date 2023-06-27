import { createApp } from 'vue';
import App from '../../App.vue';
const app = createApp(App);
import router from '../../router/index';
import store from '../../store/index';
import http from '../../axios/index';
app.config.globalProperties.$http = http;
import add from 'webpack-component-david';
import 'lib-flexible';

console.log(add);
app.use(router).use(store).mount('#app');
