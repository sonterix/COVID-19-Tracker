import React, { useState, useEffect } from 'react'
import { fetchDailyData } from '../../api'
import { Line } from 'react-chartjs-2'
import styles from './Chart.module.scss'

const Chart = () => {
  const [ dailyData, setDailyData ] = useState([])

  useEffect(() => {
    (async () => {
      setDailyData(await fetchDailyData())
    })()
  }, [])

  return (
    <div className={ styles.ChartWrapper }>
      { dailyData.length
        && <Line data={{
          labels: dailyData.map(({ reportDate }) => reportDate),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: 'Infected',
              borderColor: '#af1212',
              backgroundColor: 'rgba(175, 18, 18, 0.2)',
              fill: true
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: 'Deaths',
              borderColor: '#131313',
              backgroundColor: 'rgba(18, 18, 18, 0.5)',
              fill: true
            }
          ]
        }} />
      }
    </div>
  )
}

export default Chart
