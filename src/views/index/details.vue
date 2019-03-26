<template>
    <div>
<!--         <div class="i-hd">
            <el-tag size="small">洛阳洛齿物联网有限公司管理后台</el-tag>
        </div>
 -->        
        <div class="d-wrap ub">
            <div id="dLeft" class="ub-f1 ub ub-ver">
                <el-card shadow="hover" >
                    <details-chart-of-k-line class="ub-f1" :W="leftChartStyle.W" :H="leftChartStyle.H * 0.8" :period="period" :title="data && data.equipmentName" :data="kLineData" @switchKlineType="switchKlineType"></details-chart-of-k-line>
                </el-card>
                <el-card shadow="hover" class="mt20 p20">
                    <details-chart-of-line :data="data"  :H="leftChartStyle.H * 0.2"></details-chart-of-line>
                </el-card>
            </div>
            <el-card id="dRight" shadow="hover" class="i-card">
                <a :href="'#/index/detail?deviceName=' + deviceName" class="" style="display:block;padding: 20px;">
                    <p v-if="data" class="f25 fb m5_0">{{data.equipmentName || '　'}}</p>
                    <div class="d-img">
                        <img v-if="data" :src="'http://47.101.57.230/img/' + data.sort + '.jpg'">
                    </div>
                    <details-item-left style="margin:0" :item="data"></details-item-left>
                </a>
            </el-card>

           <!--  <div class="i-card-m ub ub-ver">
                <details-question colorType="0" class="ub-f1 uh0"></details-question>
                <details-question colorType="1" class="ub-f1 uh0 mt20"></details-question>
            </div> -->

           <!--  <div class="i-card-r ub ub-ver">
                <details-item v-for="(cItem, j) in (data && data.warningList)" :item="cItem" :class="[j!==0 ? 'mt15' : '']" class="uh0 ub-f1"></details-item>
            </div> -->
            
        </div>
    </div>
</template>

<script>
import detailsChartOfKLine from './components/detailsChartOfKLine'
import detailsChartOfLine from './components/detailsChartOfLine'
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
        detailsItemLeft, detailsChartOfKLine, detailsChartOfLine, detailsQuestion, detailsItem
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

            // let W = document.getElementById("dLeft").offsetWidth;
            // // let H = document.getElementById("dRight").offsetHeight;

            // this.leftChartStyle.W = W;
            // this.leftChartStyle.H = 625;

            this.deviceName = this.$route.query.deviceName;
            this.period = 7;

            this.getEquipmentRealtime();
            this.getEquipmentKData();

            this.realtimeDataTimer();

        },

        getEquipmentRealtime(){
            // this.data = null;
            let ops = {
                deviceName: this.deviceName
            }
            APIGetEquipmentRealtime(ops).then(res => {

                this.data = res.data;

                // this.data.warningList.sort((a, b) => {
                //     return a.sort - b.sort;
                // })

                if (this.kLineData){
                    
                    let len =  this.kLineData.length - 1;

                    this.$set(this.kLineData[len],  'startScore', this.data.startScore);
                    this.$set(this.kLineData[len],  'endScore', this.data.endScore);
                    this.$set(this.kLineData[len],  'lowScore', this.data.lowScore);
                    this.$set(this.kLineData[len],  'highScore', this.data.highScore);
                    this.$set(this.kLineData[len],  'createTime', this.data.createTime);
                }


                this.$nextTick(() => {
                    let W = document.getElementById("dLeft").offsetWidth;
                    let H = document.getElementById("dRight").offsetHeight;

                    this.leftChartStyle.W = W;
                    this.leftChartStyle.H = H;
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


.i-card{width: 28%;margin-left: 20px;cursor: pointer;}
.d-img{display: flex;align-items: center;margin:20px 0;border: 1px solid #f5f5f5;border-radius: 3px;-webkit-border-radius: 3px;}
.d-img>img{display: block;width:100%;display: table-cell;vertical-align: middle;align-items: center;}
.i-card-m{position: relative;width: 27%;margin-left: 1.5%;}
.i-card-r{position: relative;width: 36%;margin-left: 1.5%;}
</style>
