import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import allSightingsPage from '../AllSightingsPage/AllSightingsPage'
import * as sightingsAPI from '../../utils/sightingApi'
import NavBar from '../../components/NavBar/NavBar'
import Comments from '../../components/Comments/Comments';
import { Segment, Grid, Image, GridColumn } from 'semantic-ui-react'

export default function SightingDetails () {
  const [sighting, setSighting] = useState({})
  const { sightingid } = useParams()

  // const thisSighting = allSightingsPage.find(sighting => sighting._id === sightingId)

  async function getSighting () {
    try {
      const data = await sightingsAPI.getByID(sightingid)
      setSighting(data)
    } catch (err) {
      console.log(err, ' this is the error')
    }
  }

  useEffect(() => {
    getSighting()
  }, [])

  return (
    <>
      <NavBar />
      <Grid>
        <Grid.Column width={5}>
          <Image src={sighting.photoUrl} />
        </Grid.Column>
        <Grid.Column width={10}>
          <Segment>
            <h1>{sighting.title}</h1>
            <p>{sighting.date}</p>
            <p>{sighting.country}</p>
            <p>{sighting.state}</p>
            <p>{sighting.city}</p>
          </Segment>
          <Comments />
        </Grid.Column>
      </Grid>
     
    </>
  )
}
