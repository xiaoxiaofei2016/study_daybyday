export default {
  setup (
    props: object,
    { attrs, emit }: { attrs: { name: string }; emit: Function }
  ) {
    return { attrs, emit }
  },
  render (props: { attrs: { name: string }; emit: Function }) {
    return (
      <div
        onClick={() => {
          props.emit('updateName')
        }}
      >
        hello {props.attrs.name}
      </div>
    )
  }
}
