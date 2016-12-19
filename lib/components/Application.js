import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import Messages from './Messages';
import Utilities, { loggedInMessage, displayFirstName } from './Utilities';
import NavBar from './NavBar';
import UserList from './UserList';

export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      draftMsg: '',
      user: null,
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

  filterMsgs(value) {
    this.setState({ filterText: value });
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
    let { user, msgs, draftMsg, activeUsers, filterText } = this.state;
    return (
      <div className="Application">
        <NavBar filterMsgs={this.filterMsgs.bind(this)} sortMsgs={this.sortMsgs.bind(this)} />
        <div className="message-section">
          {this.state.msgs.filter(msgs => {
            return msgs.content.toLowerCase().indexOf(filterText.toLowerCase()) >= 0;
          })
          .map((m, index) => {
            return <Messages key={index} {...m} />;
          })}
        </div>
        <UserList activeUsers={activeUsers} user={user} />
        {this.state.user && loggedInMessage(user)}
        <section className="message-input">
          <aside>
            <input
              className="msg-field"
              placeholder="Message…"
              maxLength="140"
              value={this.state.draftMsg}
              onChange={(e) => this.setState({ draftMsg: e.target.value, disabled: false })}
            />
            <p className="character-count"> {this.state.draftMsg.length} (max 140) </p>
          </aside>
          <aside>
            <button disabled={this.state.disabled} id="submit-btn" className={this.state.disabled} onClick={() => this.addNewMessage()}> Submit </button>
            <button disabled={this.state.disabled} id="clear-btn" className={this.state.disabled} onClick={()=> {this.setState({draftMsg: '', disabled: true})} }> Clear </button>
          </aside>
        </section>
      </div>

    )
  }
}
