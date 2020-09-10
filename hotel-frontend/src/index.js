import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, useLocation} from "react-router-dom"
import './index.css';
import Search from './Search';
import Details from "./Details";
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <Router>
    <div>
    <Switch>
      <Route exact path="/" component={Search}/>
      <Route path="/Details" component={Details}/>
    </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
