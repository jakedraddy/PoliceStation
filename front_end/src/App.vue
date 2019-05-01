<template>
  <div>
    <div>
      <b-nav tabs> 
        <b-nav-item disabled><b>Police Station Database</b></b-nav-item>
        <b-nav-item v-if="$root.user"><b-link :to="'/main'">Main Page</b-link></b-nav-item>
        <b-nav-item v-if="!$root.user"><b-link :to="'/'">Login</b-link></b-nav-item>
        <b-nav-item><b-link :to="'/about'">About</b-link></b-nav-item>
        <b-nav-item v-if="$root.user"><b-link :to="'/'">Logout</b-link></b-nav-item>
      </b-nav>
    </div>
    <router-view></router-view>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

export default Vue.extend({
  components: {
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
