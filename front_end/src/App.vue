<template>
  <div>
    <div v-show="!1">
      <Header/>
    </div>
    <div v-if="1">
      <Login/>
    </div>
    <div v-else-if="2">
      <MainPage/>
    </div>
    <div v-else-if="3">
      <ViewEmployees/>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from './components/Header.vue'
import Login from './components/Login.vue'
import MainPage from './components/MainPage.vue'
import ViewEmployees from './components/ViewEmployees.vue'
import { response } from 'express';

@Component({
  components: {
    Header,
    Login,
    MainPage
  },
  data() {
    return  {
      listsOfData: [],
      index: 0
    }
  },
  mounted: function() {
    fetch('localhost:8080/WhateverYouWantThisToBe', {
      method: 'get'
    }).then((response) => {
      return response.json()
    }).then((jsonData) => {
      this.listsOfData = jsonData.results //This is the name of the array given by the backend
    })
  }
})
export default class App extends Vue {}
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
