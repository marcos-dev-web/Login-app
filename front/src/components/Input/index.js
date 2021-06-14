import React from 'react';

import {
  InputField
} from './styles.js';

const Input = ({toPassword, placeholder, ...others}) => {
  return (
    <InputField {...others} type={toPassword ? "password" : "text"} placeholder={placeholder ? placeholder : null}/>
  );
}

export default Input;