<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <div>
          <flightsListHead></flightsListHead>

          <!-- 航班信息 -->
          <flightsItem v-for="(item,index) in dataList" :key="index" :data="item"></flightsItem>
          <el-row type="flex" justify="center">
            <!-- 分页功能 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="flightsData.total"
            ></el-pagination>
          </el-row>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import flightsListHead from "@/components/air/flightsListHead";
import flightsItem from "@/components/air/flightsItem";

export default {
  data() {
    return {
      flightsData: {}, // 航班总数据
      dataList: [], // 航班列表数据，用于循环flightsItem组件，单独出来是因为要分页
      currentPage: 1, //当前页码
      pageSize: 5, // 每页显示的条数
    };
  },
  components: {
    flightsListHead,
    flightsItem
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取航班总数据
    getData() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        console.log(res);
        this.flightsData = res.data;
        // this.dataList = this.flightsData.flights;
        this.setDataList()
      });
    },
    // 设置dataList数据
    setDataList() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.dataList = this.flightsData.flights.slice(start, end);
    },
    // 分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.currentPage = 1
      this.setDataList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val
      this.setDataList()
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>