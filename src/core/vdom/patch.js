import VNode, { cloneVNode } from './vnode'
import { isDef, isUndef, isPrimitive } from '../util/index'
import * as nodeOps from '../../platforms/web/runtime/node-ops'

function createElm (
  vnode,
  insertedVnodeQueue,
  parentElm,
  refElm,
  nested,
  ownerArray,
  index
) {
  const data = vnode.data
  const children = vnode.children
  const tag = vnode.tag

  vnode.elm = nodeOps.createElement(tag, vnode)
  createChildren(vnode, children, insertedVnodeQueue)

  insert(parentElm, vnode.elm, refElm)
}

function createChildren (vnode, children, insertedVnodeQueue) {
  if (Array.isArray(children)) {
    // if (process.env.NODE_ENV !== 'production') {
    //   checkDuplicateKeys(children) //检查是否有重复key
    // }
    for (let i = 0; i < children.length; ++i) {
      createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i)
    }
  } else if (isPrimitive(vnode.text)) {
    nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)))
  }
}

function insert (parent, elm, ref) {
  if (isDef(parent)) {
    if (isDef(ref)) {
      if (nodeOps.parentNode(ref) === parent) {
        nodeOps.insertBefore(parent, elm, ref)
      }
    } else {
      nodeOps.appendChild(parent, elm)
    }
  }
}

function emptyNodeAt (elm) {
  return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
}

function removeNode (el) {
  const parent = nodeOps.parentNode(el)
  // element may have already been removed due to v-html / v-text
  if (isDef(parent)) {
    nodeOps.removeChild(parent, el)
  }
}

export function patch (oldVnode, vnode, hydrating, removeOnly) {
  const insertedVnodeQueue = []
  if (isUndef(oldVnode)) {
    // 当oldVnode不存在时，创建新的节点
    // isInitialPatch = true
    createElm(vnode, insertedVnodeQueue)
  } else {
    // 对oldVnode和vnode进行diff，并对oldVnode打patch  
    const isRealElement = isDef(oldVnode.nodeType)
    if (!isRealElement && sameVnode(oldVnode, vnode)) {
      // patch existing root node
      patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
    } else {
      if(isRealElement) {
        oldVnode = emptyNodeAt(oldVnode)
      }

      const oldElm = oldVnode.elm
      const parentElm = nodeOps.parentNode(oldElm)

      createElm(
        vnode,
        insertedVnodeQueue,
        // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm,
        nodeOps.nextSibling(oldElm)
      )

      if (isDef(parentElm)) {
        // removeVnodes(parentElm, [oldVnode], 0, 0)
        removeNode(oldElm)
      }
    }
  }
  return vnode.elm
}
