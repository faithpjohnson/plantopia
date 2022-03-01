import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Header, Segment, Image } from 'semantic-ui-react'

export default function NavBar ({ user }) {
  const [state, setState] = useState({ activeItem: '' })

  const navigate = useNavigate()

  function handleItemClick (e, { name, path }) {
    setState({ activeItem: name })
    navigate(path)
  }

  return (
    <Menu>
      <Menu.Item name='sightings' path='/sightings' onClick={handleItemClick}>
        <Header size='huge'>
          <Image
          src={"https://i.imgur.com/ZeooAyL.png"}></Image>
        </Header>
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
      {user ? (
        <Menu.Item
          name='my-sightings'
          path={`/user/${user.username}`}
          active={state.activeItem === 'my-sightings'}
          onClick={handleItemClick}
        >
          My Sightings
        </Menu.Item>
      ) : (
        <Menu.Item
          name='login'
          path='/login'
          active={state.activeItem === 'login'}
          onClick={handleItemClick}
        >
          Login
        </Menu.Item>

      )}

        {/* <Menu.Item
          name='profile'
          path={`/user/${user.username}`}
          active={state.activeItem === 'profile'}
          onClick={handleItemClick}
        >
          Username: "{user.username}"
        </Menu.Item> */}
    </Menu>
  )
}
