import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";
import NavBar from '../../components/NavBar/NavBar';

export default function SignUpPage(props) {
  
  const [error, setError] = useState('')
  const [state, setState] = useState({
    username: '', 
    email: '', 
    password: '', 
    passwordConfig: '',
  }) 

  const [selectedFile, setSelectedFile] = useState('')

  const navigate = useNavigate() 

  function handleChange(e){
    setState({
      ...state, 
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e){
    e.preventDefault();

    const formData = new FormData();

    formData.append('photo', selectedFile);


    for (let key in state){
      formData.append(key, state[key])
    }

    console.log(formData.forEach((item) => console.log(item)), " <-- this is how you look inside form data")

    try {

      await userService.signup(formData)
      // after we signup, we can navigare/and decode our token and set in local storage
      props.handleSignUpOrLogin() // <- get the token from localstorage and decode it
      // and set the user state in the App.js componennt
      navigate('/') // < route the user to our home component (all our routes are defined in App.js)

    } catch(err){
      // err, is defined in the throw new Error in the 
      // userServiceSignUp
      setError(err.message)
    }

  }

  function handleFileInput(e){
    console.log(e.target.files);
    setSelectedFile(e.target.files[0])
  }


  return (
    <>
      
      <NavBar />
      <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      
      <Grid.Column style={{ maxWidth: 450 }}>
        
        <Header as="h2" textAlign="center">
          <Image src="https://i.imgur.com/IuzBP9Q.png" /> Sign Up
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />
            </Form.Field>
            <Button type="submit" className="btn">
              Signup
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
    </>
  );
}
