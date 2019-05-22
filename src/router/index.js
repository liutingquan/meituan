import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../components/Goods'
import GoodsDetail from '../components/GoodsDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'goods',
      component: Goods
    },
    {
      path: 'goodsDetail/:id',
      name: 'goodsDetail',
      component: GoodsDetail
    }
  ]
})
