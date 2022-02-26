import React from 'react'
import { Card, Grid } from 'semantic-ui-react'
import SightingCard from '../SightingCard/SightingCard'

// render a list of sighting cards with sightings passed down via props
export default function SightingFeed ({ sightings, numPhotosCol }) {
  return (
    <Card.Group itemsPerRow={numPhotosCol} stackable centered>
      {sightings.map(sighting => {
        return <SightingCard sighting={sighting} key={sighting._id} />
      })}
    </Card.Group>
  )
}
