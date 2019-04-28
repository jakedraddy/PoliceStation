<template>
    <div>
        <h1>Welcome {{ $root.user.FirstName }}</h1>
        <router-link :to="'/employees'">Employees</router-link>
        <router-link :to="'/about'">About</router-link>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    
})
</script>
