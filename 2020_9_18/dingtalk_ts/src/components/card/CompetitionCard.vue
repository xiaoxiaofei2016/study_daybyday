<template>
  <div>
    <ul v-if="list.length">
      <van-loading
        type="spinner"
        color="rgba(117, 95, 175, 1)"
        class="tab-spinner"
        :style="topValue"
        v-if="Load"
      />
      <li
        v-for="(item, index) in list"
        :key="index"
        v-else
        class="competition-list"
        :class="showResult ? 'competition-list-showRes' : ''"
      >
        <div class="top">
          <span class="title">竞聘部门：{{ item.newOtherDepart }}</span>
        </div>
        <div class="info">
          <div class="detail" v-if="showResult">
            <div>
              岗位名称：
              <span>{{ item.newPosition }}</span>
            </div>
            <div>
              一级部门：
              <span>{{ item.newOtherDepart }}</span>
            </div>
            <div>
              竞聘时间：
              <span>{{ getTime(item.created_at) }}</span>
            </div>
            <div>
              竞聘结果：
            </div>
          </div>
          <div class="detail" v-else>
            <div>
              岗位名称：
              <span>{{ item.newPosition }}</span>
            </div>
            <div>
              一级部门：
              <span>{{ item.newOtherDepart }}</span>
            </div>
            <div>
              当前岗位进度：
              <span>{{ getStatus(item.progress) }}</span>
            </div>
          </div>
          <div class="result" v-if="showResult">
            <img src="@/assets/image/success.png" v-if="item.progress === 'success'">
            <img src="@/assets/image/fail.png" v-else>
          </div>
        </div>
      </li>
    </ul>
    <div v-else>
      <no-data></no-data>
    </div>
  </div>
</template>

<script>
import { UserRecruitmentRecruitmentApply } from '@micro-jssdk/project-thinking'
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  props: {
    showResult: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      list: [],
      Load: false
    }
  },
  computed: {
    ...mapState({
      screenHeight: state => state.mobile.screenHeight
    }),
    topValue () {
      const screenHeight = +this.screenHeight || document.documentElement.clientHeight
      return `top: ${screenHeight * 0.3 / 37.5}rem`
    }
  },
  watch: {
    showResult: {
      handler (newVal, oldVal) {
        this.getList()
      },
      immediate: true
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      this.Load = true
      const req = {
        progress: this.showResult ? ['success', 'fail'] : ['compete', 'apply']
      }
      const res = await UserRecruitmentRecruitmentApply.myList(req)
      setTimeout(() => {
        this.Load = false
      }, 500)
      if (res.success) {
        this.list = this.handleList(res.msg)
      }
    },
    getTime (time) {
      return moment(time).format('YYYY-MM-DD')
    },
    handleList (msg) {
      if (msg.length === 0) return []
      const { data, departments, positions } = msg
      data.forEach(item => {
        const newDepartmentId = departments[item.new_department_id]
        const newPositionId = positions[item.new_position_id]
        if (newDepartmentId) {
          item.newOtherDepart = newDepartmentId.name
        }
        if (newPositionId) {
          item.newPosition = newPositionId.name
        }
      })
      return data
    },
    getStatus (status) {
      switch (status) {
        case ('apply'):
          return '报名中'
        case ('compete'):
          return '竞聘中'
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
ul {
  position: relative;
  width: 347px;
  padding-bottom: calc(5px + env(safe-area-inset-bottom));
  padding-bottom: calc(5px + constant(safe-area-inset-bottom));
  margin: 12px auto 0;

  .competition-list {
    display: flex;
    flex-direction: column;
    width: 347px;
    height: 176px;
    margin-bottom: 15px;
    background: url('~@/assets/image/sky_compete_small.png') no-repeat 0 0;
    background-size: 347px 176px;
    border-radius: 12px;

    &.competition-list-showRes {
      height: 205px;
      background: url('~@/assets/image/sky_compete_big.png') no-repeat 0 0;
      background-size: 347px 205px;
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
    }

    .info {
      position: relative;
      width: 347px;
      margin: 15px 0 0 16px;

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

      .result {
        position: absolute;
        right: 23px;
        bottom: 10px;
        z-index: 1;
        width: 140px;

        img {
          width: 140px;
        }
      }
    }
  }
}
</style>
