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
      draftMsg: '',
      user: null,
      activeUsers: [],
      msgs: [],
      filterText: null,
      sortChron: true,
    }
  }

  componentDidMount() {
    reference.limitToLast(100).on('value', (snapshot) => {
      const messages = snapshot.val() || {};
      this.setState({
        msgs: map(messages, (val, key) => extend(val, { key })),
      });
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
    this.setState({ draftMsg: '' });
  }

  filterMsgs(value) {
    console.log(value);
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
    let { user, msgs, draftMsg } = this.state;
    return (
      <div className="Application">
        <NavBar filterMsgs={this.filterMsgs.bind(this)} sortMsgs={this.sortMsgs.bind(this)} />
        {user ? <p>Hello {user.displayName}</p> : <button onClick={() => signIn()}>Sign In</button> }
        <section>
          {this.state.msgs.map((m, index) => {
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
            value={this.state.draftMsg}
            onChange={(e) => this.setState({ draftMsg: e.target.value })}
          />
          <p> Character Count: {this.state.draftMsg.length} (max 140) </p>
          <button onClick={() => this.addNewMessage()}> Submit </button>
          <button onClick={()=> {this.setState({draftMsg: ''})} }> Clear </button>
        </div>
      </div>
    )
  }
}
