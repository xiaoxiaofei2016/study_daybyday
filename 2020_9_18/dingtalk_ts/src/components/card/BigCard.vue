<template>
  <div>
    <ul v-if="list.length">
      <li v-for="(item, index) in list" :key="index" class="flowers-list">
        <div class="top">
          <span class="title">{{ item.newDepartment }}</span>
          <div class="more" @click="goto(item)">
            <span>更多</span>
            <img src="@/assets/image/arrow.png">
          </div>
        </div>
        <div class="info">
          <div class="avatar">
            <img v-lazy="item.avatar">
          </div>
          <div class="deatil">
            <span class="name">{{ item.staffName }}</span>
            <span class="new-part">新部门：{{ item.newDepartment }}</span>
            <span class="new-job">新岗位：{{ item.newPosition }}</span>
          </div>
        </div>
      </li>
    </ul>
    <div v-else>
      <no-data :isTab="true"></no-data>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    goto (info) {
      const { id, path } = info
      this.$router.push({
        path: path,
        query: { id }
      })
    }
  }
}
</script>

<style lang="less" scoped>
ul {
  width: 347px;
  padding-bottom: calc(5px + env(safe-area-inset-bottom));
  padding-bottom: calc(5px + constant(safe-area-inset-bottom));
  margin: 12px auto 64px;

  .flowers-list {
    display: flex;
    flex-direction: column;
    width: 347px;
    height: 170px;
    margin-bottom: 15px;
    background-size: 347px 170px;
    .changeImg('starrySky_right', png);

    .top {
      position: relative;
      height: 20px;
      margin: 22px 0 16px;

      .title {
        position: absolute;
        top: 0;
        left: 15px;
        height: 20px;
        font-size: 17px;
        font-weight: 500;
        line-height: 20px;
        color: rgba(255, 255, 255, 1);
      }

      .more {
        position: absolute;
        top: 0;
        right: 15px;
        height: 20px;

        span {
          display: inline-block;
          margin-right: 2px;
          font-size: 14px;
          color: rgba(170, 171, 173, 0.6);
        }

        img {
          width: 15px;
          transform: translate3d(0, 18%, 0);
        }
      }
    }

    .info {
      display: flex;
      align-items: center;

      .avatar {
        width: 92px;
        height: 92px;
        margin: 0 20px;
        overflow: hidden;
        border-radius: 50%;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .deatil {
        display: flex;
        flex-direction: column;
        text-align: left;

        .name {
          height: 24px;
          margin-bottom: 15px;
          font-size: 17px;
          font-weight: 500;
          line-height: 24px;
          color: rgba(255, 255, 255, 1);
        }

        .new-part,
        .new-job {
          height: 17px;
          margin-bottom: 8px;
          font-size: 12px;
          line-height: 17px;
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
}
</style>
