import VNode, { createEmptyVNode } from '../vdom/vnode'
import { createElement } from '../vdom/create-element'

export function initRender (vm) {
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)
}
export function renderMixin (Vue) {

  Vue.prototype.$nextTick = function (fn) {
    // return nextTick(fn, this)
  }

  Vue.prototype._render = function () {
    const vm = this
    const { render, _parentVnode } = vm.$options

    // if (_parentVnode) {
    //   vm.$scopedSlots = normalizeScopedSlots(
    //     _parentVnode.data.scopedSlots,
    //     vm.$slots,
    //     vm.$scopedSlots
    //   )
    // }

    // // set parent vnode. this allows render functions to have access
    // // to the data on the placeholder node.
    // vm.$vnode = _parentVnode
    // // render self
    let vnode

    vnode = render.call(vm._renderProxy, vm.$createElement)

    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0]
    }
    // // return empty vnode in case the render function errored out
    // if (!(vnode instanceof VNode)) {
    //   if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
    //     warn(
    //       'Multiple root nodes returned from render function. Render function ' +
    //       'should return a single root node.',
    //       vm
    //     )
    //   }
    //   vnode = createEmptyVNode()
    // }
    // set parent
    vnode.parent = _parentVnode
    return vnode
  }
}