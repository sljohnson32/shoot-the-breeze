import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import Messages from './Messages';
import Utilities, { loggedInMessage, displayFirstName } from './Utilities';
import NavBar from './NavBar';
import UserList from './UserList';

// Very few things in this component are a good idea.
// Feel free to blow it all away.

export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      draftMessage: '',
      user: null,
      activeUsers: [],
      searchField: 'hi',
    }
  }

  componentDidMount() {
    reference.limitToLast(100).on('value', (snapshot) => {
      const messages = snapshot.val() || {};
      this.setState({
        messages: map(messages, (val, key) => extend(val, { key }))
      });
    });

    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }

  addNewMessage() {
    const { user, draftMessage } = this.state;
      reference.push({
        user: pick(user, 'displayName', 'email', 'uid'),
        content: draftMessage,
        createdAt: Date.now(),
        filterValue: 'hi',
      });
    this.setState({ draftMessage: '' });
  }

  sortMsgs(sortDirect) {
    console.log(sortDirect)
  }

  render() {
    const { user, messages, draftMessage } = this.state;
    return (
      <div className="Application">
        <NavBar searchField={this.state.searchField} sortMsgs={this.sortMsgs} />
        {/* {user ? <p>Hello {user.displayName}</p> : <button onClick={() => signIn()}>Sign In</button> } */}
        <div className="message-section">
          {this.state.messages.map((m, index) => {
            return <Messages key={index} {...m} />;
          })}
          {/* <h2> Users </h2> */}
        </div>
        <UserList />
        {this.state.user && loggedInMessage(user)}
        <section className="message-input">
          <aside>
            <input
              className="msg-field"
              placeholder="Message…"
              maxLength="140"
              value={this.state.draftMessage}
              onChange={(e) => this.setState({ draftMessage: e.target.value })}
            />
            <p className="character-count"> {this.state.draftMessage.length} (max 140) </p>
          </aside>
          <aside>
            <button className="submit-btn" onClick={() => this.addNewMessage()}> Submit </button>
            <button className="clear-btn" onClick={()=> {this.setState({draftMessage: ''})} }> Clear </button>
          </aside>
        </section>
      </div>
    )
  }
}
