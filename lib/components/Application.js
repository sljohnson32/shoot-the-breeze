import React, { Component } from 'react';
import firebase, { reference, signIn, signOut } from '../firebase';
import { pick, map, extend } from 'lodash';
import Utilities, { displayFirstName, filterMsgs } from './Utilities';
import Messages from './Messages';
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
    };
  }

  componentDidMount() {
    reference.limitToLast(50).on('value', (snapshot) => {
      const msgs = snapshot.val() || {};
      this.setState({
        msgs: map(msgs, (val, key) => extend(val, { key })).reverse(),
        activeUsers: map(msgs, (val, key) => extend(val.user, { key })),
      });
    });
    // firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }

  signInHandler() {
    signIn().then((fromFirebase) => {
      this.setState({ user: fromFirebase.user });
    });
  }

  addNewMessage() {
    const { user, draftMsg } = this.state;
    reference.push({
      user: pick(user, 'displayName', 'email', 'uid', 'photoURL'),
      content: draftMsg,
      createdAt: Date.now(),
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
    if (this.state.selectedUser === value) {
      this.setState({ selectedUser: '' });
    } else { this.setState({ selectedUser: value }); }
  }

  logOut() {
    signOut();
    this.setState({ user: null });
  }

  sortMsgs(sortDirect) {
    const { msgs, sortChron } = this.state;
    if (sortDirect === 'up' && sortChron) {
      const newArray = msgs.reverse();
      this.setState({
        msgs: newArray,
        sortChron: false,
      });
    } else if (sortDirect === 'down' && !sortChron) {
      const newArray = msgs.reverse();
      this.setState({
        msgs: newArray,
        sortChron: true,
      });
    }
  }
  render() {
    const { user, msgs, draftMsg, activeUsers, filterText, selectedUser } = this.state;
    return (
      <div className="Application">
        <NavBar
          filterMsgs = { this.setFilterText.bind(this) }
          sortMsgs={ this.sortMsgs.bind(this) }
          user={ user }
        />
        <section className="message-section">
          {filterMsgs(msgs, filterText, selectedUser).map((m, index) => {
            return <Messages key={index} {...m} />;
          }) }
        </section>
        <UserList
          activeUsers={ activeUsers }
          user={user}
          selectUser={ this.selectUser.bind(this) }
          selectedUser={ selectedUser }
        />
        <MessageInputs
          user={ user }
          updateDraftMsg={ this.updateDraftMsg.bind(this) }
          draftMsg={ draftMsg }
          addNewMessage={ this.addNewMessage.bind(this) }
          signInHandler={this.signInHandler.bind(this)}
          logOut={this.logOut.bind(this)}
        />
      </div>
    );
  }
}
