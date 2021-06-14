import styled from 'styled-components';

export const ButtonField = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  font-size: 1.2rem;
  font-weight: 600;
  border: 1px solid lightgray;
  background: springgreen;
  color: #FFFFFF;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: #02e272;
  }

  &:focus {
    border-color: dodgerblue;
  }
`;