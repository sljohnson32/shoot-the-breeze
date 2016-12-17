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

=======
  filterMsgs(value) {
    console.log(value);
  }

  sortMsgs(sortDirect) {
    console.log(sortDirect)
  }

  render() {
    let { user, messages, draftMessage } = this.state;
    return (
      <div className="Application">
        <NavBar filterMsgs={this.filterMsgs} sortMsgs={this.sortMsgs} />
        {user ? <p>Hello {user.displayName}</p> : <button onClick={() => signIn()}>Sign In</button> }
        <section>
          {this.state.messages.map((m, index) => {
            return <Messages key={index} {...m} />;
          })}
          <aside>
            <h2> Users </h2>
            <UserList />
          </aside>
        </section>
        {this.state.user && loggedInMessage(user)}
        <div className="MessageInput">
          <input
            placeholder="Message…"
            maxLength="140"
            value={this.state.draftMessage}
            onChange={(e) => this.setState({ draftMessage: e.target.value })}
          />
          <p> Character Count: {this.state.draftMessage.length} (max 140) </p>
          <button onClick={() => this.addNewMessage()}> Submit </button>
          <button onClick={()=> {this.setState({draftMessage: ''})} }> Clear </button>
        </div>
      </div>
    )
  }
}
