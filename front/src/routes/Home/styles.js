import styled from 'styled-components';
import ButtonDefault from '../../components/Button';

export const Header = styled.header`
  width: 100%;
  height: 5rem;
  border-bottom: 2px solid lightgray;

  &> div h1 {
    color: #404452;
    font-size: 1.8rem;
  }
  
  &> div {
    width: 90%;
    height: 100%;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
  }
`;

export const Button = styled.button`
  font-size: 1.1rem;
  background: white;
  padding: 5px 8px;
  border-radius: 3px;
  color: #404452;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    background: #ebe8f7;
    color: black;
  }

  &:active {
    background: springgreen;
    color: white;
  }
`;

export const Main = styled.main`
  width: 100%;
  height: calc(100vh - 5rem);
  position: relative;
  overflow-y: auto;
`;

export const Modal = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  background: white;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &> div {
    width: min(500px, 90vw);
    margin: 0 auto;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #404452;
  text-align: center;
  margin-bottom: 2rem;
`;

export const ButtonCancel = styled(ButtonDefault)`
  background-color: #f95555;
  margin-top: 1rem;

  &:hover {
    background: #dc5151;
  }
`;

export const Remembers = styled.div`
  width: min(600px, 90vw);
  height: 100%;
  overflow-y: scroll;
  margin: 0 auto;
  background: white;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  padding: 1rem 0;

  &> p {
    text-align: center;
    font-size: 1.2rem;
  }
`;

export const Remember = styled.div`
  width: 95%;
  margin: 0 auto;
  box-shadow: 0 0 1px 1px #ced1d9;
  margin-top: 0.5rem;
`;

export const TitleRemember = styled.h3`
  position: relative;
  width: 100%;
  text-align: center;
  background: #f3f3f3;
  padding: 0.5rem 2rem;
  cursor: pointer;
  user-select: none;
  -moz-user-select: none;
`;

export const TextRemember = styled.p`
  text-align: center;
  padding: 0;
  height: 0;
  overflow: hidden;
`;

export const ButtonDel = styled.button`
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  background: #f95555;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  text-align: center;
  color: white;
  z-index: 10;
  
  &:hover {
    background: #dc5151;
  }
`;