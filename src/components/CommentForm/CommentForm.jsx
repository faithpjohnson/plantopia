import React, { useState } from 'react'
import { Comment, Header, Button, Form, Group } from 'semantic-ui-react'

export default function CommentForm ({ sightingid, handleCommentForm }) {
  const [state, setState] = useState({
    comment: ''
  })

  function handleChange (e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit (e) {
    e.preventDefault()
    handleCommentForm({
      comment: state.comment,
      sightingid: sightingid
    })
  }

  return (
    <Comment.Group>
      <Header as='h2' dividing>
        Comments
      </Header>
      <Form reply onSubmit={handleSubmit}>
        <Form.TextArea
          className='form-control'
          name='comment'
          value={state.comment}
          placeholder='Leave Comment Here'
          onChange={handleChange}
        />
        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
      </Form>
    </Comment.Group>
  )
}
