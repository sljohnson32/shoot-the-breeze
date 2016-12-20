import React from 'react';
import UserDetail from './UserDetail';
var _ = require('lodash');

export default class UserList extends React.Component {


  render() {
    let { activeUsers, user, selectUser } = this.props;
    let userList = _.uniqBy(activeUsers, 'email');
      return (
        <div className="user-list">
          <h2 className="user-title">Users</h2>
          { userList.map((activeUser, index) => {
            return <UserDetail key={ index } activeUser={ activeUser } user={ user } selectUser={ selectUser } />;
          })
          }
        </div>
      )
  }
}
