<template>
    <div>
        <p class="p10">{{name}} 设备实时分值</p>
    </div>
</template>

<script>
export default {
    name: 'index',
    data(){
        return {

            id: null,
            name: null
        }
    },
    components: {

    },
    watch: {
        "$route"(val){
            this.init();
        }
    },
    mounted(){
        this.init();
    },
    methods: {

        init(){
            this.id = this.$route.query.id;
            this.name = this.$route.query.name;
        }
    }
}
</script>

<style scoped>

</style>
