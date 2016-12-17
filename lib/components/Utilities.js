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
