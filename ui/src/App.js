import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './containers/Home';
import Matches from './containers/Matches';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/matches" component={Matches}/>
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;
