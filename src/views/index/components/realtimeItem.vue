<template>
    <el-card shadow="hover" class="ri" id="diChart">
        
        <div class="di-wrap ub ub-ver">
            <div class="ub ub-f1">
                <a :href="'#/index/details?deviceName=' + item.deviceName" class="di-item ub ub-ver ub-pc">
                    <p class="f20 c-tit ut-s">{{item && item.equipmentName || '　'}}</p>
                    <div class="ub ub-ac ub-pc ub-f1">
                        <p class="f26" :class="[ score.isUp ? 'c-gre' : 'c-red']">{{score && score.rs && score.rs !== 'NaN' ? score.rs.toFixed(1) : '0.0'}}</p>
                        <img :src="score.isUp === false ? down : up" class="di-item-ico">
                    </div>
                    <div class="ub ub-ac ub-pc f19"  :class="[ score.isUp ? 'c-gre' : 'c-red']">
                        <div class="c-3">{{score && score.ss && score.ss !== 'NaN' ? score.ss : '0'}}</div>
                        <div class="ml15">{{score.percent || '0.00'}}%</div>
                    </div>
                </a>
                <div class="d-img ub-f1">
                    <img :src="'http://47.101.57.230/img/' + item.sort + '.jpg'" class="">
                </div>
            </div>
            <div class="ub f14 fb pt15 pb5">
                <div class="uw0 ub-f1 tx-c">温度: <span class="c-9">{{score.tem && score.tem.toFixed(1)}}°</span></div>
                <div class="uw0 ub-f1 tx-c">电量: <span class="c-9">{{score.ele && score.ele.toFixed(0)}}</span></div>
                <div class="uw0 ub-f1 tx-c">信号: <span class="c-9">{{score.sign && score.sign.toFixed(0)}}</span></div>
            </div>

            <aside v-show="score.ss === 0 && score.rs === 0" class="i-mask"></aside>
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
            },

            score: {},

            timer: null,
            num: 0
        }
    },
    components: {
        
    },
    beforeDestroy(){

        if (this.timer){
            clearInterval(this.timer);
        }
    },
    mounted(){
        setTimeout(this.init, 100)
        // this.init()
    },
    computed: {
        // score(){
        //     if (!this.item){
        //         return {
        //             percent: 0,
        //             isUp: true
        //         }
        //     }
        //     let rS = this.item.realTimeScore && this.item.realTimeScore !== 'NaN' ? this.item.realTimeScore : 0, 
        //         sS = this.item.startScore && this.item.startScore !== 'NaN' ? this.item.startScore : 0;

        //     let percent = (((rS - sS)/(sS || 100)) * 100).toFixed(2);

        //     return {
        //         percent,
        //         isUp: rS - sS >= 0 ? true : false
        //     }
        // }

    },

    methods:{
        
        init(){
            
            this.refreshScore();

            setInterval(this.refreshScore, 10 * 1000)
        },

        refreshScore(){

            let rs, ss, tem, ele, sign;
            if (!this.score.rs){
                rs = this.getRandom(70, 100);
                ss = this.getRandom(70, 100);
                tem = this.getRandom(50, 80);
                ele = this.getRandom(70, 100);
                sign = this.getRandom(80, 100);
            } else {
                ss = this.score.ss;
                ele = this.score.ele - (Math.random()*this.num);
                if (this.num % 4 === 0){
                    rs = this.score.rs + (Math.random()*this.num);
                    sign = this.score.sign - (Math.random()*this.num);
                } else {
                    rs = this.score.rs - (Math.random()*this.num);
                    sign = this.score.sign + (Math.random()*this.num);
                }

                if (this.num % 5 === 0){
                    tem = this.score.tem + (Math.random()*this.num);
                } else {
                    tem = this.score.tem - (Math.random()*this.num);
                }

            }

            this.score = {
                rs: rs,
                ss: ss,
                percent: (((rs - ss)/ss) * 100).toFixed(1),
                isUp: rs - ss >= 0 ? true : false,
                tem: tem,
                ele: ele,
                sign: sign
            }

            this.num ++ ;
        },

        getRandom(min, max){

            return Math.round((Math.random() * (max - min) + min) * 100) / 100;
        }

    }
}

</script>

<style>
.ri .el-card__body{padding: 10px;height: 180px;}
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




