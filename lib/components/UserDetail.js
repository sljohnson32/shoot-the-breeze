import React from 'react';
import Utilities, { displayFirstName } from './Utilities';

export default class UserDetail extends React.Component {
  render(){
  let { activeUser, user, selectUser } = this.props;
    return (
      <div>
        <h3
          onClick={ ()=> selectUser(activeUser.email) }
        >
          { displayFirstName(activeUser.displayName) }
          <span className='email'>
            ({ activeUser.email })
          </span>
          { activeUser.email == user.email && <span className='current-user-icon'>*</span> }
        </h3>
      </div>
    )
  }
}
