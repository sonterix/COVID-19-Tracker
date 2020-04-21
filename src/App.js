import React, { Component } from 'react'
import { Cards, CountryPicker, Chart } from './components'
import { fetchData } from './api'
import styles from './App.module.scss'

export default class App extends Component {
  state = {
    data: {
      confirmed: { value: 0 },
      recovered: { value: 0 },
      deaths: { value: 0 },
      lastUpdate: ''
    }
  }

  componentDidMount = async () => {
    const dataFromApi = await fetchData()
    this.setState({
      data: dataFromApi
    })
  }

  render () {
    const { data } = this.state

    return (
      <div className={ styles.centerWrapper }>
        <Cards data={ data } />
        <CountryPicker />
        <Chart />
      </div>
    )
  }
}