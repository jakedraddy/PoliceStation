<template>
    <form>
        <input v-bind:employee="employee">
        <button @click="save">Save</button>
        <p class='submit_message' v-if='this.save_message'>{{ save_message }}</p>
    </form>
</template>


<script lang="ts">
import Vue from 'vue'
import { Employee } from '../../../common/src/station';
import * as axios from 'axios';
import { get_person } from '../../../back_end/src/station_get_mapper';

export default Vue.extend({
    data() {
        return {
            employee: new Employee()
        }
    },
    methods: {
        save() {
            axios.default({
                method: 'post',
                url: '/api/employee/create',
                data: this.employee,
            }).then((response) => {
                this.save_message = "Saved!";
            });
        }
    }
})
</script>
