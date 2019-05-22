<template>
  <div class="goods">
    <ul class="left">
      <li
        v-for="(item, index) in goods"
        :key="index"
        :class="{active: item == check}"
        @click="click(item, index)"
      >{{item.name}}</li>
    </ul>

    <ul class="right" @touchstart="down" @touchmove="move" @touchend="end" ref="drag">
      <li v-for="(item, index) in goods" :key="index" class="position">
        <div>
          <div class="name">{{item.name}}</div>
          <ul class="good">
            <li v-for="(value, key) in item.foods" :key="key" @touchend="route(key,index)">
              <div class="out">
                <img :src="value.icon" alt="圖片信息">
                <div class="info">
                  <p class="info-name">{{value.name}}</p>
                  <p v-if="value.info" class="info-value">{{value.info}}</p>
                  <p class="info-num">
                    <span v-if="value.sellCount">月售{{value.sellCount}}份</span>
                    <span v-if="value.rating">好评率{{value.rating}}</span>
                  </p>
                  <p class="info-price">
                    <span class="cur-price">￥{{value.price}}</span>
                    <span class="old-price" span v-if="value.oldPrice">{{'￥' + value.oldPrice}}</span>
                  </p>
                  <div class="count">
                    <div :class="{change: true, active: count[index] && count[index][key]}">
                      <i @touchend.stop="minusFoods(index, key)" class="minus">-</i>
                      <span class="counted">{{count[index] && count[index][key]}}</span>
                    </div>
                    <i @touchend.stop="addFoods(index, key)" class="add">+</i>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <list
      :data="data"
      :delivery="delivery"
      :count="count"
      @addFoods="addFoods"
      @minusFoods="minusFoods"
    ></list>
  </div>
</template>

<script>
import list from './List';
export default {
  name: "goods",
  props: ["goods","data"],
  data() {
    return {
      check: false,
      keys: true,
      oldY: "",
      top: "",
      count: {},
      delivery: [],
    };
  },
  computed: {
  //   delivery() {
  //   return new Array(this.goods.length);
  //   }
  },
  mounted() {
    console.log(this);
  },
  watch: {

  },
  methods: {
    counted(index, key) {
      if(this.count[index] && this.count[index][key]){
        return this.count[index][key]
      }
    },
    addFoods(index, key) {
      if(!this.count[index]){
              var len = this.goods.length;
        var len2 = null;
        var arr = {};
        var arr2 = null;
        for (let i = 0; i < len; i++) {
            arr2 = {};
          len2 = this.goods[i].foods.length;

          for (let j = 0; j < len2; j++) {
            arr2[j]=0;
          }
          arr[i] = arr2;
        };
          // console.log(arr2);

        this.count = Object.assign({}, this.count, arr),
 
        console.log(this.count);
      }


      // if(!this.count[index] || !this.count[index][key]){
        var value = this.count[index][key]++;
        if(this.count[index][key] === 1) {
          if(this.delivery[index]){
           var arr =  this.delivery[index];
           arr[key] = true;
          this.$set(this.delivery, index, arr)

          }else{
          var arr = [];
          arr[key] = true;
          this.$set(this.delivery, index, arr)
          }

        console.log(this.delivery);
        }
        // value++
        // console.log(this.count[index])
        // this.count[index].slice(index, 1, value)
        // this.$set(this.count[index], key, value);
        // console.log(this.count);
        // console.log(this.sell,this.seller)

      // }

    },
    minusFoods(index, key, charge) {
      if(this.count[index][key]) {
      this.count[index][key] --;
      if( charge && this.count[index][key] == 0) {
        this.delivery.splice(charge, 1);
      }
      }
    },
    route(foods, index) {
      if(this.keys){
      this.$router.push({ path: "goodsDetail/" + index, query: { foods } });
      }
    },
    down(event) {

    },
    move(event) {
            if(this.keys){
      this.top = this.$refs.drag.offsetTop;
      this.oldY = event.touches[0].clientY;
            this.keys = false;
            }
      let moveY = event.touches[0].clientY - this.top;
      let disY = event.touches[0].clientY - this.oldY;
      this.$refs.drag.style.top = this.top + disY + "px";
    },
    end(event) {
      if (!this.keys) {
        if(this.$refs.drag.offsetTop > 0){
          this.$refs.drag.style.top = 0;
      }
          this.keys = true;
      }
    },
    click(item, index) {
      this.check = item;
      var oLi = document.getElementsByClassName("position");
      var oDiv = document.getElementsByClassName("goods");
      var oFather = this.$el.querySelector(".right");
      var disY = oLi[index].offsetTop;
      oFather.style.top = -disY + "px";
    }
  },
  components: {
    list
  }
}
</script>
<style scoped>
.goods {
  display: flex;
  box-sizing: border-box;
  /* border: 2px solid black; */
  height: calc(100% - 176px);
  width: 100%;
  overflow: hidden;
  position: relative;
}
.goods .left {
  width: 80px;
  height: 100%;
  background-color: #f3f5f7;
}
.goods .left li {
  display: flex;
  position: relative;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 12px;
  height: 54px;
  background-color: #f3f5f7;
  font-size: 14px;
  line-height: 16px;
  color: rgb(240, 20, 20);
  font-weight: 200;
  /* box-sizing: border-box; */
}
.goods .left li::before {
  content: "";
  display: block;
  position: absolute;
  left: 50%;
  top: -0.5px;
  width: 112px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.2);
  margin-left: -56px;

  transform: scale(0.5);
}
.goods .left li:first-child:before {
  display: none;
}
.goods .left li:last-child:after {
  content: "";
  display: block;
  position: absolute;
  /* left: 50%; */
  bottom: 0;
  width: 112px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.2);
  transform: scale(0.5);
  margin-left: -28px;
}
.goods .left li.active {
  background-color: #fff;
  font-size: 14px;
  font-weight: normal;
  /* font-weight: 700; */
}
.goods .left li.active::before {
  display: none;
}
.goods .left li.active + li::before {
  display: none;
}
.goods .left li.active::after {
  display: none;
}
.goods .right {
  flex: 1;
  position: relative;
}
.goods .charge {
  position: fixed;
  width: calc(100% - 80px);
  right: 0;
  height: 100%;
  background-color: red;
  z-index: -1;
}
.goods .right .name {
  position: relative;
  height: 26px;
  background-color: #f3f5f7;
  color: rgb(147, 153, 159);
  font-size: 14px;
  line-height: 26px;
  text-indent: 14px;
}
.goods .right .name::before {
  content: "";
  display: inline-block;
  position: absolute;
  left: 0;
  right: 0;
  background-color: #d9dde1;
  width: 4px;
  height: 26px;
}
.goods .right .good .out {
  display: flex;
  margin: 18px 18px 0;
  padding-bottom: 18px;
  border-bottom: 0.5px solid rgba(7, 17, 27, 0.2);
}
.goods .right .good .out::after {
  position: absolute;
  bottom: 0;
  content: "";
  display: inline-block;
  width: 100%;
  border-bottom: 0.5px solid rgba(7, 17, 27, 0.2);
}
.goods .right .good .out:last-child::after {
  display: none;
}

.goods .right .good .out img {
  width: 64px;
  height: 64px;
}
.goods .right .good .out .info {
  position: relative;
  width: calc(100% - 74px);
  margin-left: 10px;
  font-size: 10px;
  line-height: 10px;
  color: rgb(147, 153, 159);
}
.goods .right .good .out .info .info-name {
  margin-top: 2px;
  font-size: 14px;
  line-height: 14px;
  color: rgb(7, 17, 27);
  word-wrap: none;
  overflow: hidden;
  white-space: ellipse;
}
.goods .right .good .out .info .info-value {
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 8px;
}
.goods .right .good .out .info .info-num {
  margin-top: 8px;
}
.goods .right .good .out .info .info-num span:last-child {
  margin-left: 12px;
}
.goods .right .good .out .info .info-price {
  display: flex;
  align-items: top;
  font-size: 12px;
  line-height: 24px;
}
.goods .right .good .out .info .info-price .cur-price {
  font-size: 14px;
  color: rgb(240, 20, 20);
  font-weight: 700;
}
.goods .right .good .out .info .info-price .cur-price::first-letter {
  font-size: 12px;
  font-weight: normal;
  color: rgb(240, 20, 20);
}
.goods .right .good .out .info .info-price .old-price {
  margin-left: 8px;
  text-decoration: line-through;
  line-height: 20px;
}
.goods .right .good .out .info .count {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 10;
  overflow: hidden;
}
.goods .right .good .out .info .count .add {
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
.goods .right .good .out .info .count .minus {
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
.goods .right .good .out .info .count .change {
  display: flex;
  transform: translateX(48px);
  align-items: center;
  transition: all 1s ease-in;
  z-index: -1;
}
.goods .right .good .out .info .count .change.active {
  display: flex;
  transform: translateX(0);
}
.goods .right .good .out .info .count .counted {
  display: inline-block;
  width: 24px;
  text-align: center;
  font-size: 12px;
  line-height: 24px;
  color: rgb(147, 153, 159);
}
</style>
