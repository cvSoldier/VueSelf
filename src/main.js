import VueSelf from './core/instance/index'

new VueSelf({
  render(h) {
    return h('h1', this.str)
  },
  data: {
    str: 'hello'
  },
  mounted () {
    setTimeout(() => {
      this.str = 'hello world'
    }, 1000)
  }
}).$mount('#app')