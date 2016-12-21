import Application from '../lib/components/Application';
import FilterMsgs from '../lib/components/FilterMsgs';
import MessageInputs from '../lib/components/MessageInputs';
import Messages from '../lib/components/Messages';
import NavBar from '../lib/components/NavBar';
import SortBtns from '../lib/components/SortBtns';
import UserDetail from '../lib/components/UserDetail';
import UserList from '../lib/components/UserList';
import Utilities from '../lib/components/Utilities';

import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import React from 'react';


describe('<Application/>', () => {

  it('should have a NavBar component', ()=> {
    const wrapper = shallow(<Application/>);
    const NavBar = wrapper.find('NavBar');
    expect (NavBar).to.have.length(1);
  });

  it('should have a UserList component', ()=> {
    const wrapper = shallow(<Application/>);
    const UserList = wrapper.find('UserList');
    expect (UserList).to.have.length(1);
  });

  it('should have a MessageInputs component', ()=> {
    const wrapper = shallow(<Application/>);
    const MessageInputs = wrapper.find('MessageInputs');
    expect (MessageInputs).to.have.length(1);
  });

})


describe('<NavBar/>', () => {

  it('should have a filterMsgs property', ()=> {
    const wrapper = shallow(<NavBar/>);
    const filterMsgs = wrapper.find('FilterMsgs');
    expect(wrapper.props().filterMsgs).to.be.defined;
  });

})


describe('<MessageInputs/>', () => {
  it('should have a submit button', ()=> {
    const wrapper = shallow(<MessageInputs/>);
    wrapper.find('#submit-btn');
  });

  it('should have a clear button', ()=> {
    const wrapper = shallow(<MessageInputs/>);
    wrapper.find('#clear-btn');
  });

  it('when submit is clicked, addNewMessage is called', ()=> {
    const clickedAddNewMessage = sinon.spy()
    const wrapper = shallow(<MessageInputs addNewMessage={clickedAddNewMessage} />);
    wrapper.find('#submit-btn');
    wrapper.find('#submit-btn').simulate('click');
    expect(clickedAddNewMessage.calledOnce).to.be.true;
  });

  it('when clear is clicked, updateDraftMsg is called', ()=> {
    const clickedUpdateDraftMsg = sinon.spy()
    const wrapper = shallow(<MessageInputs updateDraftMsg={clickedUpdateDraftMsg} />);
    wrapper.find('#clear-btn');
    wrapper.find('#clear-btn').simulate('click');
    expect(clickedUpdateDraftMsg.calledOnce).to.be.true;
  });

})
