import React from 'react';

import {
  ButtonField
} from './styles.js';

const Button = ({text, ...others}) => {
  return (
    <ButtonField {...others}>
      {text ? text : "Button"}
    </ButtonField>
  );
}

export default Button;