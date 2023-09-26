import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from "vue3-apexcharts";
import store from './store/store'
createApp(App).use(router).use(VueApexCharts).use(store).mount('#app')
