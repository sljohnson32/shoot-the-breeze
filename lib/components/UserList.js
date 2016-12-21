import React from 'react';
import UserDetail from './UserDetail';
const _ = require('lodash');

export default class UserList extends React.Component {


  render() {
    const { activeUsers, user, selectUser, selectedUser } = this.props;
    const userList = _.uniqBy(activeUsers, 'email');
    return (
      <div className="user-list">
        <h2 className="user-title">Users</h2>
        { userList.map((activeUser, index) => {
          return <UserDetail key={ index } activeUser={ activeUser } user={ user } selectUser={ selectUser } selectedUser={selectedUser} />;
        })
        }
      </div>
    );
  }
}
