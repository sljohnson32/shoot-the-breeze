import React from 'react';

export default class SearchFilter extends React.Component {
  render() {
    let { filterMsgs } = this.props
    return (
      <input type="text" placeholder="Filter" onChange={ ()=> filterMsgs() } />
    )
  }
}
