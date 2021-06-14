import React from 'react';

import {
  Container,
  Box,
  Text
} from './styles.js';

const Loading = ({text}) => {
  return (
    <Container>
      <Box>
        <Text>{text || "Loading"}</Text>
      </Box>
    </Container>
  )
}

export default Loading;