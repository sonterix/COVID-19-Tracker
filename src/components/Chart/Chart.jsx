import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { fetchDailyData } from '../../api'
import { Line, Bar } from 'react-chartjs-2'
import styles from './Chart.module.scss'

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [ dailyData, setDailyData ] = useState([])

  useEffect(() => {
    (async () => {
      setDailyData(await fetchDailyData())
    })()
  }, [setDailyData])

  return (
    <div className={ styles.ChartWrapper }>
      { country !== 'Global'
        ? <Bar
          data={{
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets: [{
              label: 'People',
              backgroundColor: ['#af1212', '#239723', '#121212'],
              data: [confirmed.value, recovered.value, deaths.value]
            }]
          }}
          options={{
            legend: { display: false },
            title: { display: true, text: `Current state in ${ country }` }
          }}
        />
        : <> 
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
        </>
      }
    </div>
  )
}

Chart.propTypes = {
  data: PropTypes.shape({
    confirmed: PropTypes.shape({
      value: PropTypes.number
    }),
    recovered: PropTypes.shape({
      value: PropTypes.number
    }),
    deaths: PropTypes.shape({
      value: PropTypes.number
    }),
    lastUpdate: PropTypes.string
  }),
  country: PropTypes.string
}

Chart.defaultProps = {
  data: {
    confirmed: { value: 0 },
    recovered: { value: 0 },
    deaths: { value: 0 },
    lastUpdate: ''
  },
  country: 'Global'
}

export default Chart
