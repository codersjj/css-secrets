/*
  Perform feature detection and add classes to the root element in the same fashion as Modernizr.
*/

/*
  check a property's existence on the element.style object of any element
  to determine whether the property is supported
*/
const root = document.documentElement // <html>
if ('textShadow' in root.style) {
  root.classList.add('textshadow')
} else {
  root.classList.add('no-textshadow')
}

/* test for multiple properties */
function testProperty(property) {
  const root = document.documentElement

  if (property in root.style) {
    root.classList.add(property.toLowerCase())
    return true
  }

  root.classList.add(`no-${property.toLowerCase()}`)
  return false
}

/*
  test a value
  assign it to the property and check if the browser retains it
  Because we are modifying styles here and not just testing for their existence, it makes sense to use a dummy element
*/
const dummyEl = document.createElement('p')
// 如果设置的值是不支持的，等号左侧的内容仍会保留原来的值
dummyEl.style.backgroundImage = 'linear-gradient(red,tan)'

if (dummyEl.style.backgroundImage) {
  root.classList.add('lineargradients')
} else {
  root.classList.add('no-lineargradients')
}

/* encapsulation */
function testValue(value, property, id) {
  const dummyEl = document.createElement('p')
  dummyEl.style[property] = value

  const root = document.documentElement
  if (dummyEl.style[property]) {
    root.classList.add(id)
    return true
  }

  root.classList.add(`no-${id}`)
  return false
}

// principle: when it comes to CSS, browsers drop anything they don’t understand, so we can check if a feature is recognized by dynamically applying it and checking if it was retained.

// test selectors and @rules
function testSelectorAndRules(target) {
  const styleEl = document.createElement('style')
  styleEl.textContent = `${target} {}`

  document.documentElement.append(styleEl)

  const isSupported = !!styleEl.sheet.cssRules.length
  styleEl.remove()

  return isSupported
}
// 参考链接：
// https://github.com/w3c/csswg-drafts/issues/2463
// https://stackoverflow.com/questions/21094865/test-if-a-browser-supports-a-css-selector
