import axios from 'axios'

const API_URL = 'https://covid19.mathdro.id/api'
const DAILY_URL = '/daily'
const COUNTRIES_URL = '/countries'

export const fetchData = async (country = 'Global') => {
  try {
    const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(country !== 'Global' ? `${ API_URL }${ COUNTRIES_URL }/${ country }` : API_URL)
    return { confirmed, recovered, deaths, lastUpdate }
  } catch (error) {
    console.log(error)
  }
}

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${ API_URL }${ DAILY_URL }`)
    return data.map(({ confirmed, deaths, reportDate }) => ({ confirmed: confirmed.total, deaths: deaths.total, reportDate }))
  } catch (error) {
    console.log(error)
  }
}

export const fetchCountries = async () => {
  try {
    const { data: { countries } } = await axios.get(`${ API_URL }${ COUNTRIES_URL }`)
    return countries.map(({ name }) => name)
  } catch (error) {
    console.log(error)
  }
}