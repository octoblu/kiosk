import React from 'react';
import Meshblu from 'meshblu';
import { Link } from 'react-router';

import ClaimForm from '../components/claim-form';

const Index = React.createClass({
  getInitialState() {
    return {
      uuid: '',
      token: ''
    }
  },

  componentDidMount() {
    console.log('Mounted');
    const meshblu = Meshblu.createConnection({});
    meshblu.on('ready',  (connectionResult) => {
      const {uuid, token} = connectionResult;
      this.setState({ uuid, token })
    })
  },

  render() {

    return (
      <div className="container">
        <img src="http://ds78apnml6was.cloudfront.net/device/kiosk.svg" className="header-img"/>
        <h1>Kiosk powered by Meshblu</h1>

        
        <ClaimForm uuid={this.state.uuid} token={this.state.token} />
      </div>
    );
  }
});

module.exports = Index;
