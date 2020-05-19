import { initData } from './init'
// import { Compile } from '../../compiler/index'
import { patch } from '../vdom/patch'
import { lifecycleMixin } from './lifecycle'
import { renderMixin } from './render'
import { callHook, mountComponent } from './lifecycle'

function VueSelf (options) {
  const self = this
  self.$options = options
  this.data = options.data
  Object.keys(options.data).forEach(function(key) {
    self.proxyKeys(key)
  });
  this._init(options);
  this.methods = options.methods;
  (this.created = options.created) && callHook(self, 'created')
  if(options.el) {
    self.el = options.el
    self.$mount(this.el)
  }
  // (this.mounted = options.mounted) && callHook(self, 'mounted')
}

VueSelf.prototype._init = function (options) {
  initData(options.data)
},
VueSelf.prototype.proxyKeys = function (key) {
  this._renderProxy = this
  var self = this;
  Object.defineProperty(this, key, {
    enumerable: false,
    configurable: true,
    get: function getter () {
      return self.data[key]
    },
    set: function setter (newVal) {
      self.data[key] = newVal
    }
  });
}
VueSelf.prototype.__patch__ = patch
VueSelf.prototype.$mount = function(el) {
  el = document.querySelector(el)
  return mountComponent(this, el)
}

lifecycleMixin(VueSelf)
renderMixin(VueSelf)

export default VueSelf