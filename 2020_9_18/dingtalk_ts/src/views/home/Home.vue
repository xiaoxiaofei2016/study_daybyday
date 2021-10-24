<template>
  <div class="home">
    <div class="home-wrap" v-if="!Load">
      <van-swipe
        class="my-swipe"
        :autoplay="3000"
        indicator-color="white"
        style="height: 4.24rem;"
      >
        <van-swipe-item v-for="(item, index) in imgList" :key="index">
          <img :src="item.cover_image" class="img"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="bg-img">
      <img src="@/assets/image/starrySky_white.png">
    </div>
    <div class="tab" v-if="!Load">
      <van-tabs
        background="none"
        title-active-color="#fff"
        swipe-threshold="3"
        line-width="0.85rem"
      >
        <van-tab
          v-for="(item, index) in tabList"
          :key="index"
          :title="item.title"
          title-style="font-size:0.45rem;font-weight:500;line-height:0.64rem"
        >
          <div v-if="index === 0">
            <small-card :list="positionList" :isTab="true"></small-card>
          </div>
          <div v-if="index === 1">
            <big-card :list="tokenList"></big-card>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <van-loading
      type="spinner"
      color="rgba(117, 95, 175, 1)"
      class="full-spinner"
      v-if="Load"
    />
  </div>
</template>

<script>
import smallCard from '@/components/card/SmallCard.vue'
import bigCard from '@/components/card/BigCard.vue'
import { UserRecruitmentRecruitmentBanner, UserRecruitmentRecruitmentPosition, UserRecruitmentRecruitmentTaken } from '@micro-jssdk/project-thinking'
import { DEPARTMENT_CONFIG } from '@/config'
import * as utils from '@/utils/util/findDepartment'

export default {
  name: 'Home',
  components: {
    smallCard,
    bigCard
  },
  data () {
    return {
      imgList: [], // banner图列表
      tabList: [
        {
          title: '当下火热竞聘'
        },
        {
          title: '本月名花有主'
        }
      ],
      positionList: [], // 当前火热竞聘列表
      tokenList: [], // 本月名花有主列表
      Load: false
    }
  },
  created () {
    this.Load = true
    this.init()
  },
  methods: {
    init () {
      Promise.all([
        this.getImgList(),
        this.getPositionList(),
        this.getTakenList()
      ]).finally(() => {
        this.Load = false
      })
    },
    async getImgList () {
      const req = {
        status: 'open'
      }
      const res = await UserRecruitmentRecruitmentBanner.allByStatus(req)
      if (res.success) {
        this.imgList = this.handleBannerList(res.msg)
      }
    },
    async getTakenList () {
      const req = {
        status: 'open'
      }
      const res = await UserRecruitmentRecruitmentTaken.listByStatus(req)
      if (res.success) {
        this.tokenList = this.handleTakenList(res.msg)
      }
    },
    async getPositionList () {
      this.positionLoad = true
      const req = {
        status: 'open'
      }
      const res = await UserRecruitmentRecruitmentPosition.departmentsByStatus(req)
      if (res.success) {
        this.positionLoad = false
        this.positionList = this.handlePositionList(res.msg)
      }
    },
    handleBannerList (data) {
      if (data.length === 0) return []
      data.forEach((item) => {
        item.cover_image = process.env.VUE_APP_UPYUN_HOST + item.cover_image
      })
      return data
    },
    handlePositionList (data) {
      if (data.length === 0) return []
      const newDepartmentList = []
      const department_config = JSON.parse(JSON.stringify(DEPARTMENT_CONFIG))
      data.forEach((item) => {
        const parantId = item.parent_info
        if (parantId.length > 0) {
          item.id = +parantId[0].id
        }
        const newList = department_config.filter(i => {
          return item.id === i.department_id
        })
        if (newList.length === 0) return []
        const list = newList[0]
        list.path = '/hot_competition'
        newDepartmentList.push(list)
      })
      const newLists = utils.filterArray(newDepartmentList, 'department_id')
      return newLists
    },
    handleTakenList (msg) {
      if (msg.length === 0) return []
      const { departments, data, positions, staffs } = msg
      const newTokenList = []
      const department_config = JSON.parse(JSON.stringify(DEPARTMENT_CONFIG))
      data.forEach((item) => {
        const parantId = departments[item.new_department_id].parent_info
        const newDepartmentId = departments[item.new_department_id]
        const newPositionId = positions[item.new_position_id]
        const staff = staffs[item.staff_id]
        if (parantId.length > 0) {
          item.new_department_id = +parantId[0].id
        }
        const newList = department_config.filter(i => {
          return item.new_department_id === i.department_id
        })
        if (newList.length === 0) return []
        const list = newList[0]
        list.id = item.new_department_id
        list.avatar = process.env.VUE_APP_UPYUN_HOST + item.image_url
        list.path = '/famous_flowers'
        if (newDepartmentId) {
          list.newDepartment = newDepartmentId.name
        }
        if (newPositionId) {
          list.newPosition = newPositionId.name
        }
        if (staff) {
          list.staffName = staff.nickname
        }
        newTokenList.push(list)
      })
      const newLists = utils.filterArray(newTokenList, 'department_id')
      return newLists
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  position: relative;
  box-sizing: border-box;
  width: 375px;
  height: 100%;
  padding-top: 20px;

  .home-wrap {
    position: absolute;
    z-index: 1;
    width: 375px;
    height: 159px;
    overflow: hidden;

    .my-swipe {
      width: 375px;

      .van-swipe-item {
        box-sizing: border-box;
        padding: 0 14px;
      }

      .img {
        width: 347px;
        height: 159px;
        margin: 0 auto;
        border-radius: 12px;
      }
    }
  }

  .tab {
    position: absolute;
    top: 179px;
    z-index: 1;
    width: 375px;
  }
}
</style>
