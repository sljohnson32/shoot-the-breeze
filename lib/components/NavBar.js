import React from 'react';
import SortBtns from './SortBtns';
import SearchFilter from './SearchFilter';


export default class NavBar extends React.Component {
  render() {
    let { filterValue, sortMsgs, searchField } = this.props;
    return (
      <section className="nav-bar">
        <aside>
          <h2 className="app-title"> Shoot the Breeze </h2>
          <SearchFilter searchField={searchField} filterValue={filterValue} />
        </aside>
        <aside className="sort-btn-container">
          <SortBtns title="s up" sortDirect="up" sortMsgs={sortMsgs} />
          <SortBtns title="s down" sortDirect="down" sortMsgs={sortMsgs} />
        </aside>
      </section>
    )
  }
}
