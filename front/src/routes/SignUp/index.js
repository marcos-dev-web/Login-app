import React from 'react';

import {
  Container,
  Form,
  Title,
  InputArea,
  Text,
  Link
} from './styles.js';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp = () => {
  return (
    <Container>
      <Form>
        <Title>Sign Up</Title>
        <InputArea>
          <Input placeholder="Username" />
        </InputArea>
        <InputArea>
          <Input placeholder="Password" toPassword={true} />
        </InputArea>
        <InputArea>
          <Button text="Sign Up" />
        </InputArea>
        <Text>
          Already have an account? <Link href="/signin">Sign In</Link>
        </Text>
      </Form>
    </Container>
  );
}

export default SignUp;