import React, { useState } from 'react'

import { Button, Form, Grid, Segment } from 'semantic-ui-react'

export default function AddSightingForm (props) {
  const [selectedFile, setSelectedFile] = useState('')
  const [state, setState] = useState('')

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
    formData.append('photo', selectedFile) // this key matches the key in multer in the
    // routes/api/posts create route upload.single('photo')
    formData.append('caption', state.caption)

    props.handleAddPost(formData)
    // Have to submit the form now! We need a function!
  }

  return (
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
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
              placeholder='City'
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
  )
}
