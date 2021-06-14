import React, { useEffect, useState } from 'react';

import isAuthenticated from '../../utils/verifyIfIsLogged';
import handleRemembers from '../../requests/handleRemembers';

const Home = () => {
  const [logged, setLogged] = useState(false);
  const [allRemembers, setAllRemembers] = useState([]);

  useEffect(() => {
    document.title = "Home";

    async function fetchData() {
      const isAuth = await isAuthenticated();
      
      if (!isAuth) {
        window.location = '/signin';
      } else {
        setLogged(true);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await handleRemembers.get(token);

      if (response.error) {
        document.write(response.error)
      } else {
        setAllRemembers(response);
      }
    }

    // fetchData();
  }, [])

  console.log(allRemembers)

  return logged && (
    <h1>Home</h1>
  );
}

export default Home;