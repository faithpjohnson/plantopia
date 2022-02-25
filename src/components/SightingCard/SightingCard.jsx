import React, { useEffect } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function SightingCard ({ sighting, key }) {
  useEffect(() => {
    console.log(sighting)
  })

  return (
    <Card>
      <Image src={sighting.photoUrl} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{sighting.title}</Card.Header>
        <Card.Meta>{sighting.date}</Card.Meta>
      </Card.Content>
    </Card>
  )
}

export default SightingCard
