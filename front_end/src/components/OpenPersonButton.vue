<template>
    <button @click="open_person">Open</button>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            id: 0
        }
    },
    methods: {
        open_person() {
            this.$router.push({name: 'viewPerson', params: { person_id: this.id}});
        }
    }
})
</script>


