<template>
    <div>

        <div class="d-wrap">
            

            <details-item v-for="(cItem, j) in (data && data.warningList)" :item="cItem" class="d-item"></details-item>
            
            <p class="p30 c-9" v-if="data && data.warningList && data.warningList.length === 0">暂无数据</p>
        </div>
    </div>
</template>

<script>
import detailsItem from './components/detailsItem'
import yamoji from 'static/img/yanmoji.png'

import { APIGetEquipmentRealtime } from '@/api/luochi'
export default {
    name: 'detailss',
    data(){
        return {
            yamoji: yamoji,


            deviceName: this.$route.query.deviceName,
            period: 7,

            data: null,

            timer: null
        }
    },
    components: {
       detailsItem
    },
    watch: {
        "$route"(val){
            this.init();
        }
    },
    beforeDestroy(){

        if (this.timer){
            clearInterval(this.timer);
        }
    },
    mounted(){

        this.init();
    },
    methods: {

        init(){

            this.deviceName = this.$route.query.deviceName;
            this.period = 7;

            this.getEquipmentRealtime();

            this.realtimeDataTimer();

        },

        getEquipmentRealtime(){
            // this.data = null;
            let ops = {
                deviceName: this.deviceName
            }
            APIGetEquipmentRealtime(ops).then(res => {

                this.data = res.data;

                this.data.warningList.sort((a, b) => {
                    return a.sort - b.sort;
                })

            })
        },



        realtimeDataTimer(){

            this.timer = setInterval( this.getEquipmentRealtime, 60 * 1000)
        },

        switchColor(score){
            score = parseInt(score);
            let clazz = ''
            if (score >= 80){
                clazz = 'green'
            } else if ( score >= 60 && score < 80){
                clazz = 'yellow'
            } else if ( score < 60){
                clazz = 'red'
            }
    
            return clazz;
        }
    }
}
</script>
<style>
.d-wrap .el-card__body{padding: 0;}
</style>
<style scoped>
.d-wrap{padding: 0 20px 20px;margin: 20px 0;}
.d-wrap:after{content: "";display:block;clear:both;}
.d-item{float:left;display: block;width: 48%;height: 182px;margin: 0 1.5% 1.5% 0;}
</style>
