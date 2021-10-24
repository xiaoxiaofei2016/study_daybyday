<template>
  <div v-if="list.length">
    <van-loading
      type="spinner"
      color="rgba(117, 95, 175, 1)"
      class="tab-spinner"
      :style="topValue"
      v-if="listLoad && firstLoading"
    />
    <van-list
      v-model="loading"
      :finished="finished"
      loading-text="加载中..."
      :immediate-check="false"
      @load="onLoad"
      :class="showBtn ? 'hot-list-ul' : ''"
      v-else
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        class="hot-list"
        :class="showBtn ? 'hot-list-showBtn' : ''"
      >
        <div class="top">
          <span class="title">{{ item.department }}</span>
          <div class="detail" @click="goto(item)">
            <span>详情</span>
            <img src="@/assets/image/arrow.png">
          </div>
        </div>
        <div class="info">
          <div class="detail">
            <div>
              岗位名称：
              <span>{{ item.position }}</span>
            </div>
            <div>
              报名时间：
              <span>{{ item.start_at }}</span>
              <span class="space">至</span>
              <span>{{ item.end_at }}</span>
            </div>
            <div>
              工作地点：
              <span>{{ item.address }}</span>
            </div>
            <div v-if="showBtn">
              咨询人：
              <span>{{ item.person }}</span>
            </div>
          </div>
          <div class="btn" v-if="showBtn">
            <van-button class="btn-apply" color="linear-gradient(118deg,rgba(111,177,235,1) 0%,rgba(126,103,189,1) 100%)" @click="apply(item)">
              {{ compare(item) }}
            </van-button>
          </div>
        </div>
        <van-popup v-model="item.showPopup" closeable>
          <span class="apply-info">报名信息</span>
          <van-field
            v-model="item.department"
            name="pattern"
            label="申请部门:"
            label-width="70px"
            class="department"
          />
          <van-field
            v-model="item.position"
            name="pattern"
            label-width="70px"
            label="申请岗位:"
          />
          <div class="btn" v-if="!item.hasApply">
            <span class="ok" @click="gotoApply(item)">确定</span>
            <span class="cancel" @click="cancel(item)">取消</span>
          </div>
        </van-popup>
      </van-cell>
      <div class="talk-to-talk" v-if="showBtn">
        <span>若没有找到心仪的岗位，可以去<span class="link" @click="gotoTalk">我想唠一唠</span>说嗷~</span>
      </div>
    </van-list>
  </div>
  <div v-else>
    <no-data></no-data>
  </div>
</template>

<script>
import { UserRecruitmentRecruitmentPosition, UserRecruitmentRecruitmentApply } from '@micro-jssdk/project-thinking'
import * as utils from '@/utils/util/findDepartment'
import { mapState } from 'vuex'
import { Toast } from 'vant'

export default {
  props: {
    showBtn: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      list: [],
      page: {
        page: 1,
        pageSize: 10
      },
      listLoad: false,
      loading: false,
      finished: false,
      firstLoading: true // 用来限制页面loading只执行一次
    }
  },
  computed: {
    ...mapState({
      screenHeight: state => state.mobile.screenHeight,
      staffInfo: state => state.user.staffInfo
    }),
    topValue () {
      const screenHeight = +this.screenHeight || document.documentElement.clientHeight
      return `top: ${screenHeight * 0.4}px`
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 上拉加载
    onLoad () {
      setTimeout(() => {
        this.getList()
      }, 500)
    },
    gotoTalk () {
      this.$router.push({
        name: 'MyCompetition',
        params: { num: 2 }
      })
    },
    async getList () {
      this.listLoad = true
      const req = {
        departmentId: this.id,
        page: this.page.page,
        pageSize: this.page.pageSize,
        status: this.showBtn ? 'open' : 'close'
      }
      if (this.loading) this.listLoad = false
      if (this.finished) return false
      const res = await UserRecruitmentRecruitmentPosition.listByDepartment(req)
      this.loading = false
      setTimeout(() => {
        this.listLoad = false
      }, 500)
      if (res.success) {
        if (this.page.page === 1) {
          this.list = this.handlePositionList(res.msg)
        } else {
          this.list.push(...this.handlePositionList(res.msg))
        }
        if (this.list.length === res.msg.total) {
          this.finished = true
        } else {
          this.page.page += 1
        }
      }
    },
    handlePositionList (msg) {
      if (msg.length === 0) return []
      const { data, departments, staffs, positions, applies } = msg
      data.forEach(item => {
        const departmentId = departments[item.department_id]
        const positionId = positions[item.position_id]
        const refereeId = staffs[item.referee_id]
        if (departmentId) {
          item.department = utils.findDepartment(departmentId.full_department, '/')
          item.isBlueStore = utils.isBlueStore(departmentId.full_department, '/')
        }
        if (positionId) {
          item.position = positionId.name
        }
        if (refereeId) {
          item.person = refereeId.nickname
        }
        // 火热竞聘还是过往竞聘都进入工作详情页面
        item.path = this.showBtn ? '/job_details' : '/history_details'
        item.showPopup = false
        item.start = true
        item.hasApply = false
      })
      if (applies !== null) {
        applies.forEach(apply => {
          const i = data.find(item => item.id === apply.recruitment_position_id)
          i.hasApply = true
        })
      }
      return data
    },
    goto (info) {
      const { id, path } = info
      this.$router.push({
        path,
        query: { id }
      })
    },
    // 判断是否到了报名开始时间
    compare (item) {
      const { start_at, hasApply } = item
      const oDate1 = new Date(start_at)
      const oDate2 = new Date()
      if (hasApply) {
        return '报名信息'
      } else {
        if (oDate1 < oDate2) {
          item.start = true
          return '我要报名'
        } else {
          item.start = false
          return '报名未开始'
        }
      }
    },
    async apply (item) {
      const { id, start, isBlueStore, hasApply } = item
      if (!start) return
      if (isBlueStore) {
        item.showPopup = true
      } else {
        const type = hasApply ? 'detail' : 'create'
        localStorage.setItem('type', JSON.stringify(type))
        this.$router.push({
          path: '/application',
          query: { id }
        })
      }
    },
    async gotoApply (item) {
      item.showPopup = false
      const canApply = await this.getApplyCount()
      if (!canApply) return false
      const staff = this.staffInfo
      const req = {
        nickname: staff.nick_name,
        name: staff.name,
        staff_id: staff.staff_id,
        position: item.position
      }
      const arrData = []
      arrData.push(req)
      await UserRecruitmentRecruitmentApply.submit({ id: item.id, extraInfo: arrData })
    },
    // 获取本月报名次数
    async getApplyCount () {
      const res = await UserRecruitmentRecruitmentApply.getMonthlyCount()
      if (res.success) {
        if (res.msg && res.msg === 3) {
          Toast.fail('本月已报名3个岗位，期待下月竞聘!')
          return false
        } else {
          return true
        }
      }
    },
    cancel (item) {
      item.showPopup = false
    }
  }
}
</script>

<style lang="less" scoped>
.van-list {
  position: relative;
  width: 347px;
  margin: 12px auto 0;
  margin-bottom: calc(11px + env(safe-area-inset-bottom));
  margin-bottom: calc(11px + constant(safe-area-inset-bottom));

  &.hot-list-ul {
    padding-bottom: 36px;
  }

  .talk-to-talk {
    position: absolute;
    bottom: 11px;
    left: 39px;
    height: 16px;

    span {
      width: 244px;
      height: 16px;
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      color: rgba(117, 118, 122, 1);
    }

    .link {
      width: 55px;
      color: rgba(117, 95, 175, 1);
      border-bottom: 1px solid rgba(117, 95, 175, 1);
    }
  }

  .van-popup {
    width: 200px;
    height: auto;
    padding: 10px;
    text-align: center;
    background: rgba(51, 52, 58, 1);
    border-radius: 7px;

    /deep/ .van-field__label {
      color: rgba(255, 255, 255, 0.7);
    }

    .apply-info {
      display: inline-block;
      padding-bottom: 10px;
      font-size: 16px;
      font-weight: 500;
      color: #fff;
    }

    .van-field,
    /deep/ .van-field__control {
      color: #fff;
      background: rgba(51, 52, 58, 1);
    }

    .btn {
      display: flex;
      justify-content: center;
      margin-top: 10px;
      text-align: center;

      .ok,
      .cancel {
        width: 60px;
        color: #fff;
        background: linear-gradient(118deg, rgba(111, 177, 235, 1) 0%, rgba(126, 103, 189, 1) 100%);
        border: 1px solid #fff;
        border-radius: 10px;
      }

      .ok {
        margin-right: 30px;
      }
    }

    /deep/ .van-popup__close-icon--top-right {
      top: 10px;
      right: 10px;
    }
  }

  .van-cell {
    padding: 0;
  }

  .hot-list {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 347px;
    height: 175px;
    margin-bottom: 15px;
    background: url('~@/assets/image/starrySky_small.png') no-repeat 0 0;
    background-size: 347px 175px;
    border-radius: 12px;

    &.hot-list-showBtn {
      height: 243px;
      background: url('~@/assets/image/starrySky_big.png') no-repeat 0 0;
      background-size: 347px 243px;
    }

    .top {
      position: relative;
      height: 44px;
      border-bottom: 1px solid rgba(170, 171, 173, 0.3);

      .title {
        position: absolute;
        top: 12px;
        left: 15px;
        display: inline-block;
        height: 21px;
        font-size: 15px;
        font-weight: 500;
        line-height: 21px;
        color: rgba(255, 255, 255, 1);
      }

      .detail {
        position: absolute;
        top: 12px;
        right: 15px;
        display: inline-block;
        height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.6);

        img {
          height: 15px;
          transform: translate3d(0, 23%, 0);
        }
      }
    }

    .info {
      width: 347px;
      margin: 15px 16px 0 16px;

      .detail {
        div {
          height: 18px;
          margin-bottom: 14px;
          font-size: 13px;
          font-weight: 400;
          line-height: 18px;
          color: rgba(255, 255, 255, 0.6);

          span {
            display: inline-block;
            color: rgba(255, 255, 255, 1);
          }

          .space {
            padding: 0 4px;
          }
        }
      }

      .btn {
        position: relative;

        .van-button {
          position: absolute;
          top: 0;
          z-index: 1;
          width: 148px;
          height: 36px;
          border-radius: 20px;
        }

        .btn-advice {
          left: 0;
        }

        .btn-apply {
          right: 32px;
        }
      }
    }
  }
}
</style>
