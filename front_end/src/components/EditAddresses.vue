<template>
        <div id="v-for-object" class="emails">
            <div v-for="email in emails"
                :key="email.EId"
                :email="email">


                {{ Case.CaseId }} {{ Case.DateEntered }} {{ Case.Status }} {{ Case.Title }} <button @click="open_case(Case.CaseId)">Open</button>
            </div>
        </div>
</template>


<script lang="ts">

import * as station from "../../../common/src/station"

import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            emails: [] as station.Email[]
        }
    }
})
</script>
