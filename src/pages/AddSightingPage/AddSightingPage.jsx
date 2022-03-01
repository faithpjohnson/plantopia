import React, { useState, useEffect } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import AddSightingForm from '../../components/AddSightingForm/AddSightingForm'
import { useNavigate } from 'react-router-dom'
import * as sightingAPI from '../../utils/sightingApi'

export default function AddSightingPage ({ user }) {
  const navigate = useNavigate()

  async function handleAddSighting (sighting) {
    try {
      await sightingAPI.create(sighting)
      navigate('/sightings')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <NavBar user={user}/>
      <AddSightingForm handleAddSighting={handleAddSighting} />
    </>
  )
}
