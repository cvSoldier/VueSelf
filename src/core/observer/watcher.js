import Dep from "./dep";

export class Watcher {
  cb
  vm
  exp
  value

  constructor (vm, exp, cb) {
    this.cb = cb
    this.vm = vm
    this.exp = exp
    this.value = this.get()
  }

  get () {
    Dep.target = this
    var value = this.vm.data[this.exp]
    Dep.target = null
    return value
  }

  update () {
    this.run()
  }
  run () {
    var value = this.vm.data[this.exp]
    var oldVal = this.value
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal)
    }
  }

  addDep (dep) { // 去重
    // const id = dep.id
    // if (!this.newDepIds.has(id)) {
    //   this.newDepIds.add(id)
    //   this.newDeps.push(dep)
    //   if (!this.depIds.has(id)) {
        dep.addSub(this)
    //   }
    // }
  }
}