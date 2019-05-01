<template>
    <div>
        <b-jumbotron fluid>
        <p v-if="$root.user"> Welcome {{ $root.user.FirstName }}</p>
        <b-list-group>
            <b-list-group horizontal>
                <b-list-group-item class="w-25">Person List</b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="ViewEmp">View People</b-button></b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="CreateEmp">Add Person</b-button></b-list-group-item>
            </b-list-group>
            <b-list-group horizontal>
                <b-list-group-item class="w-25">Employees</b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="ViewEmp">View Employees</b-button></b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="CreateEmp">Add Employee</b-button></b-list-group-item>
            </b-list-group>
            <b-list-group horizontal>
                <b-list-group-item class="w-25">Visits</b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="ViewVisits">List of all Visits</b-button></b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="CreateEmp">New Visit</b-button></b-list-group-item>
            </b-list-group>
            <b-list-group horizontal>
                <b-list-group-item class="w-25">Arrests</b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="ViewArrests">Arrest Tracker</b-button></b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="CreateEmp">New Arrest</b-button></b-list-group-item>
            </b-list-group>
            <b-list-group horizontal>
                <b-list-group-item class="w-25">Cases</b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="ViewCases">List of Cases</b-button></b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="CreateEmp">New Case</b-button></b-list-group-item>
            </b-list-group>
            <b-list-group horizontal>
                <b-list-group-item class="w-25">Forensic Tests</b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="ViewTests">List of Forensic Tests</b-button></b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="CreateEmp">New Test</b-button></b-list-group-item>
            </b-list-group>
        </b-list-group>
        </b-jumbotron>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    methods: {
        ViewPerson: function () { this.$router.replace(""); },
        CreatePerson: function () { this.$router.replace(""); },
        ViewEmp: function () { this.$router.replace("main/Employees"); },
        CreateEmp: function () { this.$router.replace("main/Person/add"); },
        ViewVisits: function () { this.$router.replace("main/Visits"); },
        CreateVisit: function () { this.$router.replace(""); },
        ViewArrests: function () { this.$router.replace("main/Arrests"); },
        CreateArrest: function () { this.$router.replace(""); },
        ViewCases: function () { this.$router.replace("main/Cases"); },
        CreateCase: function () { this.$router.replace(""); },
        ViewTests: function () { this.$router.replace("main/ForensicTests"); },
        CreateTest: function () { this.$router.replace(""); },
        
    }
})
</script>
