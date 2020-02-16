<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <OrderForm :data="infoData"></OrderForm>

      <!-- 侧边栏 -->
      <OrderAside :data="$store.state.air.orderDetail"></OrderAside>
    </el-row>
  </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm";
import OrderAside from "@/components/air/orderAside";
export default {
  data() {
    return {
      infoData: {
        insurances: []
      }
    };
  },
  components: {
    OrderForm,
    OrderAside
  },
  mounted() {
    const { query } = this.$route;
    this.$axios({
      url: `/airs/${query.id}`,
      params: query.seat_xid
    }).then(res => {
      console.log(res);
      this.infoData = res.data;
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>