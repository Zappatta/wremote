import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify);

import '../node_modules/vuetify/dist/vuetify.min.css';

import MainVue from './components/Main/Main.vue';



new Vue({
    el:"#main",
    render: h => h(MainVue)
});
