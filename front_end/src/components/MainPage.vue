<template>
    <div>
        <h1>Welcome {{ $root.user.FirstName }}</h1>
        <b-link :to="'/employees'">Employees</b-link>
        <b-link :to="'/about'">About</b-link>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    
})
</script>
