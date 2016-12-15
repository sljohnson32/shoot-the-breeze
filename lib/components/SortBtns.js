import React from 'react';

export default class SortBtns extends React.Component {
  render() {
    let { sortDirect, sortMsgs } = this.props;
    return (
      <div>
        <button onClick={ ()=> sortMsgs(sortDirect) }> Sort </button>
      </div>
    )
  }
}
