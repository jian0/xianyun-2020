<template>
  <el-row type="flex" class="header" justify="space-between" style="margin:auto">
    <div class="img"></div>
    <div class="navs">
      <el-row type="flex">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link el-icon-bell">
        消息
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>消息</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown v-if="$store.state.user.userInfo.token">
      <el-row type="flex" align="middle" class="el-dropdown-link">
        <nuxt-link to="#">
          <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar" />
          {{$store.state.user.userInfo.user.nickname}}
        </nuxt-link>
        <i class="el-icon-caret-bottom el-icon--right"></i>
      </el-row>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <nuxt-link to="#">个人中心</nuxt-link>
        </el-dropdown-item>
        <el-dropdown-item>
          <div @click="handleExit">退出</div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <nuxt-link to="/user/login" class="login" v-else>登录/注册</nuxt-link>
  </el-row>
</template>

<script>
export default {
  methods: {
    handleExit() {
      const { commit } = this.$store;
      commit("user/cleanUserInfo");
      this.$message.success('退出成功')
    }
  }
};
</script>

<style lang='less' scoped>
.header {
  width: 1000px;
  min-width: 1000px;
  // border-bottom: 2px solid #ccc;
  box-shadow: 0 3px 2px #f6f6f6;
}
.img {
  display: block;
  width: 156px;
  height: 60px;
  background: url("/logo.jpg") center no-repeat;
  background-size: 100%;
}
.navs {
  flex: 1;
  margin: 0 20px;
  a {
    display: block;
    padding: 0 20px;
    height: 60px;
    box-sizing: border-box;
    line-height: 60px;
    &:hover {
      border-bottom: 5px solid #409eff;
      color: #409eff;
    }
  }
  .nuxt-link-exact-active {
    color: #fff;
    background-color: #409eff;
    &:hover {
      color: #fff;
    }
  }
}
.login {
  height: 60px;
  line-height: 60px;
}
.el-dropdown-link {
  img {
    width: 36px;
    height: 36px;
    border-radius: 18px;
  }
}
.el-dropdown {
  line-height: 60px;
  cursor: pointer;
  margin-right: 10px;
}
</style>