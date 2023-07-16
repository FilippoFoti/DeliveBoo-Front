import { createApp } from 'vue'
import { router } from "./router";
document.title = "Deliveboo";
import App from './App.vue'
import 'bootstrap';

// createApp(App).mount('#app')
createApp(App).use(router).mount('#app');
