import { Watcher } from '../core/observer/watcher'
import { parsePath } from '../core/util/index'

export class Compile {
  vm
  el
  fragment
  getter
  watcher
  constructor(el, vm) {
    this.vm = vm
    if(el) {
      this.el = document.querySelector(el)
      this.fragment = this.nodeToFragment(this.el)
      this.compileElement(this.fragment)
      this.el.appendChild(this.fragment)
    } else {
      console.log('Dom元素不存在')
    }
  }
  
  nodeToFragment (el) {
    var fragment = document.createDocumentFragment()
    var child = el.firstChild
    while (child) {
      fragment.appendChild(child)
      child = el.firstChild
    }
    return fragment
  }

  compileElement (el) {
    var childNodes = el.childNodes
    var self = this
    Array.prototype.slice.call(childNodes).forEach(function(node) {
      var reg = /\{\{\s*(.*?)\s*\}\}/
      var text = node.textContent

      if (self.isElementNode(node)) {  
        self.compile(node)
      } else if (self.isTextNode(node) && reg.test(text)) {
        self.compileText(node, reg.exec(text)[1])
      }

      if (node.childNodes && node.childNodes.length) {
        self.compileElement(node)
      }
    });
  }

  compile (node) {
    var nodeAttrs = node.attributes
    var self = this
    Array.prototype.forEach.call(nodeAttrs, function(attr) {
      var attrName = attr.name
      if (self.isDirective(attrName)) {
        var exp = attr.value
        var dir = attrName.slice(2)
        if (self.isEventDirective(dir)) {  // 事件指令
          self.compileEvent(node, self.vm, exp, dir)
        } else {  // v-model 指令
          self.compileModel(node, exp, dir)
        }
        node.removeAttribute(attrName)
      }
    });
  }

  compileText (node, exp) {
    var self = this
    const vm = this.vm
    var initText = parsePath(exp).call(vm, vm)
    this.updateText(node, initText)
    new Watcher(this.vm, exp, function (value) {
      self.updateText(node, value)
    });
  }
  compileEvent (node, vm, exp, dir) {
    var eventType = dir.split(':')[1]
    var cb = vm.methods && vm.methods[exp]

    if (eventType && cb) {
      node.addEventListener(eventType, cb.bind(vm), false)
    }
  }
  compileModel (node, exp, dir) {
    var self = this
    const vm = this.vm
    var val = parsePath(exp).call(vm, vm)
    this.modelUpdater(node, val)
    this.watcher = new Watcher(this.vm, exp, function (value) {
      self.modelUpdater(node, value)
    });

    node.addEventListener ('input', function(e) {
      var newValue = e.target.value
      if (val === newValue) {
        return
      }
      let arr = self.getValue(self.vm, exp)
      arr[1][arr[0]] = newValue
      val = newValue
    })
  }
  updateText (node, value) {
    node.textContent = typeof value === 'undefined' ? '' : value
  }
  modelUpdater (node, value) {
    node.value = typeof value === 'undefined' ? '' : value
  }
  isDirective (attr) {
    return attr.indexOf('v-') == 0
  }
  isEventDirective (dir) {
    return dir.indexOf('on:') === 0
  }
  isElementNode (node) {
    return node.nodeType === 1
  }
  isTextNode (node) {
    return node.nodeType === 3
  }
  getValue (obj, exp) {
    if(exp.indexOf('.') === -1) {
      return [ exp, obj ]
    } else {
      const exps = exp.split('.')
      let value = obj
      for(let i = 0, len = exps.length - 1; i < len; i++) {
        value = value[exps[i]]
      }
      const lastKey = exps[exps.length - 1]
      return [ lastKey, value ]
    }
  }
}