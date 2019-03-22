import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Goods from './components/goods/Goods.vue'
import Ratings from './components/ratings/Ratings.vue'
import Seller from './components/seller/Seller.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Goods },
    { path: '/goods', name: 'Goods', component: Goods },
    { path: '/ratings', name: 'Ratings', component: Ratings },
    { path: '/seller', name: 'Seller', component: Seller }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ],
  linkActiveClass: 'active'
})
