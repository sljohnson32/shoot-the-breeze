import React from 'react';
import UserDetail from './UserDetail';
var _ = require('lodash');

export default class UserList extends React.Component {


  render() {
    let { activeUsers } = this.props;
    let userList = _.uniqBy(activeUsers, 'displayName');
      return (
        <div className="user-list">
          <h2 className="user-title">Users</h2>
          {userList.map((user, index) => {
            return <UserDetail key={index} {...user} />;
          })
          }
        </div>
      )
  }
}
