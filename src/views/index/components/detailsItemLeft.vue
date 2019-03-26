<template>
    <section class="i-item-l" >

        <!-- <p v-if="item" class="f25 fb m5_0 c-tit">{{item.equipmentName || '　'}}</p> -->
        <div class="ub ub-ac pb3 ub-pc">
            <div  class="ub-f1" :class="[ score && score.isUp ? 'c-gre' : 'c-red']">
                <div class="ub ub-ac ub-pc">
                    <p class="f36 fb m5_0">{{item && item.realTimeScore && item.realTimeScore !== 'NaN' ? item.realTimeScore.toFixed(1) : '0.0'}}</p>
                    <img v-if="item" :src="score && score.isUp ? up : down" class="iil-ico">
                </div>
                <div class="ub ub-pc f22 fb">
                    <p class="m5_0 c-3">{{item && item.startScore && item.startScore !== 'NaN' ? item.startScore.toFixed(1) : '0.0'}}</p>
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
            <div v-if="item && item.warningList && item.warningList.length > 0" >
                
                <div v-for="lItem in item.warningList" class="ub f16 tx-c">
                    <p class="uw0 ub-f2 p10_0 m0 c-gray">{{lItem.sparePartName}}</p>
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

            if (!this.item){
                return;
            }

            let rS = this.item.realTimeScore && this.item.realTimeScore !== 'NaN' ? this.item.realTimeScore : 0, 
                sS = this.item.startScore && this.item.startScore !== 'NaN' ? this.item.startScore : 0;

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
.i-item-l{width: 100%;min-height:350px;min-width: 150px;margin: 20px 0 0;padding: 10px 10px 0;border: 1px solid #f5f5f5;border-radius: 3px;-webkit-border-radius: 3px;}
.i-item-lb{padding: 8px 0 0;border-top:1px solid #f5f5f5;}
.i-item-th{margin:0;padding: 6px 0;background-color: #f2f4f5;font-weight: bold;text-align: center;}
.iil-ico{width: 20px;margin-left: 15px;}
</style>




