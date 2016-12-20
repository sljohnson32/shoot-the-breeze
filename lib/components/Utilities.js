import React from 'react';

export const loggedInMessage = (user)=> {
  let firstName = displayFirstName(user.displayName);
  return (
    <section className="welcome-section">
      <aside className="logged-in-message"> Logged in as <span className="logged-name">{firstName}</span> ({user.email}) </aside>
    </section>
  )
}

export const displayFirstName = (displayName)=> {
  return displayName.split(' ').slice(0, -1).join(' ');
}

export const filterMsgs = (msgs, filterText, selectedUser)=> {
  let filteredArray = msgs.filter(msgs => {
    return msgs.content.toLowerCase().indexOf(filterText.toLowerCase()) >= 0;
  }).filter(msgs => {
      return msgs.user.email.indexOf(selectedUser) >=0;
  })
  return filteredArray;
}
