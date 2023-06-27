import { createApp } from 'vue';
import App from '../../App.vue';
const app = createApp(App);
import router from '../../router/index';
import add from 'webpack-component-david';
import 'lib-flexible';

console.log(add);
app.use(router).mount('#app');
