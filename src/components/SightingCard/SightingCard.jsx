import React, { useEffect } from 'react'
import { Card, Icon, Image, Grid, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './SightingCard.css'
function SightingCard ({ sighting, key}) {
  useEffect(() => {
    console.log("SIGHTINGGGG",sighting)
  })

  return (
    <Card>
      <Image src={sighting.photoUrl} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{sighting.title}</Card.Header>
        <Image src={`${sighting.user.photoUrl}`} avatar size='mini' floated='right'/>
        <Card.Meta>{sighting.user.username}</Card.Meta>
        <Link to={`/sighting/${sighting._id}`}><Button type='submit' className='btn'>
          Details
        </Button></Link>
      </Card.Content>
    </Card>
  )
}

export default SightingCard
