import React, { useState, useEffect } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import AddSighting from '../../components/AddSighting/AddSighting'
import { useNavigate } from 'react-router-dom'
import * as postsAPI from '../../utils/sightingApi'

export default function AddSightingPage ({ user }) {
  const navigate = useNavigate()

  async function handleAddSighting (sighting) {
    try {
      await postsAPI.create(sighting)
      navigate('/sightings')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <NavBar user={user}/>
      <AddSighting handleAddSighting={handleAddSighting} />
    </>
  )
}
