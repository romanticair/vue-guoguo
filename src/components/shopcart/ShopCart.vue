<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}元</div>
        <div class="desc">另需配送费{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" @click.stop="pay">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <transition-group
        name="drop"
        tag="div"
        @before-enter="beforeEnter"
        @enter="dropEnter"
        @after-enter="afterEnter"
      >
        <div
          v-for="ball in balls"
          v-show="ball.show"
          class="ball"
          :key="ball.id"
        >
          <span class="inner inner-hook"></span>
        </div>
      </transition-group>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="(food,index) in selectFoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price * food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <CartControl :food="food"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import CartControl from '@/components/cartcontrol/CartControl.vue'
  import BScroll from 'better-scroll'

  export default {
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 10,
              count: 1
            }
          ]
        }
      }
    },
    data() {
      return {
        // 球的数量太少的话，点击 + 太快，正在执行的动画没执行完又得重新开始了
        balls: [
          { show: false, id: 1 },
          { show: false, id: 2 },
          { show: false, id: 3 },
          { show: false, id: 4 },
          { show: false, id: 5 }
        ],
        dropBalls: [],
        fold: true
      }
    },
    computed: {
      totalPrice() {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount() {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listShow() {
        let This = this
        if (!this.totalCount) {
          This.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!This.scroll) {
              This.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              This.scroll.refresh()
            }
          })
        }
        return show
      }
    },
    methods: {
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          // 哪个空着用那个
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeEnter(el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            // ball.el 是 + 号图标元素
            let rect = ball.el.getBoundingClientRect()
            // 球,红砖块即将下落分别的 x 和 y
            let x = rect.left - 18
            let y = -(window.innerHeight - rect.top - 22 - 18)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      dropEnter(el, done) {
        /* eslint-disable no-unused-vars */
        // 上句防止 es6 检查报错
        // 触发浏览器重绘，否则可能显示不出
        let rf = el.offsetWidth
        this.$nextTick(() => {
          // 都回到原位(购物篮)
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
          el.addEventListener('transitionend', done)
        })
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift()
        ball.show = false
        ball.el = null
        el.style.display = 'none'
      },
      toggleList() {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0
          console.log(food.count)
        })
      },
      hideList() {
        this.fold = true
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return
        }
        window.alert(`支付${this.totalPrice}元`)
      }
    },
    components: {
      CartControl: CartControl
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../assets/stylus/icon.styl'
  @import "../../assets/stylus/mixin.styl"

  .shopcart
    position: fixed
    width: 100%
    height: 48px
    left: 0
    bottom: 0
    z-index: 10
    .content
      display: flex
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      background: #141d27
      .content-left
        flex: 1
        .logo-wrapper
          position: relative
          display: inline-block
          box-sizing: border-box
          width: 56px
          height: 56px
          top: -10px
          margin: 0 12px
          padding: 6px
          border-radius: 50%
          vertical-align: top
          background: #141d27
          .num
            position: absolute
            width: 24px
            height: 16px
            top: 0
            right: 0
            line-height: 16px
            font-size: 9px
            font-weight: 700
            text-align: center
            border-radius: 16px
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
            color: #fff
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
        .price
          display: inline-block
          box-sizing: border-box
          margin-top: 12px
          padding-right: 12px
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          vertical-align: top
          font-size: 16px
          line-height: 24px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          margin: 12px 0 0 12px
          vertical-align: top
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            color: #fff
            background: #00b43c
    .ball-container
      .ball
        position: fixed
        /*从 menu-item 上掉下来的红砖块*/
        width: 20px
        height: 20px
        left: 32px
        bottom: 22px
        z-index: 11
        background: red
        .inner
          position: absolute
          //小球的尺寸
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 1s linear
        &.drop-enter-active
          transition: all 1s cubic-bezier(0.49, -0.29, 0.75, 0.41)
         /*&.drop-enter
           transform: translate3d(0, -400px, 0)
           .inner
             transform: translate3d(300px, 0, 0)
         &.drop-enter-to
           transform: translate3d(0, 0, 0)
           .inner
             transform: translate3d(0, 0, 0)*/
    .shopcart-list
      position: absolute
      width: 100%
      top: 0
      left: 0
      z-index: -1
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.3s
      &.fold-enter, &.fold-leave-to
        opacity: 1
        transform: translate3d(0, 0, 0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        background: #f3f5f7
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        overflow: hidden
        padding: 0 18px
        max-height: 240px
        background: #fff
        .food
          position: relative
          box-sizing: border-box
          padding: 12px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            font-size: 14px
            color: rgb(7, 17, 27)
            line-height: 24px
          .price
            position: absolute
            right: 90px
            bottom: 12px
            font-size: 14px
            line-height: 24px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px
    .list-mask
      position: fixed
      width: 100%
      height: 100%
      top: 0
      left: 0
      z-index: -2
      backdrop-filter: blur(10px)
      background: rgba(7, 17, 27, 0.6)
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.5s
      &.fade-enter, &.fade-leave-to
        opacity: 0
        background: rgba(7, 17, 27, 0)
</style>
