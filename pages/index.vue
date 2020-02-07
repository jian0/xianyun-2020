<template>
  <div class="index">
    <span class="demonstration"></span>
    <el-carousel height="500px">
      <el-carousel-item v-for="(item,index) in postList" :key="index">
        <p class="img" 
        :style="`background:url(${item.url}) center center no-repeat
        background-size:contain contain`"></p>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      postList:[
        {
          url:'http://157.122.54.189:9095/assets/images/th01.jfif'
        },
        {
          url:'http://157.122.54.189:9095/assets/images/th02.jfif'
        },
        {
          url:'http://157.122.54.189:9095/assets/images/th03.jfif'
        },
        {
          url:'http://157.122.54.189:9095/assets/images/th04.jfif'
        }
      ]
    }
  }
};
</script>

<style lang='less' scoped>
.img {
  height: 500px;
}
</style>
