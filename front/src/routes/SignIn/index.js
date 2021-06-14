import React, { useState, useEffect } from 'react';

import {
  Container,
  Form,
  Title,
  InputArea,
  Text,
  Link,
  Error
} from './styles.js';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

import axios from '../../utils/axios';
import handleToken from '../../requests/handleToken';

import isAuthenticated from '../../utils/verifyIfIsLogged';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Sign In";

    async function fetchData() {
      const isLogged = await isAuthenticated();

      if (isLogged) {
        window.location = '/';
      }
    }
    fetchData();
  }, [])

  const submit = async () => {
    const acceptUsernameChars = 'abcdefghijklmnopqrstuvwxyz0123456789_'.split('');

    if (String(username).trim().length === 0 || String(password).trim().length === 0) {
      return setErrorMessage('Please fill the fields!');
    }

    const chars = username.split('');

    for (let char of chars) {
      if (acceptUsernameChars.indexOf(char) === -1) {
        return setErrorMessage('Invalid characters!');
      }
    }

    setErrorMessage('');
    setLoading(true);

    const response = await axios.post('/signin', {
      username,
      password
    });

    if (response.data.error) {
      setLoading(false);
      setErrorMessage(response.data.error);
    } else {
      setLoading(false);
      handleToken.save(response.data.token);
      localStorage.setItem('username', response.data.username);
      window.location = '/';
    }
  }

  return (
    <Container>
      {
        loading && (
          <Loading text="Log In..." />
        )
      }
      <Form>
        <Title>Sign In</Title>
        {
          errorMessage.length > 0 && (
            <Error>{errorMessage}</Error>
          )
        }
        <InputArea>
          <Input value={username} onChange={event => setUsername(String(event.target.value))} placeholder="Username" />
        </InputArea>
        <InputArea>
          <Input value={password} onChange={event => setPassword(String(event.target.value))} placeholder="Password" toPassword={true} />
        </InputArea>
        <InputArea>
          <Button text="Sign In" onClick={submit} />
        </InputArea>
        <Text>
          Not have account? <Link href="/signup">Sign Up</Link>
        </Text>
      </Form>
    </Container>
  );
}

export default SignIn;