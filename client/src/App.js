import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Sidebar } from './components/sidebar';
import {
  Login,
  Register,
  Home,
  Survey,
  Visit,
  VisitList,
  SingleVisit,
} from './pages';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <Sidebar></Sidebar>
      <Switch>
        <Route path={'/login'} exact component={Login} />
        <Route path={'/register'} exact component={Register} />
        <Route path={'/'} exact component={Home} />
        <PrivateRoute path="/survey" exact component={Survey} />
        <PrivateRoute path="/visit" exact component={Visit} />
        <PrivateRoute path="/visit/list" exact component={VisitList} />
        <PrivateRoute path="/visit/:id" exact component={SingleVisit} />
      </Switch>
    </Router>
  );
}

export default App;
