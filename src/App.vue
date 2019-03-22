<template>
  <div id="app">
    <v-Header :seller="seller"/>
    <nav class="tab border-1px">
      <div class="tab-item">
        <router-link tag="a" to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link tag="a" to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link tag="a" to="/seller">商家</router-link>
      </div>
    </nav>
    <!--组件通过 router-view 层现，不写该路由视图标签会报错-->
    <!--keep-alive用于保留组件状态避免重新渲染-->
    <keep-alive>
      <router-view :seller="seller"/>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  // Vue CLI by default aliases @ to <projectRoot>/src. (templates only)
  import Header from '@/components/header/Header.vue'

  const ERR_OK = 0
  export default {
    data() {
      return {
        seller: {}
      }
    },
    created() {
      this.$http.get('/api/seller')
        .then((response) => {
          response = response.body
          if (response.errno === ERR_OK) {
            this.seller = response.data
          }
        })
    },
    components: { 'v-Header': Header }
  }
</script>

<style lang="stylus" scoped>
  @import "./assets/stylus/mixin.styl"

  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        /*linkActiveClass*/
        &.active
          color: rgb(240, 20, 20)
</style>
