import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'

export default function AddSightingForm (props) {
  const [selectedFile, setSelectedFile] = useState('')
  const [state, setState] = useState({
    title: '',
    date: '',
    country: '',
    state: '',
    city: ''
  })

  function handleFileInput (e) {
    setSelectedFile(e.target.files[0])
  }

  function handleChange (e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit (e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append('photo', selectedFile)
    formData.append('title', state.title)
    formData.append('date', state.date)
    formData.append('country', state.country)
    formData.append('state', state.state)
    formData.append('city', state.city)
    props.handleAddSighting(formData);

    // Have to submit the form now! We need a function!
  }

  return (
    <>
      <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2'> Add a Sighting</Header>
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
                value={state.date}
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
              <Form.Input
                className='form-control'
                type='file'
                name='photo'
                placeholder='upload image'
                onChange={handleFileInput}
              />
              <Button type='submit' className='btn'>
                ADD SIGHTING
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </>
  )
}
