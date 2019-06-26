import Dep from './dep';
import { parsePath } from '../util/index'

export class Watcher {
  cb
  vm
  exp
  value
  getter

  constructor (vm, exp, cb) {
    this.cb = cb
    this.vm = vm
    this.exp = exp
    this.getter = parsePath(exp)
    this.value = this.get()
  }

  get () {
    Dep.target = this
    const vm = this.vm
    var value = this.getter.call(vm, vm)
    Dep.target = null
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