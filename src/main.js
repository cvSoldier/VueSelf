import VueSelf from './core/instance/index'

new VueSelf({
  render(h) {
    return h('h1', this.name)
  },
  data: {
    name: 'Ox28fe88'
  },
  methods: {
    clickMe () {
      this.title.str += 'hello world'
    }
  },
  created () {
    console.group('------created创建完毕状态------');
    console.log("%c%s", "color:red","el     : " + this.el)
    console.log("%c%s", "color:red","data   : " + this.data)
    console.log("%c%s", "color:red","message: " + this.title)
  },
  mounted () {
    window.setTimeout(() => {
      this.name = 'Ox28fe84'
    }, 1000)
    console.group('------mounted创建完毕状态------')
    console.log("%c%s", "color:red","el     : " + this.el)
    console.log("%c%s", "color:red","data   : " + this.data)
    console.log("%c%s", "color:red","message: " + this.title)
  }
}).$mount('#app')