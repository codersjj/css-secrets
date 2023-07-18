// loop over a set of elements that match a certain CSS selector
export function $$(selector, context) {
  context = context || document
  const elements = context.querySelectorAll(selector)
  return Array.prototype.slice.call(elements)
}