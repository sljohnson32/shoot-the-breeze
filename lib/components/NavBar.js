import React from 'react';
import SortBtns from './SortBtns';
import FilterMsgs from './FilterMsgs';


export default class NavBar extends React.Component {
  render() {
    const { filterValue, sortMsgs, filterMsgs } = this.props;
    return (
      <section className="nav-bar">
        <aside>
          <h2 className="app-title"> Shoot the Breeze </h2>
          <FilterMsgs filterMsgs={filterMsgs} />
        </aside>
        <aside className="sort-btn-container">
          <SortBtns title="s up" sortDirect="up" sortMsgs={sortMsgs} />
          <SortBtns title="s down" sortDirect="down" sortMsgs={sortMsgs} />
        </aside>
      </section>
    )
  }
}
