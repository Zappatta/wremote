<template>
  <v-app>
    <Main/>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Main from './components/Main/Main.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Main,
  },

  data: () => ({
    //
  }),
});
</script>
