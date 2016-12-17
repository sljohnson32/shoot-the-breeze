import React from 'react';
import Utilities, { displayFirstName } from './Utilities';

export default class UserDetail extends React.Component {
  render(){
  let { displayName, email } = this.props;
    return (
      <div>
        <h3>{displayFirstName(displayName)} <span className='email'>({email})</span></h3>
      </div>
    )
  }
}
