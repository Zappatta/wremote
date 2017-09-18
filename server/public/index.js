import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify);

import MainVue from './components/Main.vue';



new Vue({
    el:"#main",
    render: h => h(MainVue)
});
