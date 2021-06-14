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

import Redirect from '../../utils/Redirect';
import verifyIfIsLogged from '../../utils/verifyIfIsLogged';

import axios from '../../utils/axios';
import saveToken from '../../utils/saveToken';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const isLogged = await verifyIfIsLogged();

      if (isLogged) {
        return (
          <Redirect to="/" />
        );
      }
    }
    fetchData();
  }, []);

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
      saveToken(response.data.token);
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

export default SignUp;