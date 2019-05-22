<template>
  <div class="detail" @click="show">
    <div class="back"></div>
    <div class="container">
      <div class="line">
        <div class="name">{{seller.name}}</div>
        <div class="star">
          <i :class="charge(0)"></i>
          <i :class="charge(1)"></i>
          <i :class="charge(2)"></i>
          <i :class="charge(3)"></i>
          <i :class="charge(4)"></i>
        </div>
        <div class="head-info">
          <i></i>
          <span>优惠信息</span>
          <i></i>
        </div>
        <div class="sale">
          <p v-for="(item, index) in seller.supports" :key="index">{{item.description}}</p>
        </div>
        <div class="head-info">
          <i></i>
          <span>商家公告</span>
          <i></i>
        </div>
        <div class="content">{{seller.bulletin}}</div>
        <span class="icon">x</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {};
  },
  computed: {
    numArray() {
      let arr = [];
      let num = this.seller.score;
      num = parseInt(num / 0.5);
      if (num % 2 == 0) {
        for (let i = 1; i < 6; i++) {
          if (i * 2 <= num) {
            arr[i - 1] = 2;
          }
        }
      } else {
        for (let j = 1; j < 6; j++) {
          if (j * 2 - 1 <= num) {
            arr[j - 1] = 1;
          }
        }
      }
      return arr;
    }
  },
  props: ["seller"],
  methods: {
    show() {
      this.$emit("show");
    },
    charge(place) {
      let state = this.numArray[place];
      if (state) {
        if (state == 1) {
          return "halfStar";
        } else {
          return "completeStar";
        }
      } else {
        return "noStar";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.line{
    width: 100%;
    height: 100%;
    position: relative;
    /* border: 1px solid black; */
}
.detail {
  display: flex;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(7, 17, 27, 0.8);
  filter: blur(10px);
  top: 0;
  left: 0;
}
.detail .container {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 64px 36px 32px;
  border: 1px solid #fff;
  color: rgb(255, 255, 255);
  font-size: 12px;
  line-height: 12px;
  font-weight: 200;
}
.detail .container .name {
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
  text-align: center;
}
.detail .container .star {
  text-align: center;
  margin-top: 16px;
}
.detail .container .star i {
  display: inline-block;
  width: 20px;
  height: 19px;
  margin: 2px 10px;
  /* background-size: cover; */
}
.detail .container .star .noStar {
  background-image: url(../assets/img/star24_off@2x.png);
}
.detail .container .star .halfStar {
  background-image: url(../assets/img/star24_half@2x.png);
}
.detail .container .star .completeStar {
  background-image: url(../assets/img/star24_on@2x.png);
}
.detail .container .head-info {
  box-sizing: border-box;
  padding: 28px 0 0;
  display: flex;
  align-items: center;
  text-align: center;
}
.detail .container .head-info i {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  width: 112px;
}
.detail .container .head-info span {
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  margin: 0 12px;
  width: calc(100% - 248px);
}
.detail .container .sale {
    margin-top: 24px;
    margin-left: 12px;
}
.detail .container .sale p{
    display: flex;
    align-items: center;
    height: 16px;
    margin-top: 12px
}
.detail .container .sale p::before{
    content: '';
    width: 16px;
    height: 16px;
    background-image: url(../assets/img/discount_4@2x.png);
    background-size: 100% 100%;
    margin-right: 12px;
}
.detail .container .content{
    margin: 24px 12px 0;
    font-size: 12px;
    line-height: 24px;
}
.detail .container .icon{
    position: absolute;
    margin-left: -16px;
    left: 50%;
    bottom: 0;    
    display: block;
    text-align: center;
    color: rgba(255, 255, 255, .5);
    width: 32px;
    height: 32px;
    font-size: 32px;
    line-height: 32px;
}
</style>