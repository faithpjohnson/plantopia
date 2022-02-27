import React from 'react'

export default function Comment ({ comments }) {


  function commentToComponent (comment) {
      console.log(comment)
    return (
      <>
        <p>{comment.content}</p>
        <p>{comment.user.username}</p>
      </>
    )
  }

  function commentsToComponents () {
    if (comments && comments.length > 0) {
      
        return comments.map(commentToComponent)

    }

    return <p>No comments...</p>
  }

  return (
    <div>
      List O' Comments
      {commentsToComponents()}
    </div>
  )
}
