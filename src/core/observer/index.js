import Dep from './dep'
import { def, isObject } from '../util/index'

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
export class Observer {
  value;
  dep;
  
  constructor(value) {
    this.value = value
    this.dep = new Dep()
    def(value, '__ob__', this)
    if(Array.isArray(value)) {
      // balabala
    } else {
      this.walk(value)
    }
  }
  
  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk(obj) {
    const keys = Object.keys(obj)
    for (let i = 0, len = keys.length; i< len; i++) {
      defineReactive(obj, keys[i])
    }
  }
}

export function observe(value) {
  if(!isObject(value)) return
  let ob
  ob = new Observer(value)
  return ob
}

export function defineReactive (obj, key, val) {
  const dep = new Dep()
  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }
  
  const getter = property && property.get
  const setter = property && property.set
  if((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }
  
  let childObj = observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend()
        if (childObj) {
          childObj.dep.depend()
          if (Array.isArray(value)) {
            // balabala
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
      if (newVal === value) {
        return
      }
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childObj = observe(newVal)
      dep.notify()
    }
  })
}