<template>
    <section>

        <el-table
          :data="data"
          border
          :row-class-name="tableRowClassName"
          style="width: 100%">
          <el-table-column prop="name" label="零部件名称" width="200"></el-table-column>
          <el-table-column prop="score" label="评估分数" width="120"></el-table-column>
          <el-table-column prop="status" label="运行状态" ></el-table-column>
        </el-table>
    </section>
</template>

<script>



export default {
    props: [],
    data(){
        return {
            data: [ 
                { name: '整机', score: 85, status: '振动能量正常' },
                { name: '第一级齿轮', score: 60, status: '齿侧间隙较大，齿面出现磨损' },
                { name: '第二级齿轮', score: 78, status: '正常运行' },
                { name: '第三级齿轮', score: 86, status: '正常运行' },
                { name: '轴承情况', score: 50, status: '出现高频振动，早期故障' },
                { name: '高速轴', score: 67, status: '和电机安装不同心' },
            ]
        }
    },

    mounted(){

    },
    methods:{
        tableRowClassName({row, rowIndex}) {
            let score = row.score;

            let clazz = '';
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
.el-table .green{background: #1ACF90;}
.el-table .yellow{background: #F8E71C;}
.el-table .red{background: #F95F56;}

</style>




