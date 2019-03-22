<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <div class="rating">好评率{{food.rating}}%</div>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <transition>
            <div
              @click.stop.prevent="addFirst($event)"
              v-show="!food.count || food.count===0"
              class="buy"
            >
              加入购物车
            </div>
          </transition>
          <div class="cartcontrol-wrapper">
            <CartControl :food="food" @ball-drop="_addFood"/>
          </div>
        </div>
        <Split v-show="food.info"/>
        <div class="info" v-show="food.info">
          <div class="title">商品信息</div>
          <p class="text">{{food.info}}</p>
        </div>
        <Split/>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <RatingSelect
            @ratingtype-select="selectRating"
            @content-toggle="toggleContent"
            :selectType="selectType"
            :onlyContent="onlyContent"
            :desc="desc"
            :ratings="food.ratings"
          />
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li
                v-for="(rating, index) in food.ratings"
                v-show="needShow(rating.rateType, rating.text)"
                class="rating-item border-1px"
                :key="index"
              >
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" class="avatar" width="12" height="12">
                </div>
                <div class="time">{{rating.rateTime | formatDate()}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up': rating.rateType===0,'icon-thumb_down': rating.rateType===1}"></span>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-ratings" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import BScroll from 'better-scroll'
  import CartControl from '@/components/cartcontrol/CartControl.vue'
  import Split from '@/components/split/Split.vue'
  import RatingSelect from '@/components/ratingselect/RatingSelect.vue'
  import { formatDate } from '../../assets/js/date.js'

  const ALL = 2

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      show() {
        this.showFlag = true
        this.onlyContent = false
        this.selectType = ALL
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide() {
        this.showFlag = false
      },
      addFirst(event) {
        if (!event._constructed) {
          return
        }
        this.$emit('ball-drop', event.target)
        Vue.set(this.food, 'count', 1)
      },
      _addFood(event) {
        this.$emit('ball-drop', event)
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false
        } else if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      },
      selectRating(type) {
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    components: {
      CartControl: CartControl,
      Split: Split,
      RatingSelect: RatingSelect
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/stylus/icon.styl"
  @import "../../assets/stylus/mixin.styl"

  .food
    position: fixed
    width: 100%
    top: 0
    left: 0
    bottom: 48px
    background: #fff
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
      transform: translate3d(0, 0, 0)
    &.move-enter, &.move-leave-to
      transform: translate3d(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        width: 100%
        height: 100%
        left: 0
        top: 0
      .back
        position: absolute
        top: 10px
        left: 10px
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: 28px
          color: #fff
    .content
      position: relative
      padding: 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
        font-size: 14px
      .detail
        line-height: 10px
        font-size: 0
        margin-bottom: 18px
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 18px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
      .buy
        position: absolute
        box-sizing: border-box
        right: 18px
        bottom: 18px
        height: 24px
        padding: 0 12px
        line-height: 24px
        font-size: 10px
        border-radius: 12px
        z-index: 1
        background: rgb(0, 160, 220)
      &.v-enter-active, &.v-leave-active
        transition: all 0.5s
      &.v-enter, &.v-leave-to
        opacity: 0
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        padding: 0 8px
        line-height: 24px
        font-size: 12px
        color: #0711b
    .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7, 17, 27)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .user
            position: absolute
            right: 0
            top: 16px
            line-height: 12px
            font-size: 0
            .name
              display: inline-block
              margin-right: 6px
              vertical-align: top
              font-size: 10px
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
          .text
            font-size: 12px
            line-height: 12px
            color: rgb(7, 17, 27)
            .icon-thum_up, .icon-thum_down
              margin-right: 4px
              line-height: 24px
              font-size: 12px
            .icon-thum_up
              color: rgb(0, 160, 220)
            .icon-thum_down
              color: rgb(147, 153, 159)
        .no-ratings
          padding: 16px 0
          font-size: 12px
          color: rgb(147, 153, 159)
</style>
