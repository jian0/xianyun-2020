<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <flightsFilters :data="cacheFlightsData" @getData="setDataList"></flightsFilters>

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
      <flightsAside :data="flightsData"></flightsAside>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import flightsListHead from "@/components/air/flightsListHead";
import flightsItem from "@/components/air/flightsItem";
import flightsFilters from "@/components/air/flightsFilters";
import flightsAside from "@/components/air/flightsAside";

export default {
  data() {
    return {
      flightsData: {
        info: {},
        flights: [],
        options: {
          airport: []
        }
      }, // 航班总数据
      // 备份数据
      cacheFlightsData: {
        info: {},
        flights: [],
        options: {
          airport: []
        }
      },

      dataList: [], // 航班列表数据，用于循环flightsItem组件，单独出来是因为要分页
      currentPage: 1, //当前页码
      pageSize: 5 // 每页显示的条数
    };
  },
  components: {
    flightsListHead,
    flightsItem,
    flightsFilters,
    flightsAside
  },
  // watch: {
  //   $route() {
  //     this.currentPage = 1
  //     this.getData();
  //   },
  //   currentPage(){
  //     console.log(this.currentPage);

  //   }
  // },
  beforeRouteUpdate(to, from, next) {
    this.currentPage = 1;
    next();
    this.getData();
  },
  mounted() {
    this.getData();
  },
  methods: {
    // beforeRouteUpdate(to, from, next) {
    //   this.getData();
    //   next();
    // },
    // 获取航班总数据
    getData() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        console.log(res);
        this.flightsData = res.data;
        // 展开数据，只拷贝里面的4个对象，和flightsData没有关联了
        this.cacheFlightsData = { ...res.data };
        // console.log(this.cacheFlightsData);

        // this.dataList = this.flightsData.flights;
        this.setDataList();
      });
    },
    // 设置dataList数据
    setDataList(arr) {
      if (arr) {
        this.currentPage = 1;
        this.flightsData.flights = arr;
        this.flightsData.total = arr.length;
      }
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.dataList = this.flightsData.flights.slice(start, end);
    },
    // 分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.currentPage = 1;
      this.setDataList();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.setDataList();
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