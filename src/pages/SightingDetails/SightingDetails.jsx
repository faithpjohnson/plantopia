import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import allSightingsPage from '../AllSightingsPage/AllSightingsPage'
import * as sightingsAPI from '../../utils/sightingApi'
import * as commentAPI from '../../utils/commentApi'
import NavBar from '../../components/NavBar/NavBar'
import CommentSection from '../../components/CommentSection/CommentSection'
import { Segment, Grid, Image, GridColumn, Button } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import CommentForm from '../../components/CommentForm/CommentForm'

export default function SightingDetails ({ user, handleLogout }) {
  const [sighting, setSighting] = useState({})
  const { sightingid } = useParams()
  // const navigate = useNavigate()


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

  console.log('SIGHTINGGGG DETAILS', sighting)

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
      <NavBar user={user} handleLogout={handleLogout}/>
      <Grid centered>
        <Grid.Column width={5}>
          <Segment>
            <Image src={sighting.photoUrl} />
          </Segment>
        </Grid.Column>
        <Grid.Column width={10}>
          <Segment>

            <Link to={`/sighting/${sighting._id}/edit`}>
              <Button type='submit' floated='right'>
                Edit
              </Button>
            </Link>
            <h1>{sighting.title}</h1>
            {/* <Image src={sighting.user.photoUrl} avatar size='mini'/> */}
            {/* <p>{sighting.user.username}</p> */}
            <p>{sighting.date}</p>
            <p>{sighting.country}</p>
            <p>{sighting.state}</p>
            <p>{sighting.city}</p>
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
