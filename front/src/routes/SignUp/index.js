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

    const response = await axios.post('/signup', {
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
          <Loading text="Creating your account..." />
        )
      }
      <Form>
        <Title>Sign Up</Title>
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
          <Button text="Sign Up" onClick={submit} />
        </InputArea>
        <Text>
          Already have an account? <Link href="/signin">Sign In</Link>
        </Text>
      </Form>
    </Container>
  );
}

export default SignUp;