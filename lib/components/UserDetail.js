import React from 'react';
import Utilities, { displayFirstName } from './Utilities';

export default class UserDetail extends React.Component {
  render(){
  let { activeUser, user, selectUser, selectedUser } = this.props;
    return (
      <div>
        <h3
          className={ activeUser.email === selectedUser ? 'user-selected' : 'user' }
          onClick={ ()=> selectUser(activeUser.email) }
        >
          { displayFirstName(activeUser.displayName) }
          <span className='email'>
            ({ activeUser.email })
          </span>
          { activeUser.email === user.email && <div className='current-user-icon'></div> }
        </h3>
      </div>
    )
  }
}
