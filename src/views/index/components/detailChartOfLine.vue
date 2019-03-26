<template>
    <section>

        <div class="chart-container" >
            <ECharts 
                v-if="chartOptions"
                :init-options="chartInitOptions" 
                :options="chartOptions" 
                ref="myCharts" 
                class="my-chart"
                :style="{'height': H + 'px'}"
                >
            </ECharts>
            <aside v-if="!chartOptions" class="chart-loading f12">加载中...</aside>

        </div>
    </section>
</template>

<script>

import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/markLine'
import 'echarts/lib/chart/line'
// import 'echarts/lib/chart/candlestick'
// import 'zrender/lib/svg/svg'

export default {
    props: ['data', 'W', 'H'],
    data(){
        return {
            chartInitOptions: {
                // renderer: 'svg'
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
            if (this.H === 0){
                return;
            }
            // let dpr = this.dpr || 1;

            // let upColor = '#F95F56';
            // let downColor = '#1ACF90';
            
            // let data = this.klineData;

            // if (data === undefined || data === null){
            //     return;
            // }


            // let xData = [], yData = [];

            // console.log(xData, yData)

            let rS = this.data.realTimeScore, sS = this.data.startScore;

            let color = rS - sS >= 0 ? '#14c802' : '#dc0000';

           
            let xData = [], yData = [], datas = this.data.history;

            datas.forEach(item => {
                for (let key in item){
                    xData.push(key);
                    yData.push(item[key] && item[key] !== 'NaN' ? item[key] : 0);
                }
            })
            return {
                tooltip: {
                    trigger: 'axis'
                },

                // toolbox: {
                //     show: true,
                //     feature: {
                //         dataZoom: {
                //             yAxisIndex: 'none'
                //         },
                //         dataView: {readOnly: false},
                //         magicType: {type: ['line', 'bar']},
                //         restore: {},
                //         saveAsImage: {}
                //     }
                // },
                grid: {
                    top: '20%',
                    bottom: '18%',
                    left: '18%',
                    right: '12%'
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
                    }
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
                        name:'分数',
                        type:'line',
                        smooth: true,
                        data: yData,
                        markPoint: {
                            symbolSize: 30,
                            label: {  //x轴标记点上文字样式
                                normal: {
                                    show: true,
                                    fontSize: 12,
                                    formatter: function(param) {  
                                        return param.value;
                                    }   
                                }
                            },
                            data: [
                                {type: 'max', name: '最高分'},
                                {type: 'min', name: '最低分'}
                            ]
                        },
                        markLine: {
                            data: [
                                // {type: 'average', name: '平均值'}
                                { name: '开始分数', yAxis: sS, symbol: 'circle'}
                            ]
                        },
                        itemStyle: {
                            normal: {
                                fontSize: 12,
                                color: color
                                 // color: '#dc0000'
                            }
                        },
                        // areaStyle: {
                        //     normal: {
                        //         color: colors.area
                        //     }
                        // }
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




