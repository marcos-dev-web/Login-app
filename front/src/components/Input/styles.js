import styled from 'styled-components';

export const InputField = styled.input`
  width: 100%;
  border: none;
  outline: none;
  border-radius: 20px;
  padding: 10px;
  text-align: center;
  border: 1px solid lightgray;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: #404452;

  &:focus {
    border-color: dodgerblue;
  }
`;