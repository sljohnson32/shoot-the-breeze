import React from 'react';

export default class SortBtns extends React.Component {
  render() {
    const { sortDirect, sortMsgs, user } = this.props;
    return (
      <button
        className="sort-btn"
        disabled={ !user }
        onClick={ () => sortMsgs(sortDirect) }
      >{ this.props.title }</button>
    );
  }
}
