export function callHook (vm, hook) {
  const handlers = vm[hook]
  if(handlers) {
    handlers.apply(vm)
  }
}