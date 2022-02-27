import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import allSightingsPage from '../AllSightingsPage/AllSightingsPage'
import * as sightingsAPI from '../../utils/sightingApi'
import * as commentAPI from '../../utils/commentApi'
import NavBar from '../../components/NavBar/NavBar'
import CommentSection from '../../components/CommentSection/CommentSection'
import { Segment, Grid, Image, GridColumn } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import CommentForm from '../../components/CommentForm/CommentForm'


export default function SightingDetails ({ user }) {
  const [sighting, setSighting] = useState({})
  const { sightingid } = useParams()
  const navigate = useNavigate()


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
      <NavBar user={user} />
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
          <CommentSection handleCommentForm={handleCommentForm} sightingid={sightingid} comments={sighting.comments}/>
        </Grid.Column>
      </Grid>
    </>
  )
}
