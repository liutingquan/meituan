<template>
  <div id="app">
    <V-header :seller="seller"></V-header>
    <div class="routes">
      <span
        v-for="(item, index) in info"
        :class="{active: item == check}"
        :key="index"
        @click="click(item)"
        tag="span"
      >{{item.info}}</span>
    </div>

    <router-view :goods="goods" :data="data"/>
  </div>
</template>

<script>
import Header from "./components/V-header";

export default {
  name: "App",
  data() {
    return {
      data: {},
      seller: {},
      goods: {},
      info: [
        { path: "/", info: "商品" },
        { path: "/comment", info: "評價" },
        { path: "/sell", info: "商家" }
      ],
      check: false
    };
  },
  components: {
    "V-header": Header
  },
  methods: {
    click(item) {
      this.check = item;
      this.$router.push(item.path)
    }
  },
  created() {
    this.$axios.get("/static/data.json").then(res => {
      this.data = res.data;
      this.seller = res.data.seller;
      this.goods = res.data.goods;
    });
  }
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
.routes {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 40px;
  border-bottom: 2px solid rgb(7, 17, 27, 0.1);
}
.routes span {
  font-size: 14px;
  line-height: 40px;
  color: rgb(77, 85, 93);
}
.routes span.active {
  color: rgb(240, 20, 20);
}
</style>
