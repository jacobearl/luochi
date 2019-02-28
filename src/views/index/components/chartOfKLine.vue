<template>
    <section>

        <div class="chart-container"> 
            <ECharts 
                v-if="chartOptions"
                :init-options="chartInitOptions" 
                :options="chartOptions" 
                ref="myCharts" 
                class="my-chart"
                :style="{'height': H + 'px'}"
                >
            </ECharts>
            <!-- <aside v-if="!chartOptions" class="chart-loading f12">加载中...</aside> -->

        </div>
    </section>
</template>

<script>

import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/candlestick'
import 'zrender/lib/svg/svg'

import { formatDate } from '@/utils'

export default {
    props: ['item', 'W', 'H'],
    data(){
        return {
            dpr: document.getElementsByTagName("html")[0].getAttribute("data-dpr") || 1,
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
    computed: {
 
        chartOptions(){

            if (this.H === 0|| !this.item || !this.item.kData){
                return;
            }
            // let dpr = this.dpr || 1;

            // let upColor = '#F95F56';
            // let downColor = '#1ACF90';
            
            // let data = this.klineData;

            // if (data === undefined || data === null){
            //     return;
            // }

            let xData = [], yData = [];


            let data = this.item.kData;

            data.forEach((item, i) => {
                xData.push(formatDate(item.createTime));

                yData[i] = [ item.startScore, item.endScore, item.lowScore, item.highScore ];
            })

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
                    left: '15%',
                    right: '10%'
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



        dayFormat: function(time){

            let _date = new Date(time);

            return (_date.getMonth()+1) + '/' + _date.getDate();
        }

    }
}

</script>


<style scoped>
.chart-container, .my-chart{position: relative;width: 100%;height:100%;}
.chart-loading{padding-top: 60px;text-align: center;color:#999;}

</style>




