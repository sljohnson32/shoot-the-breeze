import React from 'react';

export const loggedInMessage = (user, logOut) => {
  const firstName = displayFirstName(user.displayName);
  return (
    <div>
      <p> Logged in as <span className="logged-name">{ firstName }</span> ({ user.email })</p><button className='signInOut' onClick={ () => logOut() }>Logout</button>
    </div>
  );
};

export const loginMessage = (signInHandler) => {
  return (
    <button className='signInOut' onClick={ () => signInHandler() }>Sign In</button>
  );
};

export const displayFirstName = (displayName) => {
  const firstName = displayName.split(' ').slice(0, -1).join(' ');
  return firstName + ' ';
};

export const filterMsgs = (msgs, filterText, selectedUser) => {
  const filteredArray = msgs.filter(msgs => {
    return msgs.content.toLowerCase().indexOf(filterText.toLowerCase()) >= 0;
  }).filter((msgs) => {
    return msgs.user.email.indexOf(selectedUser) >= 0;
  });
  return filteredArray;
};
