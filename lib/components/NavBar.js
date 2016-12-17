import React from 'react';
import SortBtns from './SortBtns';
import FilterMsgs from './FilterMsgs';


export default class NavBar extends React.Component {
  render() {
    let { filterValue, sortMsgs, filterMsgs } = this.props;
    return (
      <section className="nav-bar">
        <h2> Shoot the Breeze </h2>
        <FilterMsgs filterMsgs={filterMsgs} />
        <SortBtns sortDirect="up" sortMsgs={sortMsgs} />
        <SortBtns sortDirect="down" sortMsgs={sortMsgs} />
      </section>
    )
  }
}
