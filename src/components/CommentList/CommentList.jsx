import React from 'react'
import { Card, Grid, Image, Segment, Header } from 'semantic-ui-react'

export default function Comment ({ comments }) {
  function commentToComponent (comment) {
    console.log(comment)
    return (
      <>
        <Segment>
          <p>
            <Image
              src={`${
                comment.user.photoUrl
                  ? comment.user.photoUrl
                  : 'https://react.semantic-ui.com/images/wireframe/square-image.png'
              } `}
              avatar
              size='mini'
            />{' '}
            {comment.user.username}
          </p>
          <p>{comment.content}</p>
        </Segment>
      </>
    )
  }

  function commentsToComponents () {
    if (comments && comments.length > 0) {
      return comments.map(commentToComponent)
    }
    return <p>No comments...</p>
  }

  return <div>{commentsToComponents()}</div>
}
