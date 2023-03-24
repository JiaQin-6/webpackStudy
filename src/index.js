import { createApp } from 'vue';
import App from './App.vue';
import 'lib-flexible';
import add from 'webpack-component-david';

console.log(add);
const app = createApp(App);
app.mount('#app');
