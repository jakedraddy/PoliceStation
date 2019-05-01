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
        ViewPeople: function () { this.$router.replace("main/People"); },
        CreatePerson: function () { this.$router.replace("main/People/add"); },
        ViewEmp: function () { this.$router.replace("main/Employees"); },
        CreateEmp: function () { this.$router.replace("main/People/add"); },
        ViewVisits: function () { this.$router.replace("main/Visits"); },
        CreateVisit: function () { this.$router.replace("main/Visits/add"); },
        ViewArrests: function () { this.$router.replace("main/Arrests"); },
        CreateArrest: function () { this.$router.replace("main/Arrests/add"); },
        ViewCases: function () { this.$router.replace("main/Cases"); },
        CreateCase: function () { this.$router.replace("main/Cases/add"); },
        ViewTests: function () { this.$router.replace("main/ForensicTests"); },
        CreateTest: function () { this.$router.replace("main/ForensicTests/add"); },
    }
})
</script>
