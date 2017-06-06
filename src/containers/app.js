import React, { PropTypes } from 'react'

const propTypes = {
  children: PropTypes.element.isRequired,
}

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Zooid App</h1>
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = propTypes
