<template>
  <div v-if="list.length">
    <van-loading
      type="spinner"
      color="rgba(117, 95, 175, 1)"
      class="full-spinner"
      v-if="listLoad && firstLoading"
    />
    <van-list
      v-model="loading"
      :finished="finished"
      loading-text="加载中..."
      :immediate-check="false"
      @load="onLoad"
      class="flowers-list"
      v-else
    >
      <van-cell v-for="(item, index) in list" :key="index" class="flower-list">
        <div class="info">
          <div class="avatar">
            <div class="image">
              <img v-lazy="item.avatar">
            </div>
            <span class="flower-name">{{ item.nickname }}</span>
            <span class="real-name">姓名：{{ item.name }}</span>
          </div>
          <div class="detail" v-if="isHistory">
            <span>部门：{{ item.newDepart }}</span>
            <span>岗位：{{ item.newPosition }}</span>
            <span>时间：{{ item.success_at }}</span>
          </div>
          <div class="detail" v-else>
            <span class="new-part">新部门：{{ item.newDepart }}</span>
            <span class="new-job">新岗位：{{ item.newPosition }}</span>
            <span class="origin-part">原部门：{{ item.oldDepart }}</span>
            <span class="origin-job">原岗位：{{ item.oldPosition }}</span>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
  <div v-else>
    <no-data :text="noDataText"></no-data>
  </div>
</template>

<script>
import { UserRecruitmentRecruitmentTaken } from '@micro-jssdk/project-thinking'

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    // 是否是历史竞聘的组件
    isHistory: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      noDataText: this.isHistory ? '暂无结果公告' : '本月暂无内聘',
      loading: false,
      finished: false,
      listLoad: false,
      firstLoading: true, // 用来限制页面loading只执行一次
      list: [],
      page: {
        page: 1,
        pageSize: 10
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 下拉加载
    onLoad () {
      setTimeout(() => {
        this.getList()
      }, 500)
    },
    async getList () {
      this.listLoad = true
      const req = {
        page: this.page.page,
        pageSize: this.page.pageSize,
        newDepartmentId: this.id,
        status: this.isHistory ? 'close' : 'open'
      }
      if (this.loading) this.firstLoading = false
      if (this.finished) return false
      const res = await UserRecruitmentRecruitmentTaken.listByDepartment(req)
      this.loading = false
      setTimeout(() => {
        this.listLoad = false
      }, 500)
      if (res.success) {
        if (this.page.page === 1) {
          this.list = this.handleTakenList(res.msg)
        } else {
          this.list.push(...this.handleTakenList(res.msg))
        }
        if (this.list.length === res.msg.total) {
          this.finished = true
        } else {
          this.page.page += 1
        }
      }
    },
    handleTakenList (msg) {
      if (msg.length === 0) return []
      const { data, departments, staffs, positions } = msg
      data.forEach(item => {
        const newDepartmentId = departments[item.new_department_id]
        const oldDepartmentId = departments[item.old_department_id]
        const newPositionId = positions[item.new_position_id]
        const oldPositionId = positions[item.old_position_id]
        const staffId = staffs[item.staff_id]
        if (newDepartmentId) {
          item.newDepart = newDepartmentId.name
        }
        if (oldDepartmentId) {
          item.oldDepart = oldDepartmentId.name
        }
        if (newPositionId) {
          item.newPosition = newPositionId.name
        }
        if (oldPositionId) {
          item.oldPosition = oldPositionId.name
        }
        if (staffId) {
          item.nickname = staffId.nickname
          item.name = staffId.name
        }
        item.avatar = process.env.VUE_APP_UPYUN_HOST + item.image_url
      })
      return data
    }
  }

}
</script>

<style lang="less" scoped>
.flowers-list {
  width: 347px;
  padding-bottom: calc(5px + env(safe-area-inset-bottom));
  padding-bottom: calc(5px + constant(safe-area-inset-bottom));
  margin: 12px auto 0;

  .flower-list {
    display: flex;
    flex-direction: column;
    width: 347px;
    height: 158px;
    margin-bottom: 15px;
    background: url('~@/assets/image/starrySky_right.png') 0 0 no-repeat;
    background-size: 347px 158px;

    .info {
      display: flex;
      align-items: center;
      margin-top: 20px;

      .avatar {
        width: 72px;
        margin: 0 43px 0 9px;
        overflow: hidden;
        text-align: center;

        .image {
          width: 63px;
          height: 63px;
          margin: 0 auto 2px;
          overflow: hidden;
          border-radius: 50%;

          img {
            width: 63px;
            height: 63px;
          }
        }

        span {
          display: inline-block;
          height: 24px;
          font-size: 17px;
          font-weight: 500;
          line-height: 24px;
          color: rgba(255, 255, 255, 1);
        }

        .real-name {
          height: 17px;
          font-size: 12px;
          font-weight: 400;
          line-height: 17px;
          color: rgba(255, 255, 255, 0.6);
          text-overflow: hidden;
          white-space: nowrap;
        }
      }

      .detail {
        display: flex;
        flex-direction: column;
        margin-top: 9px;
        text-align: left;

        span {
          flex: 1;
          height: 17px;
          margin-bottom: 8px;
          font-size: 12px;
          font-weight: 400;
          line-height: 17px;
          color: rgba(255, 255, 255, 0.6);
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
