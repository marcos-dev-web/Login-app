import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './routes/Home';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route excat path="/signin" component={SignIn} />
        <Route excat path="/signup" component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
