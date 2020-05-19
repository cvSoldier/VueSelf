import {
  isDef,
  isPrimitive
} from '../util/index'

import VNode, { createEmptyVNode } from './vnode'

import {
  normalizeChildren
} from './helpers/index'

const SIMPLE_NORMALIZE = 1
const ALWAYS_NORMALIZE = 2

const isReservedTag = (tag) => {
  return true || isHTMLTag(tag) || isSVG(tag) // 偷懒
}

export function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children
    children = data
    data = undefined
  }
  if (alwaysNormalize === true) {
    normalizationType = ALWAYS_NORMALIZE
  }
  return _createElement(context, tag, data, children, normalizationType)
}

export function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
 
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children)
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children)
  }
  let vnode, ns
  if (typeof tag === 'string') {
    if (isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      )
    }
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) applyNS(vnode, ns)
    if (isDef(data)) registerDeepBindings(data)
    return vnode
  } else {
    return createEmptyVNode()
  }
}