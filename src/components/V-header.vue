<template>
  <div class="v-header">
    <div class="content">
      <div class="info">
        <img :src="seller.avatar">
        <div class="info-sell">
          <p class="brand">{{seller.name}}</p>
          <p class="time">{{seller.description}} /{{seller.deliveryTime}}分钟送达</p>
          <p class="sale">{{seller.supports[0].description}}</p>
          <div>
            <span @click="detail">{{seller.supports.length}}个</span>
          </div>
        </div>
      </div>
      <div class="introduce">
        <span></span>
        <p>{{seller.bulletin}}</p>
        <span>&gt;</span>
      </div>
    </div>
    <div class="back">
      <div class="back-image" :style="{backgroundImage: 'url(' + seller.avatar+')'}">
        <div class="cover"></div>
      </div>
    </div>
    <transition name="show">
      <Detail v-if="show" @show="detailShow" :seller="seller"></Detail>
    </transition>
  </div>
</template>

<script>
import Detail from "./Detail";
export default {
  name: "v-header",
  props: ["seller"],
  data() {
    return {
      show: false
    };
  },
  mounted() {},
  components: {
    Detail
  },
  methods: {
    detail() {
      this.show = !this.show;
    },
    detailShow() {
      this.show = !this.show;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.show-enter-active {
  animation: show-in 1s;
}
.show-leave-active {
  animation: show-in 1s reverse;
}
@keyframes show-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.v-header {
  width: 100%;
  height: 134px;
  position: relative;
  /* overflow: hidden; */
}
.back {
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  width: 100%;
  height: 134px;
  z-index: -1;

}
.back-image {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 134px;
  background-position: 50% 0;
  background-size: cover;
  filter: blur(10px);
  z-index: -1;
  overflow: hidden;
}
.v-header .back-image .cover {
  width: 100%;
  height: 100%;
  background: rgba(7, 17, 27, 0.5);
  color: rgb(255, 255, 255);
  font-size: 10px;
  font-weight: 100;
  line-height: 12px;
}
.v-header .content {
  width: 100%;
  height: 134px;
  color: rgb(255, 255, 255);
  font-size: 10px;
  font-weight: 100;
  line-height: 12px;
  overflow: hidden;
}
.v-header .content .info {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 64px;
  margin: 24px 0 18px;
}
.v-header .content .info img {
  width: 64px;
  height: 64px;
  border-radius: 2px;
  margin-left: 24px;
}
.v-header .content .info .info-sell {
  position: relative;
  width: calc(100% + 64px);
  box-sizing: border-box;
  height: 60px;
  margin-left: 18px;
}
.v-header .content .info .info-sell .brand {
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 16px;
  font-weight: bold;
}
.v-header .content .info .info-sell .brand::before {
  content: "";
  display: inline-block;
  width: 30px;
  height: 18px;
  background-image: url(../assets/img/brand@2x.png);
  background-size: cover;
  margin-right: 6px;
}
.v-header .content .info .info-sell .time {
  font-size: 12px;
  margin-top: 8px;
}
.v-header .content .info .info-sell .sale {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.v-header .content .info .info-sell .sale::before {
  content: "";
  display: inline-block;
  width: 12px;
  height: 12px;
  background-image: url(../assets/img/decrease_1@2x.png);
  background-size: cover;
  margin-right: 4px;
}
.v-header .content .info .info-sell div {
  display: inline-block;
  position: absolute;
  height: 12px;
  bottom: 0;
  right: 24px;
  padding: 7px 8px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
}
.v-header .content .info .info-sell div::after {
  content: ">";
  margin-left: 2px;
}
.v-header .content .introduce {
  display: flex;
  align-items: center;
  width: 100%;
  height: 10px;
  background: rgba(7, 17, 27, 0.2);
  padding: 9px 12px;
  line-height: 10px;
}
.v-header .content .introduce p {
  font-size: 12px;
  width: calc(100% - 69px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 4px;
  line-height: 12px;
  vertical-align: middle;
}
.v-header .content .introduce span {
  vertical-align: middle;
}
.v-header .content .introduce span:first-child {
  background-image: url(../assets/img/bulletin@2x.png);
  width: 22px;
  height: 12px;
  background-size: cover;
}
.v-header .content .introduce span:last-child {
  width: 15px;
  height: 10px;
  text-align: center;
}
</style>