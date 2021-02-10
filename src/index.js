import { setAttributes } from './utils/helper.js'

const SVG_NS = 'http://www.w3.org/2000/svg'

class TellInput {
  constructor(source, containerClass = '') {
    this.container = null
    this.countriesSelect = null
    this.input = null
    this.currentCountry = { code: 'US' }
    this.countyCodeNode = null
    this.triangle = null

    this._initLayout(source, containerClass)
  }

  /**
   * PRIVATE METHODS
   **/

  _initLayout (source, containerClass) {
    // create container and replace with original source
    this.container = this._getContainer(containerClass)
    this.countriesSelect = this._getCountriesSelect()
    this.triangle = this._getTriangle()
    this.input = this._getInput()
    this.countyCodeNode = this._getCountyCodeNode(this.currentCountry.code)

    this.container.appendChild(this.countriesSelect)
    this.container.appendChild(this.input)
    this.countriesSelect.appendChild(this.countyCodeNode)
    this.countriesSelect.appendChild(this.triangle)

    source.parentNode.replaceChild(this.container, source)
  }

  _getContainer (containerClass) {
    const container = document.createElement('div')
    container.classList = `tell-input ${containerClass}`
    return container
  }

  _getCountriesSelect () {
    // create countriesSelect
    const select = document.createElement('div')
    select.classList = 'tell-input__countries-button'
    return select
  }
  _getCountyCodeNode (countryCode) {
    const node = document.createElement('span')
    node.appendChild(document.createTextNode(countryCode))
    return node
  }

  _getTriangle () {
    const svg = document.createElementNS(SVG_NS, 'svg')
    const path = document.createElementNS(SVG_NS, 'path')
    setAttributes(svg, {
      width: '10',
      height: '8',
      viewBox: '0 0 10 8',
      fill: 'none',
      xmln: 'http://www.w3.org/2000/svg'
    })
    setAttributes(path, {
      d: 'M4.13397 0.5C4.51887 -0.166667 5.48113 -0.166666 5.86603 0.5L9.33013 6.5C9.71503 7.16667 9.2339 8 8.4641 8L1.5359 8C0.766098 8 0.284973 7.16667 0.669873 6.5L4.13397 0.5Z',
      fill: '#BABABA'
    })
    svg.appendChild(path)
    return svg
  }

  _getInput () {
    // create number input
    const input = document.createElement('input')
    input.type = 'text'
    input.classList = 'tell-input__input'
    input.placeholder = '(201) 555-5555'
    return input
  }

}

export default TellInput
