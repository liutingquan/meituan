<template>
  <div class="list">

    <div class="list-content">
      <div class="head-info">
        <div class="box">
          <p>购物车</p>
          <p>清空</p>
        </div>
      </div>
      <ul class="box-foods">
        <li v-for="(item, index) in delivery" :key="index" class="detail" >
          <div class="food-info">
            <p class="fond-name">链子核桃黑米粥</p>
            <p class="fond-price"><span>￥</span><span>10</span></p>
          </div>
          <div class="count">
            <div :class="{change: true, active: count[ item[0] ] && count[ item[0] ][ item[1] ]}">
              <i @touchend.stop="minusFoods(item[0], item[1], index)" class="minus">-</i>
              <span class="counted">{{ count[ item[0] ] &&  count[ item[0] ][ item[1] ]}}</span>
            </div>
            <i @touchend.stop="addFoods(item[0], item[1])" class="add">+</i>
          </div>
        </li>
      </ul>
    </div>

    <div class="list-menu">
      <div class="image-back">
        <div class="image">
          <span></span>
        </div>
      </div>
      <p class="pay-foods">￥0</p>
      <p class="delivery-pay">另需配送费￥4元</p>
      <p class="more-than">￥20起送</p>
    </div>


  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {};
  },
  props: ["data", "count", "delivery"],
  methods: {},
  watch: {
    delivery(oldValue, newValue) {
      this.delivery = this.delivery.concat(newValue);
    }
  },
  created() {
    console.log(this);
  },
  updated() {
    console.log(this.delivery)
  },
  methods: {
    minusFoods(item, key, index) {
      this.$emit('minusFoods',item, key, index)
    },
    addFoods(item, key) {
      this.$emit('addFoods',item, key)
    }
  }
};
</script>
<style scoped>
.list {
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 10;
}
.list-menu {
  display: flex;
  position: relative;
  width: 100%;
  height: 48px;
  align-items: center;
  background-color: #142d17;
  z-index: 999;
}
.list-menu .image-back {
  position: absolute;
  left: 18px;
  bottom: 2px;
  width: 56px;
  height: 56px;
  background-color: #142d17;
  border-radius: 50%;

  overflow: hidden;
}
.list-menu .image {
  border-radius: 50%;

  box-sizing: border-box;
  width: 56px;
  height: 56px;
  border: 6px solid #142d17;
  background-color: rgb(255, 255, 255, 0.4);
  text-align: center;
}
.list-menu .image span {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url("../assets/SVG/shopping_cart.svg");
  margin: 10px 10px 10px;
  background-size: cover;
}
.list-menu p {
  line-height: 24px;
  margin: 12px;
  height: 24px;
  display: flex;
  align-items: center;
}
.list-menu .pay-foods {
  font-size: 16px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
  margin-left: 80px;
}
.list-menu .delivery-pay {
  font-size: 12px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.4);
  margin-left: 0;
}
.list-menu .delivery-pay::before {
  content: "";
  display: inline-block;
  height: 24px;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  margin-right: 11px;
}
.list-menu .more-than {
  flex: 1;
  font-size: 16px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
  justify-content: center;
}
.list-content {
  position: absolute;
  width: 100%;
  transform: translateY(-100%);
  z-index: 20;
  
}
.list-content .head-info {
  background-color: #f3f5f7;
  border-bottom: 1px solid rgba(7, 17, 27, .2);
}
.list-content .head-info .box {
  display: flex;
  /* width: 100%; */
  justify-content: space-between;
  margin: 0 18px;
}
.list-content .head-info .box p:first-child {
  font-size: 20px;
  color: rgb(7, 17, 27);
  line-height: 40px;
}
.list-content .head-info .box p:last-child {
  font-size: 18px;
  line-height: 40px;
  color: rgb(0, 160, 220);
}
.list .box-foods {
  position: relative;
  box-sizing: border-box;
  width: 100%;

  padding: 0 18px;
  /* margin: 0 18px; */
  background-color: #fff;


}
.list .box-foods .detail{
  display: flex;
  /* position: absolute; */
  align-items: center;
  width: 100%;
  height: 24px;
  border-bottom: 1px solid rgba(7, 17, 27, .2);
  padding: 12px 0;
}
.list .box-foods .detail .food-info{
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  line-height: 24px;
  width: calc( 100% - 96px);
  color: rgb(7, 17, 27);
}
.list .box-foods .detail .food-info span:first-child{
  font-size: 12px;
  color: rgb(240, 20,20);
}
.list .box-foods .detail .food-info span:last-child{
  font-size: 14px;
  color: rgb(240, 20,20);
}
.list .box-foods .detail .count {
  display: flex;
  margin-left: 24px;
  align-items: center;
  z-index: 10;
  overflow: hidden;

}
.list .box-foods .detail .count .add {
  display: inline-block;
  width: 24px;
  height: 24px;
  font-size: 24px;
  line-height: 24px;
  text-align: left;
  text-indent: 1px;
  color: #fff;
  border-radius: 50%;
  font-weight: 900;
  background-color: rgb(0, 160, 220);
}
.list .box-foods .detail .count .minus {
  display: inline-block;
  width: 20px;
  height: 20px;
  font-size: 20px;
  line-height: 20px;
  border-radius: 50%;
  font-weight: 900;
  text-align: left;
  text-indent: 4px;
  color: rgb(0, 160, 220);
  border: 2px solid rgb(0, 160, 220);
}
.list .box-foods .detail .count .change {
  display: flex;
  transform: translateX(48px);
  align-items: center;
  transition: all 1s ease-in;
  z-index: -1;
}
.list .box-foods .detail .count .change.active {
  display: flex;
  transform: translateX(0);
}
.list .box-foods .detail .count .counted {
  display: inline-block;
  width: 24px;
  text-align: center;
  font-size: 12px;
  line-height: 24px;
  color: rgb(147, 153, 159);
}
</style>
