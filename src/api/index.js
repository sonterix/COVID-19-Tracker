import axios from 'axios'

const API_URL = 'https://covid19.mathdro.id/api'
const DAILY_URL = '/daily'

export const fetchData = async () => {
  try {
    const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(API_URL)
    return { confirmed, recovered, deaths, lastUpdate }
  } catch (error) {
    
  }
}

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${ API_URL }${ DAILY_URL }`)
    return data.map(({ confirmed, deaths, reportDate }) => ({ confirmed: confirmed.total, deaths: deaths.total, reportDate }))
  } catch (error) {
    
  }
}