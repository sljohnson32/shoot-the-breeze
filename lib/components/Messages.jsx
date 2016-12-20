import React from 'react';
import Utilities, { displayFirstName } from './Utilities';

export default class Messages extends React.Component {

  render(){
    const { user, createdAt, content } = this.props;
    const timeStamp = getDateFormat(createdAt);
    const firstName = displayFirstName(user.displayName);
    return (
      <div>
        <section className='msg-header'>
          <img src={user.photoURL} /><h3 className="time-stamp">{ timeStamp } <span className="name">{ firstName }</span></h3>
        </section>
        <section className='msg-content'>
          <p>{ content }</p>
        </section>
      </div>
    )
  }
}

const getDateFormat = (date) => {
  const dateLong = new Date(date);
  const dateMonth = monthNames[dateLong.getMonth()];
  const dateDay = dateLong.getDate();
  const dateHour = dateLong.getHours();
  const dateMinutes = dateLong.getMinutes();
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
