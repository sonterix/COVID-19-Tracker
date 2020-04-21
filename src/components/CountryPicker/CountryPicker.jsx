import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { NativeSelect, FormControl } from '@material-ui/core'
import { fetchCountries } from '../../api'
import styles from './CountryPicker.module.scss'

const CountryPicker = ({ country, countryChange }) => {
  const [ countries, setCountries ] = useState([])

  useEffect(() => {
    (async () => {
      setCountries(await fetchCountries())
    })()
  }, [setCountries])

  return (
    <FormControl className={ styles.CountryPickerWrapper }>
      <NativeSelect value={ country } onChange={ event=> countryChange(event.target.value) }>
        <option value="Global">Global</option>
        { countries.map((country, index) => <option key={ `${ index }_${ Math.random().toString(36).substring(2) }`} value={ country }>{ country }</option> ) }
      </NativeSelect>
    </FormControl>
  )
}

CountryPicker.propTypes = {
  country: PropTypes.string,
  countryChange: PropTypes.func
}

CountryPicker.defaultProps = {
  country: 'Global',
  countryChange: () => {}
}

export default CountryPicker
