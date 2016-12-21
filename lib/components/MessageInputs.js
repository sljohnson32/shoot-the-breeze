import React, { Component } from 'react'
import Utilities, { loggedInMessage, loginMessage } from './Utilities';

export default class MessageInputs extends React.Component {
  createButtons(updateDraftMsg, draftMsg, addNewMessage) {
    return (
      <aside>
        <button disabled={ !draftMsg } id="submit-btn" onClick={ () => addNewMessage() }> Submit </button>
        <button disabled={ !draftMsg } id="clear-btn" onClick={ ()=> updateDraftMsg('') }> Clear </button>
      </aside>
    )
  }

  createInput(updateDraftMsg, draftMsg) {
    return (
      <aside>
        <input
          className="msg-field"
          placeholder="Message…"
          maxLength="140"
          value={ draftMsg }
          onChange={ (e) => updateDraftMsg(e.target.value) }
        />
        <p className="character-count">{ 140 - draftMsg.length }</p>
      </aside>
    )
  }

  render() {
    let { user, updateDraftMsg, draftMsg='', addNewMessage, logOut } = this.props
    return (
      <div className="bottom-bar">
        <section className='login-message'>
          { user ? loggedInMessage(user, logOut) : loginMessage() }
        </section>
        <section className='message-input'>
          { this.createInput(updateDraftMsg, draftMsg) }
          { this.createButtons(updateDraftMsg, draftMsg, addNewMessage) }
        </section>
      </div>
    )
  }
}
