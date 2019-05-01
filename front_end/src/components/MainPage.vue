<template>
    <div>
        <b-jumbotron>
        <p v-if="$root.user"> Welcome {{ $root.user.FirstName }}</p>
        <b-list-group>
            <b-list-group horizontal>
                <b-list-group-item class="w-25">Person List</b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="ViewPeople">View People</b-button></b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="CreatePerson">Add Person</b-button></b-list-group-item>
            </b-list-group>
            <b-list-group horizontal>
                <b-list-group-item class="w-25">Employees</b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="ViewEmp">View Employees</b-button></b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="CreateEmp">Add Employee</b-button></b-list-group-item>
            </b-list-group>
            <b-list-group horizontal>
                <b-list-group-item class="w-25">Visits</b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="ViewVisits">List of all Visits</b-button></b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="CreateVisit">New Visit</b-button></b-list-group-item>
            </b-list-group>
            <b-list-group horizontal>
                <b-list-group-item class="w-25">Arrests</b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="ViewArrests">Arrest Tracker</b-button></b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="CreateArrest">New Arrest</b-button></b-list-group-item>
            </b-list-group>
            <b-list-group horizontal>
                <b-list-group-item class="w-25">Cases</b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="ViewCases">List of Cases</b-button></b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="CreateCase">New Case</b-button></b-list-group-item>
            </b-list-group>
            <b-list-group horizontal>
                <b-list-group-item class="w-25">Forensic Tests</b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="ViewTests">List of Forensic Tests</b-button></b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="CreateTest">New Test</b-button></b-list-group-item>
            </b-list-group>
        </b-list-group>
        </b-jumbotron>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    methods: {
        ViewPeople: function () { this.$router.push("main/People"); },
        CreatePerson: function () { this.$router.push("main/People/add"); },
        ViewEmp: function () { this.$router.push("main/Employees"); },
        CreateEmp: function () { this.$router.push("main/People/add"); },
        ViewVisits: function () { this.$router.push("main/Visits"); },
        CreateVisit: function () { this.$router.push("main/Visits/add"); },
        ViewArrests: function () { this.$router.push("main/Arrests"); },
        CreateArrest: function () { this.$router.push("main/Arrests/add"); },
        ViewCases: function () { this.$router.push("main/Cases"); },
        CreateCase: function () { this.$router.push("main/Cases/add"); },
        ViewTests: function () { this.$router.push("main/ForensicTests"); },
        CreateTest: function () { this.$router.push("main/ForensicTests/add"); },
    }
})
</script>
