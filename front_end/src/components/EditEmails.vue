<template>

</template>


<script lang="ts">
import * as station from "../../../common/src/station"

import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
        }
    },
    props: {
        person: {
            required: true,
            type: station.Person
        }
    },
    methods: {

    }
})
</script>
