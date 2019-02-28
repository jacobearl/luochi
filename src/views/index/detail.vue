<template>
    <div>
<!--         <div class="i-hd">
            <el-tag size="small">立体研磨机</el-tag>
        </div> -->
        
        <div class="d-wrap">
            <div class="d-img">
                <img :src="img">
            </div>
            <chart-of-line class="d-chart" colorType="1" title="整机运行趋势"></chart-of-line>

            <div class="d-table">
                <detail-table></detail-table>
            </div>
        </div>
    </div>
</template>

<script>
import chartOfLine from './components/chartOfLine'
import detailTable from './components/detailTable'
import yamoji from 'static/img/yanmoji.png'
export default {
    name: 'index',
    data(){
        return {
            img: yamoji,

            id: null
        }
    },
    components: {
        chartOfLine, detailTable
    },
    watch: {
        "$route"(val){
            this.init();
        }
    },
    mounted(){

    },
    methods: {

        init(){
             this.id = this.$route.query.id;
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

<style scoped>
.i-hd{background-color: #f9f9f9;padding: 10px 20px;}
.d-wrap{}
.d-chart{width: 95%;height: 300px;margin: 20px auto;}
.d-img{margin: 20px 0;text-align: center;}
.d-img>img{max-width: 100%;}
.d-table{padding: 0 30px 30px;}
</style>
