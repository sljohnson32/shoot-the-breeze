import React from 'react';

export default class SortBtns extends React.Component {
  render() {
    let { sortDirect, sortMsgs } = this.props;
    return (
      <button className="sort-btn" onClick={ ()=> sortMsgs(sortDirect) }> Sort </button>
    )
  }
}
