import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import CountUp from 'react-countup'
import styles from './Cards.module.scss'

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  const cards = [
    { ...confirmed, title: 'infected', description: 'Number of active cases of COVID-19' },
    { ...recovered, title: 'recovered', description: 'Number of recoveries from COVID-19' }, 
    { ...deaths, title: 'deaths', description: 'Number of deaths caused by COVID-19' }
  ]

  return (
    <div className={ styles.CardsWrapper }>
      <Grid container spacing={ 3 } justify="center">
        { cards.map((card, index) => (
          <Grid
            key={ `${ index }_${ Math.random().toString(36).substring(2) }` }
            item
            component={ Card }
            xs={ 12 }
            md={ 3 }
            className={ `${ styles.card } ${ styles[card.title] }` }
          >
            <CardContent>
              <Typography color="textSecondary" gutterBottom className={styles.cardTitle }>{ card.title }</Typography>
              <Typography variant="h5">
                <CountUp start={ 0 } end={ card.value } duration={ 2 } separator=" " />
              </Typography>
              <Typography color="textSecondary">{ new Date(lastUpdate).toDateString() }</Typography>
              <Typography variant="body2">{ card.description }</Typography>
            </CardContent>
          </Grid>
        ))  }
      </Grid>
    </div>
  )
}

Cards.propTypes = {
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
  })
}

Cards.defaultProps = {
  data: {
    confirmed: { value: 0 },
    recovered: { value: 0 },
    deaths: { value: 0 },
    lastUpdate: ''
  }
}

export default Cards
