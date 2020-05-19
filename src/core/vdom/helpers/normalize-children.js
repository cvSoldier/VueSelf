import { createTextVNode } from '@/core/vdom/vnode'
import { isPrimitive } from '@/shared/utils'

export function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}