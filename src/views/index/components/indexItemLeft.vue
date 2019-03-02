<template>
    <section class="i-item-l">

        <p class="f26 fb m5_0 c-tit">{{item && item.proLineName || '　'}}</p>
        <div class="ub ub-ac pb3" v-if="item">
            <div  class="ub-f1" :class="[ score && score.isUp ? 'c-gre' : 'c-red']">
                <div class="ub ub-ac">
                    <p class="f36 fb m5_0">{{item.data && item.data.realTimeScore && item.data.realTimeScore !== 'NaN' ? item.data.realTimeScore.toFixed(1) : '0.0'}}</p>
                    <img v-if="item.data" :src="score && score.isUp ? up : down" class="iil-ico">
                </div>
                <div class="ub f22 fb">
                    <p class="m5_0 c-3">{{item.data && item.data.startScore && item.data.startScore !== 'NaN' ? item.data.startScore.toFixed(1) : '0.0'}}</p>
                    <p class="ml10 m5_0">{{score && score.percent || '0.00'}}%</p>
                </div>
            </div>
            <!-- <svg-icon icon-class="up" class="c-red f28 ml5"></svg-icon> -->
        </div>
        <div class="i-item-lb">
            <div class="ub f18 c-tit">
                <p class="uw0 ub-f2 i-item-th">名称</p>
                <p class="uw0 ub-f1 i-item-th ml5">分数</p>
            </div>
            <div v-if="item && item.data && item.data.warningList && item.data.warningList.length > 0" >
                
                <div v-for="lItem in item.data.warningList" class="ub f16 tx-c">
                    <p class="uw0 ub-f2 p10_0 m0 c-gray">{{lItem.equipmentName}}</p>
                    <p class="uw0 ub-f1 p10_0 m0" :class="[ score && score.isUp ? 'c-gre' : 'c-red']">{{lItem.realTimeScore.toFixed(1)}}</p>
                </div>
            </div>
            <div v-else class="pt30 tx-c c-6 f13">暂无数据</div>
        </div>
    </section>
</template>

<script>

import up from 'static/img/up.png'
import down from 'static/img/down.png'

import { APIGetProlineRealtime } from '@/api/luochi'

export default {
    props: [ 'item' ],
    data(){
        return {
            up, down,
        }
    },

    computed: {
        score(){

            if (!this.item || !this.item.data){
                return;
            }

            let rS = this.item.data.realTimeScore && this.item.data.realTimeScore !== 'NaN' ? this.item.data.realTimeScore : 0, 
                sS = this.item.data.startScore && this.item.data.startScore !== 'NaN' ? this.item.data.startScore : 0;

            let percent = (((rS - sS)/(sS || 100)) * 100).toFixed(2);

            return {
                percent,
                isUp: rS - sS >= 0 ? true : false
            }
        }
    },
    mounted(){
        // console.log(this.item)
    },
    methods:{
        
        // getProlineRealtime(proLineId){

        //     let ops = {
        //         proLineId: proLineId
        //     }
        //     APIGetProlineRealtime(ops).then(res => {

        //         this.data = res.data;

        //         this.$emit('refreshLine', this.data.history)
        //     })
        // }
    }
}

</script>


<style>
.i-item-l{width: 33%;min-height:350px;min-width: 150px;margin: 20px 0 0;padding: 10px 10px 0;border: 1px solid #f5f5f5;border-radius: 3px;-webkit-border-radius: 3px;}
.i-item-lb{padding: 8px 0 0;border-top:1px solid #f5f5f5;}
.i-item-th{margin:0;padding: 6px 0;background-color: #f2f4f5;font-weight: bold;text-align: center;}
.iil-ico{width: 20px;margin-left: 15px;}
</style>




