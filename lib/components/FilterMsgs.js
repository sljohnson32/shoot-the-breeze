import React from 'react';

export default class FilterMsgs extends React.Component {

  render() {
    const { filterMsgs, user } = this.props;
    return (
      <input
        className="filter-field"
        disabled={ !user }
        type="text"
        placeholder="Filter"
        onChange={ (e) => { filterMsgs(e.target.value); }}
      />
    );
  }
}
