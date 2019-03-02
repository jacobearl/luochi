<template>
    <el-card shadow="hover" class="ri" id="diChart">
        
        <div class="ub di-wrap">
            <a :href="'#/index/details?deviceName=' + item.deviceName" class="di-item ub ub-ver ub-pc">
                <p class="f20 c-tit">{{item && item.equipmentName || '　'}}</p>
                <div class="ub ub-ac ub-pc ub-f1">
                    <p class="f26" :class="[ score.isUp ? 'c-gre' : 'c-red']">{{item && item.realTimeScore && item.realTimeScore !== 'NaN' ? item.realTimeScore.toFixed(1) : '0.0'}}</p>
                    <img :src="score.isUp === false ? down : up" class="di-item-ico">
                </div>
                <div class="ub ub-ac ub-pc f19"  :class="[ score.isUp ? 'c-gre' : 'c-red']">
                    <div class="">{{item && item.startScore && item.startScore !== 'NaN' ? item.startScore : '0'}}</div>
                    <div class="ml15">{{score.percent || '0.00'}}%</div>
                </div>
            </a>
            <div class="d-img ub-f1">
                <img :src="'http://47.101.57.230/img/' + item.sort + '.jpg'" class="">
            </div>

            <aside v-show="item.startScore === 0 && item.realTimeScore === 0" class="i-mask"></aside>
        </div>
    </el-card>
</template>

<script>

import up from 'static/img/up.png'
import down from 'static/img/down.png'

export default {
    props: [ 'item' ],
    data(){
        return {
            up, down,

            chartStyle: {
                W: 0,
                H: 0
            }
        }
    },
    components: {
        
    },
    mounted(){
        setTimeout(this.init, 100)
        // this.init()
    },
    computed: {
        score(){
            if (!this.item){
                return {
                    percent: 0,
                    isUp: true
                }
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
    methods:{
        
        init(){
            
        }

    }
}

</script>

<style>
.ri .el-card__body{padding: 10px;height: 140px;}
</style>
<style scope>
.ri{position: relative;}
.di-wrap{height:100%;position: relative;}
.di-item{display: block;max-width: 60%;padding:10px;border:1px solid #f5f5f5;font-weight: bold;margin:0;cursor: pointer;}
.di-item *{margin:0;}
.di-item-ico{width: 18px;margin-left: 15px;}
.d-img{position: relative;display: flex;align-items: center;border:1px solid #f5f5f5;margin-left:10px;padding:10px 0;}
.d-img>img{display: block;max-width:100%;max-height:100px;display: table-cell;vertical-align: middle;align-items: center;margin: 0 auto;}
.i-mask{display: block;position:absolute;width:100%;height:100%;top:0;left:0;background-color: #f1f1f1; opacity: 0.6;}

</style>




