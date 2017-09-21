<template>
    <stack-layout>
        <label class="large">Test Component</label>

        <label>{{ $data }}</label>

        <text-field v-model="name"></text-field>
        <text-field v-model="age"></text-field>
        <text-field v-model="occupation"></text-field>
    </stack-layout>
</template>

<script>
    export default {

        data() {
            return {
                name: 'John',
                age: 34,
                occupation: 'Developer'
            }
        }
    }
</script>

<style scoped>
    .large {
        font-size: 40;
    }
</style>