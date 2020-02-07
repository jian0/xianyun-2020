<template>
  <div class="container">
    <!-- 轮播图 -->
    <el-carousel height="500px">
      <el-carousel-item v-for="(item,index) in postList" :key="index">
        <p
          class="img"
          :style="`background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat
        background-size:contain contain`"
        ></p>
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索框 -->
    <div class="banner-content">
      <div class="search-bar">
        <el-row type="flex" class="search-tab">
          <span
            v-for="(item,index) in choose"
            :key="index"
            :class="{active:  index=== currentnum}"
            @click="handleclick(index)"
          >
          <i>{{item.name}}</i>
          </span>
        </el-row>
        <el-row class="search-input" align="center">
          <input type="text" :placeholder="choose[currentnum].placeholder" />
          <i class="el-icon-search"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postList: [
        // {
        //   url:'http://157.122.54.189:9095/assets/images/th01.jfif'
        // },
        // {
        //   url:'http://157.122.54.189:9095/assets/images/th02.jfif'
        // },
        // {
        //   url:'http://157.122.54.189:9095/assets/images/th03.jfif'
        // },
        // {
        //   url:'http://157.122.54.189:9095/assets/images/th04.jfif'
        // }
      ],
      choose: [
        {
          name: "攻略",
          placeholder: "搜素城市"
        },
        {
          name: "酒店",
          placeholder: "请输入城市搜索酒店"
        },
        {
          name: "机票",
          placeholder: ""
        }
      ],
      inputvalue: "",
      currentnum: 0
    };
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      // console.log(res);
      const { data } = res.data;
      this.postList = data;
    });
  },
  methods: {
    handleclick(index) {
      console.log("点击了");
      this.currentnum = index;

      // 点击机票的话，跳转到机票页面
      const choosename = this.choose[index]
      if(choosename.name === '机票'){
        return this.$router.push('/air')
      }
    }
  }
};
</script>

<style lang='less' scoped>
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .img {
    width: 100%;
    height: 100%;
  }
}
.banner-content {
  z-index: 9;
  width: 1000px;
  position: absolute;
  left: 50%;
  top: 45%;
  margin-left: -500px;
  border-top: 1px transparent solid;

  .search-bar {
    width: 552px;
    margin: 0 auto;
  }

  .search-tab {
    .active {
      i {
        color: #333;
      }
      &::after {
        background: #eee;
      }
    }

    span {
      width: 82px;
      height: 36px;
      display: block;
      position: relative;
      margin-right: 8px;
      cursor: pointer;

      i {
        position: absolute;
        z-index: 2;
        display: block;
        width: 100%;
        height: 100%;
        line-height: 30px;
        text-align: center;
        color: #fff;
      }

      &:after {
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        content: "";
        width: 100%;
        height: 100%;
        border: 1px rgba(255, 255, 255, 0.2) solid;
        border-bottom: none;
        transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
        transform-origin: bottom left;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 1px 2px 0 0;
        box-sizing: border-box;
      }
    }
  }

  .search-input {
    width: 550px;
    height: 46px;
    background: #fff;
    border-radius: 0 4px 4px 4px;
    border: 1px rgba(255, 255, 255, 0.2) solid;
    border-top: none;
    box-sizing: unset;

    input {
      flex: 1;
      height: 20px;
      padding: 13px 15px;
      outline: none;
      border: 0;
      font-size: 16px;
    }

    .el-icon-search {
      cursor: pointer;
      font-size: 22px;
      padding: 0 10px;
      font-weight: bold;
    }
  }
}
  // .banner-content {
  //   z-index: 9;
  //   width: 1000px;
  //   position: absolute;
  //   left: 50%;
  //   top: 45%;
  //   margin-left: -500px;
  //   border-top: 1px transparent solid;

  //   .search-bar {
  //     width: 552px;
  //     margin: 0 auto;
  //   }

  //   .search-tab {
  //     .active {
  //       color: #000;
  //       i {
  //         color: #333;
  //       }
  //       &::after {
  //         background: #eee;
  //       }
  //     }

  //     span {
  //       width: 82px;
  //       height: 36px;
  //       display: block;
  //       position: relative;
  //       margin-right: 8px;
  //       cursor: pointer;
  //       text-align: center;
  //       i {
  //         position: absolute;
  //         z-index: 2;
  //         display: block;
  //         width: 100%;
  //         height: 100%;
  //         line-height: 30px;
  //         text-align: center;
  //         color: #fff;
  //       }

  //       &:after {
  //         position: absolute;
  //         left: 0;
  //         top: 0;
  //         display: block;
  //         content: "";
  //         width: 100%;
  //         height: 100%;
  //         border: 1px rgba(255, 255, 255, 0.2) solid;
  //         border-bottom: none;
  //         transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
  //         transform-origin: bottom left;
  //         background: rgba(0, 0, 0, 0.5);
  //         border-radius: 1px 2px 0 0;
  //         box-sizing: border-box;
  //       }
  //     }
  //   }

  //   .search-input {
  //     width: 550px;
  //     height: 46px;
  //     background: #fff;
  //     border-radius: 0 4px 4px 4px;
  //     border: 1px rgba(255, 255, 255, 0.2) solid;
  //     border-top: none;
  //     box-sizing: unset;

  //     input {
  //       flex: 1;
  //       height: 20px;
  //       padding: 13px 15px;
  //       outline: none;
  //       border: 0;
  //       font-size: 16px;
  //     }

  //     .el-icon-search {
  //       cursor: pointer;
  //       font-size: 22px;
  //       padding: 0 10px;
  //       font-weight: bold;
  //     }
  //   }
  // }

.el-icon-search {
  margin-left: 270px;
  text-align: center;
}
</style>
