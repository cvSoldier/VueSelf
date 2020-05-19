import { createEmptyVNode } from '../vdom/vnode'
import Watcher from '../observer/watcher'
import { noop } from '../util/index'

export function callHook (vm, hook) {
  const handlers = vm.$options[hook]
  if(handlers) {
    handlers.apply(vm)
  }
}

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function(vnode, hydrating) {
    const vm = this
    // const prevEl = vm.$el
    const prevVnode = vm._vnode
    vm._vnode = vnode

    if(!prevVnode) {
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false)
    } else {
      vm.$el = vm.__patch__(prevVnode, vnode)
    }
  }
}

export function mountComponent (vm, el, hydrating) {
  vm.$el = el
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode
  }
  callHook(vm, 'beforeMount')

  let updateComponent = () => {
    vm._update(vm._render(), hydrating)
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before () {
      // if (vm._isMounted && !vm._isDestroyed) {
      //   callHook(vm, 'beforeUpdate')
      // }
    }
  }, true /* isRenderWatcher */)
  hydrating = false

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    debugger
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}