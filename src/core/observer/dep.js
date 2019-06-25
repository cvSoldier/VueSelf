/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
export default class Dep {
  static target
  subs

  constructor () {
    this.subs = []
  }

  addSub (sub) {
    this.subs.push(sub)
  }
  removeSub (sub) {
    console.log('removeSub called')
  }
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
  notify () {
    for (let i = 0, l = this.subs.length; i < l; i++) {
      this.subs[i].update()
    }
  }
}