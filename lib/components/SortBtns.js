import React from 'react';

export default class SortBtns extends React.Component {
  render() {
    const { sortDirect, sortMsgs } = this.props;
    return (
      <button className="sort-btn" onClick={ () => sortMsgs(sortDirect) }>{ this.props.title }</button>
    );
  }
}
