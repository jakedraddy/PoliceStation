<template>
    <div>
        <p> Welcome {{ $root.user.FirstName }}</p>
        <b-list-group>
            <b-list-group-item><b-link :to="'/employees'">Employees</b-link></b-list-group-item>
            <b-list-group-item><b-link :to="'/cases'">Cases</b-link></b-list-group-item>
        </b-list-group>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    
})
</script>
