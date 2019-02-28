<template>
    <section>

        <div class="ub dcok-tit">
            <p class="c-tit m0">{{title}} -</p>
            <p class="m0 ml5">{{curTab.text}}</p>
        </div>
        <div class="chart-container"> 
            <ECharts 
                v-if="chartOptions"
                :init-options="chartInitOptions" 
                :options="chartOptions" 
                ref="myCharts" 
                class="my-chart"
                :style="{'width': W + 'px', 'height': H + 'px'}"
                >
            </ECharts>
            <aside v-if="!chartOptions" class="chart-loading f12">加载中...</aside>

        </div>
        <div class="ub dock-txt-wrap">
            <div v-for="(item, i) in list" class="uw0 ub-f1 dock-txt f12" :class="{'active': curNum === i}" @click="switchType(item.mul)">
                {{item.text}}
            </div>
        </div>
    </section>
</template>

<script>

import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/candlestick'
import 'zrender/lib/svg/svg'

import { formatDate } from '@/utils'
export default {
    props: ['title', 'data', 'period', 'W', 'H'],
    data(){
        return {

            curNum: 0,
            list: [
                { name: 'week', mul: 7, text: '一周数据图'},
                { name: 'month', mul: 30, text: '一月数据图'},
                { name: 'quarter', mul: 90, text: '一季度数据图'},
                { name: 'year', mul: 365, text: '一年数据图'}
            ],

            chartInitOptions: {
                renderer: 'svg'
            }
        }
    },
    components: {
        ECharts
    },
    mounted(){
        this.init();
    },

    watch: {

        period(val){

            this.list.forEach((item, i) => {
                if (val == item.mul){
                    this.curNum = i;
                }
            })
        }
    },
    computed: {
        curTab(){
            return this.list[this.curNum]
        },
        chartOptions(){

            if (this.H === 0 || !this.data){
                return;
            }

            // let mul = this.list[this.curNum].mul;
            // let dpr = this.dpr || 1;

            // let upColor = '#F95F56';
            // let downColor = '#1ACF90';
            
            // let data = this.klineData;

            // if (data === undefined || data === null){
            //     return;
            // }
            let data = this.data;

            let xData = [], yData = [], line1 = [], line2 = [], line3 = [];

           
            data.forEach((item, i) => {
                xData.push(formatDate(item.createTime));

                yData[i] = [ item.startScore, item.endScore, item.lowScore, item.highScore ];
                line1.push(item.lowScore);
                line2.push(item.highScore);
                line3.push((item.highScore + item.lowScore)/2);
            })
            // Data.push('');
            // Data.unshift('');
            // yData.push([]);
            // yData.unshift([]);
            // console.log(xData, yData)
            let upColor = '#14c802';
            let downColor = '#dc0000';

            return {
                tooltip: {
                    trigger: 'axis',
                    textStyle: {
                        fontSize: 12
                    },
                    axisPointer: {
                        type: 'cross',
                        label: {  //坐标轴字体
                            fontSize: 12,
                            backgroundColor: '#8ec6ad'
                        },
                        crossStyle: {  
                            color: '#8ec6ad' //标线颜色
                        },
                        lineStyle: {  //标线样式
                            color: '#09BB07',
                            opacity: 0.6
                        }
                    },
                    backgroundColor: '#8ec6ad',
                    formatter: function (params) {

                        // alert(JSON.stringify(params))
                        let res = '';
                        let label = ['开', '收', '低', '高'];
                        let param = params[0];

                        res += '<div>' + param.axisValue + '</div>';
                        // res += '<div> ' + param.seriesName + '</div>';
                        params[0].data.forEach(function(item, i){
                            if (i !== 0){

                                res += '<div>' + label[i-1] + ': ' + item.toFixed(2) +'</div>'
                            }
                        });


                        return res;
                    }
                },

                grid: {
                    top: '10%',
                    bottom: '12%',
                    left: '9%',
                    right: '6%'
                },
                xAxis:  {
                    type: 'category',
                    boundaryGap: false,
                    data: xData,
                    axisTick: { //去掉刻度点样式
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#666666' //轴线颜色
                        }
                    },
                    boundaryGap: ['20%', '20%']
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} '
                    },
                    splitArea: {
                        show: true
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: { //去掉刻度点样式
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#666666' //轴线颜色
                        }
                    }
                },
                dataZoom: [
                    {
                        show: false,
                        type: 'inside'
                    },
                    {
                        show: false,
                        type: 'slider'
                    }
                ],
                series: [
                    {
                        type: 'candlestick',
                        data: yData,
                        itemStyle: {
                            normal: {
                                color: upColor,  //上
                                color0: downColor, //下
                                borderColor: upColor, //上
                                borderColor0: downColor //下
                            }
                        }
                    },
                    {
                        name:'最低',
                        type:'line',
                        smooth: true,
                        showSymbol: false,
                        data: line1,
                        lineStyle: {
                            color: '#dc0000',
                            width: 1
                        }
                    },
                    {
                        name:'最高',
                        type:'line',
                        smooth: true,
                        showSymbol: false,
                        data: line2,
                        lineStyle: {
                            color: '#14c802',
                            width: 1
                        }
                    },
                    {
                        name:'平均',
                        type:'line',
                        smooth: true,
                        showSymbol: false,
                        data: line3,
                        lineStyle: {
                            color: '#FFC125',
                            width: 1
                        }
                    }
                ]
            };

        }
    },

    methods:{
        init(){
            
            // this.$refs.myCharts.showLoading();
            // setTimeout(() => {
            //     this.$refs.myCharts.on('legendselected', function (obj) {
            //     //do some thing
            //     //这里通过obj获取信息，设定option之后,重新载入图表
            //         console.log(obj);
            //     }); 
            // }, 3000)
        },

        switchType(type){

            this.$emit('switchKlineType', type)
        },

        dayFormat: function(time){

            let _date = new Date(time);

            return (_date.getMonth()+1) + '/' + _date.getDate();
        }

    }
}

</script>


<style scoped>
.dcok-tit{padding: 20px 20px 0;font-size: 22px;color: #4359a0;font-weight: bold;}
.dock-txt-wrap{padding: 17px 17px 17px 7px;}
.dock-txt{margin-left: 7px;padding: 10px 0;background-color: #c8d5ea;color:#fff;text-align: center;border-radius: 3px;-webkit-border-radius: 3px;font-weight: bold;cursor: pointer;}
.dock-txt.active{background-color: #92a9cc;}
.chart-container, .my-chart{position: relative;width: 100%;height:100%;}
.chart-loading{padding-top: 60px;text-align: center;color:#999;}

</style>




