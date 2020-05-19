export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export function noop (a, b, c) {}

export function isUndef (v) {
  return v === undefined || v === null
}

export function isDef (v) {
  return v !== undefined && v !== null
}
export function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}