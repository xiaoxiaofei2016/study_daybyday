<template>
  <div>
    <ul v-if="list.length">
      <li v-for="(item, index) in list" :key="index" class="style-list">
        <img v-lazy="item.img" class="department-img"/>
        <div class="center">
          <span class="title">{{ item.title }}</span>
          <div class="detail" @click="goto(item)">
            <span>详情</span>
            <img src="@/assets/image/arrow.png">
          </div>
        </div>
        <div class="introduction">简介：{{ item.desc }}</div>
      </li>
    </ul>
    <div v-else>
      <no-data></no-data>
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
      const { path, id } = info
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
  margin: 0 auto;

  .style-list {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 347px;
    margin-bottom: 15px;
    background: #2c2d32;
    border-radius: 12px;

    .department-img {
      width: 315px;
      height: 150px;
      margin: 16px auto 15px;
    }

    .center {
      position: relative;
      height: 33px;

      .title {
        position: absolute;
        top: 0;
        left: 15px;
        display: inline-block;
        height: 22px;
        font-size: 16px;
        font-weight: 500;
        line-height: 22px;
        color: rgba(255, 255, 255, 1);
      }

      .detail {
        position: absolute;
        top: 0;
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

    .introduction {
      display: -webkit-box;
      width: 315px;
      height: 40px;
      margin: 0 auto 20px;
      overflow: hidden;
      font-size: 13px;
      font-weight: 400;
      line-height: 20px;
      color: rgba(255, 255, 255, 0.6);
      text-overflow: ellipsis;
      -webkit-line-clamp: 2; //行数
      -webkit-box-orient: vertical;
    }
  }
}
</style>
