import React, { Component } from 'react'
import { Cards, CountryPicker, Chart } from './components'
import { fetchData } from './api'
import logo from './assets/images/logo.png'
import styles from './App.module.scss'

export default class App extends Component {
  state = {
    data: {
      confirmed: { value: 0 },
      recovered: { value: 0 },
      deaths: { value: 0 },
      lastUpdate: ''
    },
    country: 'Global'
  }

  componentDidMount = async () => {
    this.setState({
      data: await fetchData()
    })
  }

  handleCountryChange = async country => {
    this.setState({
      data: await fetchData(country),
      country: country
    })
  }

  render () {
    const { data, country } = this.state

    return (
      <div className={ styles.wrapper }>
        <div className={ styles.logo }>
          <img src={ logo } alt="covid-19" />
        </div>
        <Cards data={ data } />
        <CountryPicker country={ country } countryChange={ this.handleCountryChange } />
        <Chart data={ data } country={ country } />
      </div>
    )
  }
}