import React from 'react';
export default class Message extends React.Component {
  render(){
  let { index, user, createdAt, content } = this.props;
  debugger;
  return (
    <li key={index}>{user.displayName}: {content}</li>
  )

  }
}
