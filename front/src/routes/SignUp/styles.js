import styled from 'styled-components';


export const Container = styled.main`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  background: white;
  border-radius: 20px;
  box-shadow: 0 0 1px 1px lightgray;

  width: 400px;
  padding: 20px 10px;


  @media (max-width: 460px) {
    width: 90vw;
  }
`;

export const Title = styled.h1`
  text-align: center;
  color: #404452;
  margin-bottom: 2rem;
  font-size: 2.3rem;
`;

export const InputArea = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
`;

export const Text = styled.p`
  text-align: center;
  color: #404452;
  font-size: 0.9rem;
  margin-top: 2rem;
`;

export const Link = styled.a`
  font-weight: 600;
  color: #292556;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;