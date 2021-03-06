import React, { useState, useEffect } from 'react'
import { Grid, Image, Header } from 'semantic-ui-react'
import NavBar from '../../components/NavBar/NavBar'
import SightingFeed from '../../components/SightingFeed/SightingFeed'
import userService from '../../utils/userService'
import { useParams } from 'react-router-dom'


export default function MySightings (props) {
  const [sightings, setSightings] = useState([]) // an array of posts
  const [user, setUser] = useState({}) // this needs to be the logged in user object
  const [error, setError] = useState('')
  const { username } = useParams()
  console.log('this username--->', username)

  useEffect(() => {
    async function getProfile () {
      try {
        const data = await userService.getProfile(username)
        console.log('Data--->', data)

        setSightings(() => data.sightings)
        setUser(() => data.user)
      } catch (err) {
        console.log(err)
        setError("This Profile Doesn't Exist!")
      }
    }
    getProfile()
  }, [username])

  return (
    <>
      <NavBar user={user} handleLogout={props.handleLogout} />
      <Grid>
        <Header textAlign='center' size='huge'>
          My Sightings
          <Image
            src={`${
              user?.photoUrl
                ? user.photoUrl
                : 'https://react.semantic-ui.com/images/wireframe/square-image.png'
            } `}
            avatar
            size='small'
          />{' '}
          {username}
        </Header>
        <Grid.Row>
          <Grid.Column></Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column style={{ maxWidth: 750 }}>
            <SightingFeed sightings={sightings} numPhotosCol={3} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}
