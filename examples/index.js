import TellInput from '../src/index.js'

window.onload = () => {
  const el = document.getElementById('ancient')
  window.input = new TellInput(el)
  function subscriber () {
  }
  window.input.onCountrySelect(subscriber)
}
