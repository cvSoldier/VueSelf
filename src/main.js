import VueSelf from './core/instance/index'

new VueSelf({
  el: '#app',
  data: {
    title: {
      str: 'hello world'
    },
    name: {
      str: 'Ox28fe88'
    }
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
  mounted: function () {
    window.setTimeout(() => {
      this.title.str = '你好'
    }, 1000)
    console.group('------mounted创建完毕状态------')
    console.log("%c%s", "color:red","el     : " + this.el)
    console.log("%c%s", "color:red","data   : " + this.data)
    console.log("%c%s", "color:red","message: " + this.title)
  }
})