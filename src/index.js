class TellInput {
  constructor(source) {
    this.container = null
    this.countriesSelect = null
    this.input = null

    this._initLayout(source)
  }

  /********************
   *  PRIVATE METHODS
   ********************/

  _initLayout (source) {
    // create container and replace with original source
    this.container = document.createElement('div')
    source.parentNode.replaceChild(this.container, source)
    this._setCountriesSelect()
    this._setInput()
  }

  _setCountriesSelect () {
    // create countriesSelect
    this.countriesSelect = document.createElement('div')
    this.container.appendChild(this.countriesSelect)
  }

  _setInput () {
    // create number input
    this.input = document.createElement('input')
    this.input.type = 'number'
    this.container.appendChild(this.input)
  }

}

export default TellInput
