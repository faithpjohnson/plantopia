import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import SignupPage from '../SignupPage/SignupPage'
import LoginPage from '../LoginPage/LoginPage'
import userService from '../../utils/userService'
import NavBar from '../../components/NavBar/NavBar'
import AllSightings from '../AllSightingsPage/AllSightingsPage'
import AddSightingPage from '../AddSightingPage/AddSightingPage'
import SightingDetails from '../SightingDetails/SightingDetails'
import MySightings from '../MySightings/MySightings'
import UpdateSighting from '../UpdateSighting/UpdateSighting'

function App () {
  const [user, setUser] = useState(userService.getUser()) // getUser decodes our JWT token, into a javascript object
  // this object corresponds to the jwt payload which is defined in the server signup or login function that looks like
  // this  const token = createJWT(user); // where user was the document we created from mongo

  function handleSignUpOrLogin () {
    setUser(userService.getUser()) // getting the user from localstorage decoding the jwt
  }

  function handleLogout () {
    userService.logout()
    setUser(null)
  }

  if (user) {
    return (
      <Routes>
        <Route
          path='/'
          element={<AllSightings user={user} handleLogout={handleLogout} />}
        />
        <Route
          path='/sightings'
          element={<AllSightings user={user} handleLogout={handleLogout} />}
        />
        <Route path='/add-sighting' element={<AddSightingPage user={user} />} />
        <Route
          path='/user/:username'
          element={<MySightings user={user} handleLogout={handleLogout} />}
        />
        <Route
          path='/sighting/:sightingid'
          element={<SightingDetails user={user} />}
        />
        <Route
          path='/sighting/:sightingid/edit'
          element={<UpdateSighting user={user} />}
        />
        <Route
          path='/login'
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path='/signup'
          element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route
        path='/login'
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path='/signup'
        element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route path='/*' element={<Navigate to='/login' />} />
    </Routes>
  )
}

export default App
