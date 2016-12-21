import React, { Component } from 'react'
import Utilities, { loggedInMessage, loginMessage } from './Utilities';

export default class MessageInputs extends React.Component {
  createButtons(updateDraftMsg, draftMsg, addNewMessage, user) {
    return (
      <aside className='draft-msg-buttons'>
        <button disabled={ !draftMsg || !user } id="submit-btn" onClick={ () => addNewMessage() }> Submit </button>
        <button disabled={ !draftMsg || !user } id="clear-btn" onClick={ ()=> updateDraftMsg('') }> Clear </button>
      </aside>
    )
  }

  createInput(updateDraftMsg, draftMsg, user) {
    return (
      <aside className='draft-msg'>
        <input
          className="msg-field"
          disabled={ !user }
          placeholder="Message"
          maxLength="140"
          value={ draftMsg }
          onChange={ (e) => updateDraftMsg(e.target.value) }
        />
        <p className="character-count">{ 140 - draftMsg.length }</p>
      </aside>
    )
  }

  render() {
    let { user, updateDraftMsg, draftMsg='', addNewMessage, signInHandler, logOut } = this.props
    return (
      <div className="bottom-bar">
        <section className='login-message'>
          { user ? loggedInMessage(user, logOut) : loginMessage(signInHandler) }
        </section>
        <section className='message-input'>
          { this.createInput(updateDraftMsg, draftMsg, user) }
          { this.createButtons(updateDraftMsg, draftMsg, addNewMessage, user) }
        </section>
      </div>
    )
  }
}
