import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, Link, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import Index from './handlers/index';
import Kiosk from './handlers/kiosk';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Octoblu Kiosk</h1>
        {this.props.children}
      </div>
    )
  }
}

render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
      <Route path="kiosk" component={Kiosk}>
        <Route path="kiosk/:uuid/:token" component={Kiosk} />
      </Route>
      <Redirect from="kiosk.html" to="kiosk" />
    </Route>
  </Router>
), document.body)
