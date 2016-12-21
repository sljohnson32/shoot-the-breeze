import React from 'react';
import Utilities, { displayFirstName } from './Utilities';

export default class UserDetail extends React.Component {
  render() {
    const { activeUser, user, selectUser, selectedUser } = this.props;
    return (
      <div>
        <h3
          className={ activeUser.email === selectedUser ? 'user-selected' : 'user' }
          onClick={ () => selectUser(activeUser.email) }
        >
          { displayFirstName(activeUser.displayName) }
          <span className='email'>
            ({ activeUser.email })
          </span>
          { currentUser(activeUser, user) }
        </h3>
      </div>
    );
  }
}

function currentUser(activeUser, user) {
  if (user !== null && activeUser.email === user.email) {
    return <div className='current-user-icon'></div>;
  }
}
