import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import * as sightingsAPI from '../../utils/sightingApi'
import * as commentAPI from '../../utils/commentApi'
import NavBar from '../../components/NavBar/NavBar'
import CommentSection from '../../components/CommentSection/CommentSection'
import { Segment, Grid, Image, GridColumn, Button } from 'semantic-ui-react'


export default function SightingDetails ({ user, handleLogout }) {
  const [sighting, setSighting] = useState({})
  const { sightingid } = useParams()

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

  async function handleCommentForm (commentData) {
    try {
      await commentAPI.create(commentData)
      getSighting()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Grid centered>
        <Grid.Column width={5}>
          <Segment>
            <Image src={sighting.photoUrl} />
          </Segment>
        </Grid.Column>
        <Grid.Column width={10}>
          <Segment>
            {/* {(user.username === sighting.user.username) ?  */}
            <Link to={`/sighting/${sighting._id}/edit`}>
              <Button type='submit' floated='right'>
                Edit
              </Button>
            </Link>
            {/* : null }  */}
            <h1>{sighting.title}</h1>
            <p>Date: {sighting.date}</p>
            <p>
              Location: {sighting.city}, {sighting.state}{' '}
            </p>
            <p>{sighting.country}</p>
          </Segment>
          <CommentSection
            handleCommentForm={handleCommentForm}
            sightingid={sightingid}
            comments={sighting.comments}
          />
        </Grid.Column>
      </Grid>
    </>
  )
}
