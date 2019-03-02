<template>
    <div>
<!--         <div class="i-hd">
            <el-tag size="small">洛阳洛齿物联网有限公司管理后台</el-tag>
        </div>
 -->        
        <div class="d-wrap ub">
           <!--  <div class="d-item">
                <div class="d-item-tit">第一部分</div>
                <div class="d-item-con">
                    <a href="#/index/detail" class="d-item-li" :class="[switchColor(85)]">立磨减速机 <span class="">85分</span></a>
                </div>
            </div>
            <div class="d-item">
                <div class="d-item-tit">第二部分</div>
                <div class="d-item-con">
                    <a href="#/index/detail" class="d-item-li" :class="[switchColor(94)]">窑主减速机 <span class="">94分</span></a>
                </div>
            </div>
            <div class="d-item">
                <div class="d-item-tit">第三部分</div>
                <div class="d-item-con">
                    <a href="#/index/detail" class="d-item-li" :class="[switchColor(65)]">煤磨减速机 <span class="">65分</span></a>
                </div>
            </div>
            <div class="d-item">
                <div class="d-item-tit">第四部分</div>
                <div class="d-item-con">
                    <a href="#/index/detail" class="d-item-li" :class="[switchColor(78)]">一号辊压机动辊减速机 <span class="">78分</span></a>
                    <a href="#/index/detail" class="d-item-li" :class="[switchColor(80)]">一号辊压机定辊减速机 <span class="">80分</span></a>
                    <a href="#/index/detail" class="d-item-li" :class="[switchColor(65)]">二号辊压机动辊减速机 <span class="">65分</span></a>
                    <a href="#/index/detail" class="d-item-li" :class="[switchColor(53)]">二号辊压机定辊减速机 <span class="">53分</span></a>
                </div>
            </div>
            <div class="d-item">
                <div class="d-item-tit">第五部分</div>
                <div class="d-item-con">
                    <a href="#/index/detail" class="d-item-li" :class="[switchColor(81)]">一号中心传动减速机 <span class="">81分</span></a>
                    <a href="#/index/detail" class="d-item-li" :class="[switchColor(92)]">二号中心传动减速机 <span class="">92分</span></a>
                </div>
            </div>
            <div class="d-item">
                <div class="d-item-tit">第六部分</div>
                <div class="d-item-con">
                    <a href="#/index/detail" class="d-item-li" :class="[switchColor(75)]">入库头提减速机 <span class="">75分</span></a>
                    <a href="#/index/detail" class="d-item-li" :class="[switchColor(55)]">入窑头提减速机（北） <span class="">55分</span></a>
                    <a href="#/index/detail" class="d-item-li" :class="[switchColor(81)]">入窑头提减速机（南） <span class="">81分</span></a>
                    <a href="#/index/detail" class="d-item-li" :class="[switchColor(90)]">斜拉链减速机 <span class="">90分</span></a>
                </div>
            </div> -->
            
            <el-card id="dLeft" shadow="hover" class="i-card">
                <div class="ub" style="padding: 20px;">
                    <details-item-left style="margin:0" :item="data"></details-item-left>
                    <div class="d-img ub-f1">
                        <img v-if="data" :src="'http://47.101.57.230/img/' + data.sort + '.jpg'">
                    </div>
                </div>
                <details-chart-of-k-line :W="leftChartStyle.W" :H="leftChartStyle.H" :period="period" :title="data && data.equipmentName" :data="kLineData" @switchKlineType="switchKlineType"></details-chart-of-k-line>
            </el-card>

            <div class="i-card-m ub ub-ver">
                <details-question colorType="0" class="ub-f1 uh0"></details-question>
                <details-question colorType="1" class="ub-f1 uh0 mt20"></details-question>
            </div>

            <div class="i-card-r ub ub-ver">
                <details-item v-for="(cItem, j) in (data && data.warningList)" :item="cItem" :class="[j!==0 ? 'mt15' : '']" class="uh0 ub-f1"></details-item>
            </div>
            
        </div>
    </div>
</template>

<script>
import detailsChartOfKLine from './components/detailsChartOfKLine'
import detailsItemLeft from './components/detailsItemLeft'
import detailsQuestion from './components/detailsQuestion'
import detailsItem from './components/detailsItem'
import yamoji from 'static/img/yanmoji.png'

import { APIGetEquipmentKData, APIGetEquipmentRealtime } from '@/api/luochi'
export default {
    name: 'detailss',
    data(){
        return {
            yamoji: yamoji,
            leftChartStyle: {
                W: 0,
                H: 0
            },

            deviceName: this.$route.query.deviceName,
            period: 7,

            kLineData: null,
            data: null,

            timer: null
        }
    },
    components: {
        detailsItemLeft, detailsChartOfKLine, detailsQuestion, detailsItem
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

            let W = document.getElementById("dLeft").offsetWidth;

            this.leftChartStyle.W = W;
            this.leftChartStyle.H = W*9/16;


            this.deviceName = this.$route.query.deviceName;
            this.period = 7,

            this.getEquipmentRealtime();
            this.getEquipmentKData();

            this.realtimeDataTimer();

        },

        getEquipmentRealtime(){
            this.data = null;
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

        getEquipmentKData(){
            // this.kLineData = null;
            let ops = {
                deviceName: this.deviceName,
                period: this.period
            }
            APIGetEquipmentKData(ops).then(res => {

                this.kLineData = res.data;
            })
        },

        switchKlineType(period){

            this.period = period;
            this.getEquipmentKData();
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
.i-hd{background-color: #f9f9f9;padding: 10px 20px;}
.d-wrap{padding: 0 20px 20px;margin: 20px 0;}
.d-wrap:after{content: "";display:block;clear:both;}
.d-item{float: left;width: 32%;margin: 20px 1% 0 0;border-radius: 5px;-webkit-border-radius: 5px;background-color: #e5e5e5;box-sizing: border-box;-webkit-box-sizing: border-box;}
.d-item:hover{box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);-webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);}
.d-item-tit{background-color: #4a9ff9;height: 50px; line-height: 50px; overflow: hidden; padding: 0 20px; text-align: center; color: #fff; border-radius: 3px 3px 0 0;box-sizing: border-box;-webkit-box-sizing: border-box;}
.d-item-con{padding: 15px;box-sizing: border-box;-webkit-box-sizing: border-box;}
.d-item-li{display: block;cursor: pointer; width: 100%; padding: 20px 10px; margin: 8px 0; background-color: #fff; color:#666;text-align: left;  -webkit-box-sizing: border-box; box-sizing: border-box; -webkit-box-shadow: 0 1px 3px 0 rgba(0,0,0,.2); box-shadow: 0 1px 3px 0 rgba(0,0,0,.2);box-sizing: border-box;-webkit-box-sizing: border-box;}
.d-item-li:hover{opacity: 0.9;transform: scale(1.05);-webkit-transform: scale(1.05);}
.d-item-li span{color: blue;font-weight: bold;float: right;}
.d-item-li.green{background-color: #1ACF90;}
.d-item-li.yellow{background-color: #F8E71C;}
.d-item-li.red{background-color: #F95F56;}


.i-card{width: 34%;}
.d-img{display: flex;align-items: center;margin-left: 15px;border: 1px solid #f5f5f5;border-radius: 3px;-webkit-border-radius: 3px;}
.d-img>img{display: block;width:100%;display: table-cell;vertical-align: middle;align-items: center;}
.i-card-m{position: relative;width: 27%;margin-left: 1.5%;}
.i-card-r{position: relative;width: 36%;margin-left: 1.5%;}
</style>
