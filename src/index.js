import { setAttributes } from './utils/helper.js'

const SVG_NS = 'http://www.w3.org/2000/svg'
const COUNTRIES_ACTIVE_CLASS = 'tell-input_countries-list-open'

const countriesList = [
  { short: 'BD', name: 'Bangladesh', code: '880' },
  { short: 'UA', name: 'Ukraine', code: '380' },
  { short: 'UA', name: 'Ukraine', code: '380' },
  { short: 'UA', name: 'Ukraine', code: '380' },
  { short: 'UA', name: 'Ukraine', code: '380' },
  { short: 'UA', name: 'Ukraine', code: '380' },
  { short: 'UA', name: 'Ukraine', code: '380' },
  { short: 'UA', name: 'Ukraine', code: '380' },
  { short: 'UA', name: 'Ukraine', code: '380' },
  { short: 'UA', name: 'Ukraine', code: '380' },
  { short: 'UA', name: 'Ukraine', code: '380' },
  { short: 'UA', name: 'Ukraine', code: '380' }
]

class TellInput {
  constructor(source, containerClass = '') {
    // tellInput nodes
    this.container = null
    this.countriesSelect = null
    this.input = null
    this.countyCodeNode = null
    this.triangle = null
    this.countriesListNode = null

    // props
    this.currentCountry = { short: 'US', name: 'United States', code: '(201)' }
    this.isCountiesListOpen = false
    this.onCountrySelectSubscribers = new Map()

    this._initLayout(source, containerClass)
  }

  /**
   * PRIVATE METHODS
   **/

  _initLayout (source, containerClass) {
    // create all main blocks
    this.container = this._getContainer(containerClass)
    this.countriesSelect = this._getCountriesSelectButton()
    this.triangle = this._getTriangle()
    this.input = this._getInput()
    this.countyCodeNode = this._getCountyCodeNode(this.currentCountry.short)
    this.countriesListNode = this._getCountriesList()

    // combine all blocks to tellInput structure
    this.container.appendChild(this.countriesSelect)
    this.container.appendChild(this.countriesListNode)
    this.container.appendChild(this.input)
    this.countriesSelect.appendChild(this.countyCodeNode)
    this.countriesSelect.appendChild(this.triangle)

    // set listeners
    this.countriesSelect.onclick = this._countriesSelectButtonClick.bind(this)
    this.countriesListNode.onclick = this._countriesListClick.bind(this)

    if (source) source.parentNode.replaceChild(this.container, source)
    return this.container
  }

  _getContainer (containerClass) {
    const container = document.createElement('div')
    container.className = `tell-input ${containerClass}`
    return container
  }

  _getCountriesList () {
    const countriesListNode = document.createElement('div')
    const ul = document.createElement('ul')
    countriesList.forEach((country, index) => {
      const countryNode = document.createElement('li')
      countryNode.setAttribute('data-country-index', index.toString())
      const countryNodeText = document.createTextNode(`${country.name || ''} ${country.code || ''}`)
      countryNode.appendChild(countryNodeText)
      ul.appendChild(countryNode)
    })
    countriesListNode.classList.add('tell-input__countries-list')
    countriesListNode.appendChild(ul)
    return countriesListNode
  }

  _getCountriesSelectButton () {
    const select = document.createElement('div')
    select.classList.add('tell-input__countries-button')
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
    const input = document.createElement('input')
    input.type = 'text'
    input.classList.add('tell-input__input')
    input.placeholder = '(201) 555-5555'
    return input
  }

  _countriesSelectButtonClick () {
    this.isCountiesListOpen = !this.isCountiesListOpen
    if (this.isCountiesListOpen) {
      this._openCountriesList()
    } else {
      this._closeCountriesList()
    }
  }

  _countriesListClick ($event) {
    const countryIndex = $event.target.getAttribute('data-country-index')
    if (countryIndex) {
      const country = this._getCountry(countryIndex)
      this._setNewCountry(country)
      this._emitSubscribers(country)
      this._closeCountriesList()
    }
  }

  _emitSubscribers (value) {
    this.onCountrySelectSubscribers.forEach(subscriber => {
      subscriber(value)
    })
  }

  _openCountriesList () {
    this.isCountiesListOpen = true
    this.container.classList.add(COUNTRIES_ACTIVE_CLASS)
  }

  _closeCountriesList () {
    this.isCountiesListOpen = false
    this.container.classList.remove(COUNTRIES_ACTIVE_CLASS)
  }

  _getCountry (index) {
    return countriesList[index] || null
  }

  _setNewCountry (country) {
    this.currentCountry = country
    this.countyCodeNode.innerHTML = this.currentCountry.short
  }

  /**
   * PUBLIC METHODS
   **/

  onCountrySelect (subscriber) {
    this.onCountrySelectSubscribers.set(subscriber, subscriber)
  }

  removeOnCountrySelectSubscriber (subscriber) {
    this.onCountrySelectSubscribers.delete(subscriber)
  }

}

export default TellInput
