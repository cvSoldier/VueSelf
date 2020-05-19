import { pushTarget, popTarget } from './dep';

export default class Watcher {
  cb
  vm
  exp
  value
  getter

  constructor (vm, exp, cb, options, isRenderWatcher) {
    this.cb = cb
    this.vm = vm
    if (isRenderWatcher) {
      vm._watcher = this
    }
    this.exp = exp
    if (typeof exp === 'function') {
      this.getter = exp
    }
    this.value = this.get()
  }

  get () {
    pushTarget(this)
    const vm = this.vm
    var value = this.getter.call(vm, vm)
    popTarget()
    return value
  }

  update () {
    this.run()
  }
  run () {
    const vm = this.vm
    var value = this.getter.call(vm, vm)
    var oldVal = this.value
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal)
    }
  }

  addDep (dep) { 
    // const id = dep.id // 去重
    // if (!this.newDepIds.has(id)) {
    //   this.newDepIds.add(id)
    //   this.newDeps.push(dep)
    //   if (!this.depIds.has(id)) {
        dep.addSub(this)
    //   }
    // }
  }
}