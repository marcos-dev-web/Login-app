import React, { useEffect, useState } from 'react';

import isAuthenticated from '../../auth';

const Home = () => {

  const [logged, setLogged] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const isAuth = await isAuthenticated();

      if (!isAuth) {
        window.location = '/signin';
      } else {
        setLogged(true);
      }
    }

    fetchData();
  });

  return logged && (
    <h1>Home</h1>
  );
}

export default Home;