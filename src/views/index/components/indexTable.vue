<template>
    <section>

        <el-table
          :data="data"
          border
          style="width: 100%">
          <el-table-column prop="time" label="日期" width="120"></el-table-column>
          <el-table-column prop="1月1日" label="1月1日"></el-table-column>
          <el-table-column prop="1月2日" label="1月2日"></el-table-column>
          <el-table-column prop="1月3日" label="1月3日"></el-table-column>
          <el-table-column prop="1月4日" label="1月4日"></el-table-column>
          <el-table-column prop="1月5日" label="1月5日"></el-table-column>
          <el-table-column prop="1月6日" label="1月6日"></el-table-column>
          <el-table-column prop="1月7日" label="1月7日"></el-table-column>
          <el-table-column prop="1月8日" label="1月8日"></el-table-column>
          <el-table-column prop="1月9日" label="1月9日"></el-table-column>
          <el-table-column prop="1月10日" label="1月10日"></el-table-column>
        </el-table>
    </section>
</template>

<script>



export default {
    props: [],
    data(){
        return {
            data: [ 
                { time: '一线评估分数', '1月1日': 88, '1月2日': 88, '1月3日': 88, '1月4日': 88, '1月5日': 88, '1月6日': 88, '1月7日': 88, '1月8日': 88, '1月9日': 88, '1月10日': 88 }
            ]
        }
    },

    mounted(){
        this.init();
    },
    methods:{
        init(){

        },


    }
}

</script>


<style scoped>

</style>




