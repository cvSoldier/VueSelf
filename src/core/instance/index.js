import { initData } from './init'
import { Compile } from '../../compiler/index'
import { callHook } from './lifecycle'

function VueSelf (options) {
  const self = this
  this.data = options.data
  Object.keys(options.data).forEach(function(key) {
    self.proxyKeys(key)
  });
  this._init(options);
  (this.created = options.created) && callHook(self, 'created')
  this.el = options.el
  this.methods = options.methods
  new Compile(options.el, this);
  (this.mounted = options.mounted) && callHook(self, 'mounted')
}

VueSelf.prototype = {
  _init: function (options) {
    initData(options.data)
  },
  proxyKeys: function (key) {
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
}

export default VueSelf