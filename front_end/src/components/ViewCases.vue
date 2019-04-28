<template>
    
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Case } from '../../../common/src/station'
    import * as axios from 'axios';
export default Vue.extend({
    data() {
        return {
            cases: [] as Case[]
        }
    },
    mounted: function() {
        axios.default({
            method: 'post',
            url: '/api/cases/all'
        }).then((response) => {
            this.employees = response.data;
        });
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
