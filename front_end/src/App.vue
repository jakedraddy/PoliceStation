<template>
  <div>
    <div>
      <Header/>

    </div>
    <router-link :to="'/'">Login</router-link>
    <router-link :to="'/about'">About</router-link>

    <router-view></router-view>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from './components/Header.vue'

export default Vue.extend({
  components: {
    Header,
  },
  data() {
    return  {
      session: {},
      listsOfData: [],
      index: 0
    }
  }
});

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
