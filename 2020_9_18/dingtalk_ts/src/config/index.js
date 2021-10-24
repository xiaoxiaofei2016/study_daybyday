export const TABBARS = [
  {
    title: '首页',
    path: '/',
    icon: {
      active: require('@/assets/image/home_active.png'),
      inactive: require('@/assets/image/home.png')
    }
  },
  {
    title: '历史竞聘',
    path: '/history_competition',
    icon: {
      active: require('@/assets/image/history_active.png'),
      inactive: require('@/assets/image/history.png')
    }
  },
  {
    title: '部门风采',
    path: '/department_style',
    icon: {
      active: require('@/assets/image/style_active.png'),
      inactive: require('@/assets/image/style.png')
    }
  },
  {
    title: '我的竞聘',
    path: '/my_competition',
    icon: {
      active: require('@/assets/image/user_active.png'),
      inactive: require('@/assets/image/user.png')
    }
  }
]

export const DEPARTMENT_CONFIG = [
  {
    name: '总裁办',
    department_id: 1,
    image: require('@/assets/image/crown.png')
  },
  {
    name: '蓝标事业部',
    department_id: 11,
    image: require('@/assets/image/himo_blue.png')
  },
  {
    name: '大师事业部',
    department_id: 143,
    image: require('@/assets/image/himo_gold.png')
  },
  {
    name: '财务部',
    department_id: 8,
    image: require('@/assets/image/finance.png')
  },
  {
    name: 'HIMOKIDS事业部',
    department_id: 364,
    image: require('@/assets/image/himo_kids.png')
  },
  {
    name: '缦图莱思学院',
    department_id: 435,
    image: require('@/assets/image/maintolens.png')
  },
  {
    name: '泽维尔学院',
    department_id: 139,
    image: require('@/assets/image/xavier.png')
  },
  {
    name: '缦图云端',
    department_id: 3,
    image: require('@/assets/image/cloud.png')
  },
  {
    name: '缦图摄影事业部',
    department_id: 13,
    image: require('@/assets/image/etailProducts.png')
  },
  {
    name: '互联网中心',
    department_id: 5,
    image: require('@/assets/image/Internet.png')
  },
  {
    name: '品牌艺术中心',
    department_id: 4,
    image: require('@/assets/image/art.png')
  },
  {
    name: '零售产品部',
    department_id: 456,
    image: require('@/assets/image/etailProducts.png')
  },
  {
    name: '供应链产品部',
    department_id: 448,
    image: require('@/assets/image/supplyChain.png')
  },
  {
    name: '人力资源行政部',
    department_id: 7,
    image: require('@/assets/image/humanResources.png')
  },
  {
    name: '拓展部',
    department_id: 413,
    image: require('@/assets/image/navigation.png')
  }
]

export const BLUE_STORE = [
  {
    department: '蓝标体验运营北区',
    ids: 137
  },
  {
    department: '蓝标体验运营南区',
    ids: 136
  },
  {
    department: '大师体验运营部',
    ids: 738
  }
]

export const MYCOMPETITIONBAR = [
  {
    title: '当前进度'
  },
  {
    title: '历史信息'
  },
  {
    title: '我想唠唠'
  },
  {
    title: '内聘文档'
  }
]
