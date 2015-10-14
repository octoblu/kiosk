import React from 'react'

const ClaimForm = (props) => {
  return (
    <form className="ClaimForm">
      <div className="ClaimForm-field">
        <label>UUID</label>
        <input type="text" readOnly value={props.uuid} />
      </div>

      <div className="ClaimForm-field">
        <label>TOKEN</label>
        <input type="text" readOnly value={props.token} />
      </div>
      <button type="submit" className="ClaimForm-button">Claim This Device</button>
    </form>
  );
};

module.exports = ClaimForm;
