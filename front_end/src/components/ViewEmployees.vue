<template>
    <div>
        <ul id="v-for-object" class="employee">
            <li v-for="employee in employees"
            v-bind:key="employee.PersonId"
            v-bind:employee="employee">
                {{ employee.PersonId }} {{ employee.FirstName }} {{ employee.LastName }} <OpenPersonButton id="{{ employee.PersonId }}"></OpenPersonButton>
            </li>
        </ul>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { Employee, Person } from '../../../common/src/station';
export default Vue.extend({
    data() {
        return {
            employees: [] as Person[]
        }
    },
    mounted: function() {
        fetch('localhost/api/employee/all', {
            method: 'get'
        }).then((response) => {
            return response.json()
        }).then((jsonData) => {
            this.employees = jsonData;
        })
    }
});
</script>
