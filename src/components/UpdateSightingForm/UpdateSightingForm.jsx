import React, { useState, useEffect } from 'react'
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import * as sightingsAPI from '../../utils/sightingApi'
import { useNavigate } from 'react-router-dom'

export default function UpdateSightingForm ({ handleUpdateForm, sightingID, handleDeleteSighting }) {
  // define status as an object using useState hook to store details
  const [state, setState] = useState({
    title: '',
    date: new Date(),
    country: '',
    state: '',
    city: ''
  })

  async function getSighting () {
    try {
      const data = await sightingsAPI.getByID(sightingID)
      console.log('sightingData', data)
      setState(data)
    } catch (err) {
      console.log(err)
    }
  }

  function handleChange (e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
    console.log('STATE', state)
  }

  function handleSubmit (e) {
    e.preventDefault()
    handleUpdateForm(state)
    console.log(state)
  }

  useEffect(() => {
    getSighting()
  }, [])


  return (
    <>
      <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2'> Edit Sighting</Header>
          <Segment>
            <Form autoComplete='off' onSubmit={handleSubmit}>
              <Form.Input
                className='form-control'
                name='title'
                value={state.title}
                placeholder='Title of sighting'
                onChange={handleChange}
                required
              />
              <Form.Input
                className='form-control'
                type='date'
                name='date'
                value={new Date(state.date).toISOString().split('T')[0]}
                placeholder='Date of sighting'
                onChange={handleChange}
                required
              />
              <Form.Input
                className='form-control'
                name='country'
                value={state.country}
                placeholder='Country'
                onChange={handleChange}
                required
              />
              <Form.Input
                className='form-control'
                name='state'
                value={state.state}
                placeholder='State'
                onChange={handleChange}
                required
              />
              <Form.Input
                className='form-control'
                name='city'
                value={state.city}
                placeholder='city'
                onChange={handleChange}
                required
              />
              <Button type='submit' className='btn'>
                UPDATE SIGHTING
              </Button>
            </Form>
            <Button type='submit' className='btn' color='red'>
              DELETE
            </Button>
          </Segment>
        </Grid.Column>
      </Grid>
    </>
  )
}
