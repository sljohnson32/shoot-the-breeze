import React from 'react';

export const loggedInMessage = (user)=> {
  let firstName = displayFirstName(user.displayName);
  return (
    <div className="loggedInMessage"> Logged in as {firstName} ({user.email}) </div>
  )
}

export const displayFirstName = (displayName)=> {
  return displayName.split(' ').slice(0, -1).join(' ');
}
