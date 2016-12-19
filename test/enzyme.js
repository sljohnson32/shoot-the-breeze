import Application from '../lib/components/Application';
import FilterMsgs from '../lib/components/FilterMsgs';
import Messages from '../lib/components/Messages';
import NavBar from '../lib/components/NavBar';
import SortBtns from '../lib/components/SortBtns';
import UserDetail from '../lib/components/UserDetail';
import UserList from '../lib/components/UserList';
import Utilities from '../lib/components/Utilities';

import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import React from 'react';


describe('<Application/>', () => {

  it('should have NavBar and UserList components', ()=> {
    //create a wrapper w application
    const wrapper = shallow(<Application/>);
    //check DOM for components
    const NavBar = wrapper.find('NavBar');
    const UserList = wrapper.find('UserList');
    //assert they are present
    expect (NavBar).to.have.length(1);
    expect (UserList).to.have.length(1);
  });
})
