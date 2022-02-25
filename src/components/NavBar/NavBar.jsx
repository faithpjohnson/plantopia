import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Menu, Header, Segment } from 'semantic-ui-react'

export default function NavBar () {
  const [state, setState] = useState({ activeItem: '' })

  const navigate = useNavigate()

  function handleItemClick (e, { name, path }) {
    setState({ activeItem: name })
    navigate(path)
  }

  return (
    <Menu>
      <Menu.Item
        name='sightings'
        path='/sightings'
        onClick={handleItemClick}
      >
        <Header as='h2'>Plantopia</Header>
      </Menu.Item>

      <Menu.Item
        name='sightings'
        path='/sightings'
        active={state.activeItem === 'sightings'}
        onClick={handleItemClick}
      >
        Sightings
      </Menu.Item>

      <Menu.Item
        name='add-sighting'
        path='/add-sighting'
        active={state.activeItem === 'add-sighting'}
        onClick={handleItemClick}
      >
        Add Sighting
      </Menu.Item>
    </Menu>
  )
}
