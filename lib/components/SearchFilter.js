import React from 'react';

export default class SearchFilter extends React.Component {
  filterUpdate() {
    const val = this.refs.filterValue.value
    console.log(val)
  }

  render() { 
    let { filterValue } = this.props
    return (
      <input ref="filterValue" type="text" placeholder="Filter" onChange={this.filterUpdate.bind(this)} />
    )
  }
}
