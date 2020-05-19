export default function VNode(tag, data, children, text, elm, context) {
  this.tag = tag
  this.data = data
  this.key = data && data.key
  this.children = children
  this.text = text
  this.elm = elm
  this.context = context
}

export const createEmptyVNode = (text = '') => {
  const node = new VNode()
  node.text = text
  // node.isComment = true
  return node
}
export function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}
export function cloneVNode (vnode) {
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context
  )
  cloned.key = vnode.key
  return cloned
}