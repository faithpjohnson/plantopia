import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Link, useParams } from 'react-router-dom'
import UpdateSightingForm from '../../components/UpdateSightingForm/UpdateSightingForm'
import * as sightingsAPI from '../../utils/sightingApi'
import { useNavigate } from 'react-router-dom'

export default function UpdateSighting ({ user }) {
  // load in sighting
  const { sightingid } = useParams()
  const navigate = useNavigate()

  async function handleUpdateForm (sightingData) {
    try {
      await sightingsAPI.updateSighting(sightingData)
      navigate(`/sighting/${sightingid}`)
    } catch (err) {
      console.log(err)
    }
  }

  async function handleDeleteSighting (sightingData) {
    try {
      const deletedSighting = await sightingsAPI.deleteSighting(sightingData)
      navigate('/sightings')
    } catch (err) {
      console.log(err, 'Something went wrong')
    }
  }

  return (
    <>
      <NavBar user={user} />
      {<UpdateSightingForm
          handleUpdateForm={handleUpdateForm}
          sightingID={sightingid}
          handleDeleteSighting={handleDeleteSighting}
        />}
    </>
  )
}
