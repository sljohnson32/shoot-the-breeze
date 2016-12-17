import React from 'react';
import SortBtns from './SortBtns';
import SearchFilter from './SearchFilter';


export default class NavBar extends React.Component {
  render() {
    let { filterValue, sortMsgs, searchField } = this.props;
    return (
      <section className="nav-bar">
        <h2> Shoot the Breeze </h2>
        <SearchFilter searchField={searchField} filterValue={filterValue} />
        <SortBtns sortDirect="up" sortMsgs={sortMsgs} />
        <SortBtns sortDirect="down" sortMsgs={sortMsgs} />
      </section>
    )
  }
}
