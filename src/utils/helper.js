function setAttributes (el, attrs) {
  // TODO: find more safe solution
  for(let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

export {
  setAttributes
}
