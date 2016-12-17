import React from 'react';
import Utilities, { displayFirstName } from './Utilities';

export default class Messages extends React.Component {

  render(){
  let { user, createdAt, content } = this.props;
  let timeStamp = getDateFormat(createdAt);
  let firstName = displayFirstName(user.displayName);
    return (
      <div>
        <section className='msg-header'>
          <h3 className="time-stamp">{timeStamp} <span className="name">{firstName}</span></h3>
        </section>
        <section className='msg-content'>
          <p>{content}</p>
        </section>
      </div>
    )
  }
}

const getDateFormat = (date) => {
  let dateLong = new Date(date);
  let dateMonth = monthNames[dateLong.getMonth()];
  let dateDay = dateLong.getDate();
  let dateHour = dateLong.getHours();
  let dateMinutes = dateLong.getMinutes();
  return dateMonth + " " + dateDay + ", " + formatTime(dateHour, dateMinutes);
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const formatTime = (hr, min) => {
  if (hr > 13) {
    return hour[hr] + ":" + min + 'pm';
  } else return hr + ":" + min + 'am';
}

const hour = {
  13: "1",
  14: "2",
  15: "3",
  16: "4",
  17: "5",
  18: "6",
  19: "7",
  20: "8",
  21: "9",
  22: "10",
  23: "11",
}


// possibly look into downloading the moment.js library
// <li key={index}>{user.displayName}: {content}</li>
