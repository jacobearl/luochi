<template>
    <div>
        <p class="p30 pb20 f18 fb m0">{{name}} 设备实时监控</p>
        <div class="rs-wrap">
            <realtime-item v-for="(item, i) in list" class="rs-item" :item="item" :style="{ 'width': getItemWidth(i)}"></realtime-item>
        </div>
    </div>
</template>

<script>
import realtimeItem from './components/realtimeItem'
import { APIGetProlineRealtime } from '@/api/luochi'
export default {
    name: 'index',
    data(){
        return {

            id: null,
            name: null,

            list: null
        }
    },
    components: {
        realtimeItem
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

            this.getList();
        },

        getList(){

            let ops = {
                proLineId: this.id
            }
            APIGetProlineRealtime(ops).then(res => {

                let arr = res.data.warningList;
                arr.sort((a, b) => {
                    return a.sort - b.sort;
                })

                this.list = arr;
            })
        },

        getItemWidth(i){//3,4,2,4
            
            // let w = 0;
            // if (i <= 2){
            //     w = '32.33%'
            // } else if (i > 2 && i <= 6){
            //     w = '24%'
            // } else if (i > 6 && i <= 8){
            //     w = '49%'
            // } else if (i > 8 && i <= 12){
            //     w = '24%'
            // }

            let w = '49%';
          

            return w;
        }
    }
}
</script>

<style scoped>
.rs-wrap{padding: 0 25px 25px 25px;}
.rs-wrap:after{content:'';display: block;clear:both;}
.rs-item{float:left;margin: 1% 1% 0 0;}
</style>
