import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import Messages from './Messages';
import Utilities, { loggedInMessage, displayFirstName, filterMsgs } from './Utilities';
import NavBar from './NavBar';
import UserList from './UserList';
import MessageInputs from './MessageInputs';

export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      draftMsg: '',
      user: null,
      selectedUser: '',
      activeUsers: [],
      msgs: [],
      filterText: '',
      sortChron: true,
      disabled: true
    }
  }

  componentDidMount() {
    reference.limitToLast(100).on('value', (snapshot) => {
      const msgs = snapshot.val() || {};
      this.setState({
        msgs: map(msgs, (val, key) => extend(val, { key })),
        activeUsers: map(msgs, (val, key) => extend(val.user, { key })),
        })
      });

    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }

  addNewMessage() {
    const { user, draftMsg } = this.state;
      reference.push({
        user: pick(user, 'displayName', 'email', 'uid'),
        content: draftMsg,
        createdAt: Date.now(),
        filterValue: 'hi',
      });
    this.setState({ draftMsg: '', disabled: true });
  }

  updateDraftMsg(value) {
    this.setState({ draftMsg: value });
  }

  setFilterText(value) {
    this.setState({ filterText: value });
  }

  selectUser(value) {
    if(this.state.selectedUser === value) {
      this.setState({selectedUser: ''})
  } else {
  this.setState({selectedUser: value})
    }
  }

  sortMsgs(sortDirect) {
    let { msgs, sortChron } = this.state;
    if (sortDirect === 'up' && sortChron) {
      let newArray = msgs.reverse();
      this.setState({
        msgs: newArray,
        sortChron: false
      });
    } else if (sortDirect === 'down' && !sortChron) {
      let newArray = msgs.reverse();
      this.setState({
        msgs: newArray,
        sortChron: true
      })
    }
  }
  render() {
    let { user, msgs, draftMsg, activeUsers, filterText, selectedUser } = this.state;
    return (
      <div className="Application">
        <NavBar filterMsgs={this.setFilterText.bind(this)} sortMsgs={this.sortMsgs.bind(this)} />
        <div className="message-section">
          {filterMsgs(msgs, filterText, selectedUser).map((m, index) => {
            return <Messages key={index} {...m} />;
          })}
        </div>
        <UserList activeUsers={activeUsers} user={user} selectUser={this.selectUser.bind(this)} />
        {user ? loggedInMessage(user) : <button onClick={() => signIn()}>Sign In</button>}
        <MessageInputs updateDraftMsg={this.updateDraftMsg.bind(this)} draftMsg={draftMsg} addNewMessage={this.addNewMessage.bind(this)} />
      </div>
    )
  }
}
