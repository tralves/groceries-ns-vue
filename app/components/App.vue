<template>
    <page>
        <action-bar title="{N}-Vue + Rollup"></action-bar>
        <stack-layout>
            <label>Count: {{ count }}</label>

            <button @tap="count--">-1</button>

            <test-component style="margin-top: 40;"></test-component>
        </stack-layout>
    </page>
</template>

<script>
    import TestComponent from './TestComponent.vue'

    export default {

        data() {
            return {
                count: 10
            }
        },

        components: {
            TestComponent
        }
    }
</script>

<style scoped>
    label {
        text-align: center;
        font-size: 25;
    }

    Button {
        background-color: #00caab;
    }


</style>