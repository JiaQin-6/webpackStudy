import { createApp } from 'vue';

import add from 'webpack-component-david';
import App from './App.vue';
import 'lib-flexible';

console.log(add);
const app = createApp(App);
app.mount('#app');
