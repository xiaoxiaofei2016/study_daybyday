<template>
  <div>
    <ul v-if="list.length">
      <li
        v-for="(item, index) in list"
        :key="index"
        class="hot-list"
        @click="goto(item)"
      >
        <div class="img">
          <img :src="item.image" class="department"/>
        </div>
        <span class="title">{{ item.name }}</span>
        <img src="@/assets/image/arrow_big.png" class="arrow" />
      </li>
    </ul>
    <div v-else>
      <no-data :isTab="isTab"></no-data>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    isTab: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goto (info) {
      const { path, department_id } = info
      this.$store.commit('keepAlive/SET_KEEP_ALIVE', ['HotCompetition', 'CompetitionInfo'])
      this.$router.push({
        path,
        query: { id: department_id }
      })
    }
  }
}
</script>

<style lang="less" scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: calc(5px + env(safe-area-inset-bottom));
  padding-bottom: calc(5px + constant(safe-area-inset-bottom));
  margin: 22px auto 49px;

  .hot-list {
    position: relative;
    display: flex;
    align-items: center;
    width: 170px;
    height: 92px;
    margin-bottom: 15px;
    line-height: 92px;
    background: rgba(44, 45, 50, 1);
    border-radius: 12px;

    &:nth-child(odd) {
      margin-left: 12px;
    }

    &:nth-child(even) {
      margin-left: 11px;
    }

    .img {
      position: relative;
      width: 60px;
      height: 92px;

      img {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        max-width: 50%;
        max-height: 50%;
        margin: auto;
      }
    }

    .arrow {
      position: absolute;
      right: 0;
      z-index: 1;
      transform: scale(0.5);
    }

    .title {
      position: absolute;
      right: 35px;
      width: 75px;
      min-height: 21px;
      font-size: 15px;
      font-weight: 500;
      line-height: 21px;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
