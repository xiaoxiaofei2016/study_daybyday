import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'Good',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  setup (props, { emit, slots, attrs }) {
    const aaa = ref(1)
    const bbb = ref('你家啊')
    const handleClick = () => {
      aaa.value++
    }
    const listmap = () => {
      return (
        <>
          <button onClick={handleClick}>{aaa.value}</button>
          <button>{bbb.value}</button>
        </>
      )
    }
    // console.log(props.list)
    // const { list } = props
    console.log(props.list)
    return () => (
      listmap()
    )
  }
})