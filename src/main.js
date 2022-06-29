import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router';
import '@/assets/base.css';

const app = createApp(App);

app.use(createPinia())
app.use(router)

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.mount('#app')


