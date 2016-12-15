import React from 'react';
import SortBtns from './SortBtns';
import SearchFilter from './SearchFilter';


export default class NavBar extends React.Component {
  render() {
    debugger
    let { filterMsgs, sortMsgs } = this.props;
    return (
      <section className="nav-bar">
        <h2> Shoot the Breeze </h2>
        <SearchFilter filterMsgs={filterMsgs} />
        <SortBtns sortDirect="up" sortMsgs={sortMsgs} />
        <SortBtns sortDirect="down" sortMsgs={sortMsgs} />
      </section>
    )
  }
}
