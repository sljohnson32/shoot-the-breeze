import React from 'react';

export default class FilterMsgs extends React.Component {

  render() {
    let { filterMsgs } = this.props
    return (
      <input className="filter-field" type="text" placeholder="Filter" onChange={ (e) => filterMsgs(e.target.value) } />
    )
  }
}
