import React from 'react'
import { Comment, Header, Button, Form, Group } from 'semantic-ui-react';


export default function Comments () {
  return (
    <Comment.Group>
      <Header as='h3' dividing>
        Comments
      </Header>
      <Form reply>
        <Form.TextArea />
        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
      </Form>
    </Comment.Group>
  )
}
