<template>
  <div class="cartcontrol">
    <transition name="move">
      <div
        v-show="food.count > 0"
        @click.stop="decreaseCart($event)"
        class="cart-decrease"
      >
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="addCart($event)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        // 触发 _drop 事件(父组件处理)
        this.$emit('ball-drop', event.target)
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/stylus/icon.styl"

  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      transition: all 0.4s linear
      .inner
        display: inline-block
        font-size: 24px
        line-height: 24px
        color: rgb(0, 160, 220)
      &.move-enter-active, &.move-leave-active
        transition: all 1s
      &.move-enter, &.move-leave-to
        opacity: 0
        transform: translate3d(24px, 0, 0) rotate(360deg)
    .cart-count
      display: inline-block
      width: 12px
      padding-top: 6px
      line-height: 24px
      font-size: 10px
      text-align: center
      vertical-align: top
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 6px
      font-size: 24px
      line-height: 24px
      color: rgb(0, 160, 220)
</style>
