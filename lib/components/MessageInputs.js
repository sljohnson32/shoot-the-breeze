import React, { Component } from 'react'

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
        <p className="character-count"> { draftMsg.length } (max 140) </p>
      </aside>
    )
  }

  render() {
    let { updateDraftMsg, draftMsg, addNewMessage } = this.props
    return (
      <section className="message-input">
        { this.createInput(updateDraftMsg, draftMsg) }
        { this.createButtons(updateDraftMsg, draftMsg, addNewMessage) }
      </section>
    )
  }
}
