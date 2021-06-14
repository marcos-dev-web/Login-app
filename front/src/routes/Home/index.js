import React, { useEffect, useState, memo } from 'react';

import isAuthenticated from '../../utils/verifyIfIsLogged';
import handleRemembers from '../../requests/handleRemembers';

import {
  Header,
  Button,
  Main,
  Modal,
  Title,
  ButtonCancel,
  ButtonDel,
  Remembers,
  Remember,
  TitleRemember,
  TextRemember
} from './styles';

import Input from '../../components/Input';
import ButtonDefault from '../../components/Button';
import axios from '../../utils/axios';

const Home = () => {
  const [logged, setLogged] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [allRemembers, setAllRemembers] = useState([]);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    document.title = "Home";

    const getName = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    async function fetchData() {
      const isAuth = await isAuthenticated();
      
      if (!isAuth) {
        window.location = '/signin';
      } else {
        setLogged(true);
        setUsername(getName);
        setToken(token);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/remembers?token=${token}`);
      
      if (response.data.error) {
        setAllRemembers(response.data);
      } else {
        setAllRemembers(response.data["data"]);
      }
    }

    fetchData();
  }, [])

  const toggle = (id) => {
    const element = document.getElementById(id);
    const state = element.getAttribute('data-open');
    
    if (state === "false") {
      element.style = `
        padding: 0.5rem;
        height: auto;
      `;
      element.setAttribute('data-open', 'true');
    } else {
      element.style = `
        padding: 0;
        height: 0;
      `;
      element.setAttribute('data-open', 'false');
    }
  }

  const createRemember = async () => {
    const response = await handleRemembers.create(token, title, text);

    if (!response.error) {
      setModalOpen(false);
      if (allRemembers["error"]) {
        setAllRemembers([{
          id: response.id,
          title,
          text,
        }]);
      } else {
        setAllRemembers([...allRemembers, {
          id: response.id,
          title,
          text,
        }]);
      }
      setTitle('');
      setText('');
    } else {
      alert('error: '+response.error+', try again');
    }
  }

  const deleteRemember = async (event, id) => {
    event.preventDefault();
    const response = await handleRemembers.delete(id, token);
    if (response.error) {
      alert(response.error);
    } else {
      setAllRemembers(allRemembers.filter(rmb => rmb.id !== id));
    }
  }

  return logged && (
    <>
      <Header>
        <div>
          <h1>{username}</h1>
          <Button onClick={() => setModalOpen(true)}>New</Button>
        </div>
      </Header>
      <Main>
        {modalOpen && (
          <Modal>
            <Title>Make new remember</Title>
            <div>
              <Input placeholder="Title" value={title} onChange={event => setTitle(event.target.value)} />
              <Input placeholder="Text" value={text} onChange={event => setText(event.target.value)} />
              <ButtonDefault text="Save" onClick={async () => {await createRemember()}} style={{marginTop: "1rem"}}/>
              <ButtonCancel onClick={() => setModalOpen(false)} text="Cancel" />
            </div>
          </Modal>
        )}
        <Remembers>
          { !allRemembers["error"] ? allRemembers.map((item, index) => {

            const id = `item_${index}`;

            return (
              <Remember key={index}>
                <TitleRemember onClick={() => toggle(id)}>{item.title}<ButtonDel onClick={(event) => deleteRemember(event, item.id)}>X</ButtonDel></TitleRemember>
                <TextRemember id={id} data-open="false">{item.text}</TextRemember>
              </Remember>
            )
          }) : (
            <p>{allRemembers.error}</p>
          )}
        </Remembers>
      </Main>
    </>
  );
}

export default memo(Home);