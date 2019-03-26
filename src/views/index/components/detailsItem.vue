<template>
    <el-card shadow="hover" class="di" >
        
        <div class="ub di-wrap">
            <a href="javascript:void(0)" class="di-item ub ub-ver ub-pc">
                <p class="f22 c-tit">{{item.sparePartName}}</p>
                <div class="ub ub-ac ub-f1 mt15">
                    <p class="f26" :class="[ score.isUp ? 'c-gre' : 'c-red']">{{item.realTimeScore && item.realTimeScore !== 'NaN' ? item.realTimeScore.toFixed(1) : '0.0'}}</p>
                    <img :src="score.isUp === false ? down : up" class="di-item-ico">
                </div>
                <div class="ub f19 mt15"  :class="[ score.isUp ? 'c-gre' : 'c-red']">
                    <div class="ub-f1">{{item.startScore && item.startScore !== 'NaN' ? item.startScore : '0'}}</div>
                    <div class="ub-f1">{{score.percent}}%</div>
                </div>
            </a>
            <div class="di-chart ub-f1 ub ub-ver">
                <detail-chart-of-line class="ub-f1" :H="chartStyle.H" :data="item"></detail-chart-of-line>
            </div>
        </div>
    </el-card>
</template>

<script>

import up from 'static/img/up.png'
import down from 'static/img/down.png'

import detailChartOfLine from './detailChartOfLine'

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
        detailChartOfLine
    },
    mounted(){
        setTimeout(this.init, 100)
        // this.init()
    },
    computed: {
        score(){
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
            
            this.$nextTick(() => {

                // let H = document.getElementById("diChart").offsetHeight;

                this.chartStyle.H = 150;
                // console.log(H)
            })
        }

    }
}

</script>


<style scope>
.di{position: relative;}
.di-wrap{height:100%;padding: 15px;box-sizing: border-box;-webkit-box-sizing: border-box;}
.di-item{display: block;padding:10px 15px;min-width: 38%;border:1px solid #f5f5f5;font-weight: bold;margin:0;cursor: pointer;}
.di-item *{margin:0;}
.di-item-ico{width: 18px;margin-left: 15px;}
.di-chart{border:1px solid #f5f5f5;margin-left:10px;}
</style>




