import React, { useState, useEffect } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import { Grid, Header, Card } from 'semantic-ui-react'
import SightingFeed from '../../components/SightingFeed/SightingFeed'
import SightingCard from '../../components/SightingCard/SightingCard'
import AddSighting from '../../components/AddSightingForm/AddSightingForm'
import * as sightingsAPI from '../../utils/sightingApi'

export default function AllSightings ({ user }) {
  const [sightings, setSightings] = useState([])

  async function getSightings () {
    try {
      const data = await sightingsAPI.getAll()
      setSightings([...data.sightings])
    } catch (err) {
      console.log(err, ' this is the error')
    }
  }

  useEffect(() => {
    getSightings()
  }, [])

  return (
    <>
      <NavBar user={user} />
      <Header size='huge'>All Sightings</Header>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <SightingFeed sightings={sightings} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}
