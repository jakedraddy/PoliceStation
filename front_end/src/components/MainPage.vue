<template>
    <div>
        <b-jumbotron fluid>
        <!-- > <p> Welcome {{ $root.user.FirstName }}</p> < -->
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
                <b-list-group-item class="w-25"><b-button @click="ViewEmp">List of all Visits</b-button></b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="CreateEmp">New Visit</b-button></b-list-group-item>
            </b-list-group>
            <b-list-group horizontal>
                <b-list-group-item class="w-25">Arrests</b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="ViewEmp">Arrest Tracker</b-button></b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="CreateEmp">New Arrest</b-button></b-list-group-item>
            </b-list-group>
            <b-list-group horizontal>
                <b-list-group-item class="w-25">Cases</b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="ViewEmp">List of Cases</b-button></b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="CreateEmp">New Case</b-button></b-list-group-item>
            </b-list-group>
            <b-list-group horizontal>
                <b-list-group-item class="w-25">Forensic Tests</b-list-group-item>
                <b-list-group-item class="w-25"><b-button @click="ViewEmp">List of Forensic Tests</b-button></b-list-group-item>
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
        ViewPerson: function () {
            this.$router.replace("");
        },
        CreatePerson: function () {
            this.$router.replace("");
        },
        ViewEmp: function () {
            this.$router.replace("employees");
        },
        CreateEmp: function () {
            this.$router.replace("");
        },
        ViewCase: function () {
            this.$router.replace("");
        },
        CreateCase: function () {
            this.$router.replace("");
        },
    }
})
</script>
