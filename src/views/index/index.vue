<template>
    <div class="pb20">
<!--         <div class="i-hd">
            <el-tag size="small">洛阳洛齿物联网有限公司管理后台</el-tag>
        </div> -->
        <div v-if="list" v-for="i in 2" class="ub i-wrap">
            <!-- <a href="#/index/details" class="cur uw0 ub-f1" v-for="j in 2"> -->
            <a href="javascript:void(0)" class="cur uw0 ub-f1" v-for="j in 2" >
                <el-card shadow="hover" class="i-card pr" v-if="list[(i-1)*2+(j-1)]">

                    <a :href="'#/index/realtimeScore?id=' + list[(i-1)*2+(j-1)].id + '&name=' + list[(i-1)*2+(j-1)].proLineName" :id="'chartCon' + i + j" class="ub">

                        <index-item-left :item="list[(i-1)*2+(j-1)]"></index-item-left>

                        <div class="ub-f1">
                            <chart-of-line :item="list[(i-1)*2+(j-1)]" :colorType="j" class="ub-f1" :H="chartStyle.H" :W="chartStyle.W"></chart-of-line>
                            <chart-of-k-line :item="list[(i-1)*2+(j-1)]" :colorType="j" class="ub-f1" :H="chartStyle.H" :W="chartStyle.W"></chart-of-k-line>
                        </div>
                    </a>
                    <!-- <index-table></index-table> -->
                    <aside v-show="list[(i-1)*2+(j-1)].data === null" class="i-mask"></aside>
                </el-card>

            </a>
            <!-- <a href="#/index/details" class="cur uw0 ub-f1">
                <el-card shadow="hover" style="margin-left: 20px">
                    <chart-of-line colorType="2"></chart-of-line>
                    <index-table></index-table>
                </el-card>
            </a> -->
        </div>
        <!-- <div class="ub i-wrap">
            <a href="#/index/details" class="cur uw0 ub-f1">
                <el-card shadow="hover">
                    <chart-of-line colorType="2"></chart-of-line>
                    <index-table></index-table>
                </el-card>
            </a>
            
            <a href="#/index/details" class="cur uw0 ub-f1">
                <el-card shadow="hover" style="margin-left: 20px">
                    <chart-of-line colorType="1"></chart-of-line>
                    <index-table></index-table>
                </el-card>
            </a>
        </div>
         -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import indexItemLeft from './components/indexItemLeft'
import chartOfLine from './components/chartOfLine'
import chartOfKLine from './components/chartOfKLine'
import indexTable from './components/indexTable'

import { APIGetProlineList, APIGetProlineRealtime, APIGetProlineKData } from '@/api/luochi'
export default {
    name: 'index',
    data(){
        return {
            chartStyle: {
                W: 0,
                H: 0
            },
            imgs: [
                'https://topcoin.oss-cn-hangzhou.aliyuncs.com/front/pc_banner_1.png',
                'https://topcoin.oss-cn-hangzhou.aliyuncs.com/front/pc_banner_2.png',
                'https://topcoin.oss-cn-hangzhou.aliyuncs.com/front/pc_banner_3.jpg'
            ],

            list: null,

            timer: null

        }
    },
    components: {
        indexItemLeft, chartOfLine, chartOfKLine, indexTable
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

            
            this.getListData();
        },

        getListData(){

            
            APIGetProlineList().then(res => {

                this.list = res.data;

                this.$nextTick(() => {

                    let H = document.getElementById("chartCon11").offsetHeight;

                    // this.chartStyle.W = '';
                    this.chartStyle.H = H/2;
                })

                this.list.forEach((item, i) => {

                    this.getProlineRealtime(item.id, i);
                    this.getProlineKData(item.id, i);
                })

                this.realtimeDataTimer();
            })
        },


        getProlineRealtime(proLineId, index){

            let ops = {
                proLineId: proLineId,
                isAll: false
            }
            APIGetProlineRealtime(ops).then(res => {

                let realData = res.data;
                this.$set(this.list[index], 'data', realData)

                if (this.list[index].kData){

                    let len =  this.list[index].kData.length - 1;

                    this.$set(this.list[index].kData[len],  'startScore', realData.startScore);
                    this.$set(this.list[index].kData[len],  'endScore', realData.endScore);
                    this.$set(this.list[index].kData[len],  'lowScore', realData.lowScore);
                    this.$set(this.list[index].kData[len],  'highScore', realData.highScore);
                    this.$set(this.list[index].kData[len],  'createTime', realData.createTime);
                }
            }, () => {

                this.$set(this.list[index], 'data', null)
            })
        },

        realtimeDataTimer(){

            this.timer = setInterval(() => {
                if (!this.list){
                    return;
                }
                this.list.forEach((item, i) => {

                    this.getProlineRealtime(item.id, i);
                })

            }, 60 * 1000)
        },

        getProlineKData(proLineId, index){

            let ops = {
                proLineId: proLineId
            }
            APIGetProlineKData(ops).then(res => {

                this.$set(this.list[index], 'kData', res.data)

                // setInterval(() => {
                //     this.$set(this.list[index], 'kData', this.list[index].kData.concat(res.data.slice(0,2)))
                // }, 1000)
            })
        }
    }
}
</script>
<style>
.i-wrap .el-card__body{padding: 0 0 15px 15px;}
</style>
<style scoped>
.cur{cursor: pointer;display: block;}
.i-hd{background-color: #f9f9f9;padding: 10px 20px;}
.i-wrap{padding: 20px 20px 0 0;}
.i-wrap .i-card:nth-child(odd){margin-left:20px;}

.i-mask{display: block;position:absolute;width:100%;height:100%;top:0;left:0;background-color: #f1f1f1; opacity: 0.6;}
</style>
