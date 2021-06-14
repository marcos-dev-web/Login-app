import styled, { keyframes } from 'styled-components';

export const Container = styled.main`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,.2);
`;

export const Box = styled.section`
  width: 400px;
  min-height: 50vh;
  max-height: 400px;
  padding: 2rem 1rem;

  background: white;
  border-radius: 20px;
  box-shadow: 1px 1px 5px 5px rgba(100,100,100,.2);

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 460px) {
    width: 90vw;
  }
`;

const animation = keyframes`
  0% {
    color: gray;
    opacity: 0;
  }
  50% {
    color: #404452;
    opacity: 0.5;
  }
  100% {
    color: black;
    opacity: 1;
  }
`;

export const Text = styled.h1`
  text-align: center;
  color: #404452;
  animation-name: ${animation};
  animation-timing-function: linear;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
`;