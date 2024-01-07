import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import store from '../../store';
import { setUsers, setFilteredUsers } from '../../actions/actionCreator';
import search from '../../assets/search.svg';
import _ from 'lodash';

import './ThInputBox.scss';

const ThInputBox = ({ type, users, title, cleanFilter, cleanFilterFunc }) => {
  const [isOpenInput, setOpenInput] = useState(true);

  useEffect(() => {
    setOpenInput(true);
  }, [cleanFilter]);

  const sortDown = () => {
    const sortUser = _.orderBy(users, [type], ['asc']);
    store.dispatch(setUsers(sortUser));
    store.dispatch(setFilteredUsers(sortUser));
  };

  const sortUp = () => {
    const sortUser = _.orderBy(users, [type], ['desc']);
    store.dispatch(setUsers(sortUser));
    store.dispatch(setFilteredUsers(sortUser));
  };

  const openInput = () => {
    cleanFilterFunc();
    setTimeout(() => {
      if (isOpenInput) {
        setOpenInput(false);
        store.dispatch(setFilteredUsers(users));
      } else {
        setOpenInput(true);
        store.dispatch(setFilteredUsers(users));
      }
    }, 10);
  };

  const filtration = (e) => {
    const filterUser = users.filter((user) =>
      user[type].toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    store.dispatch(setFilteredUsers(filterUser));
  };

  return (
    <div className="text-th-box">
      <span className="filter" onClick={() => openInput()}>
        <img src={search} alt="img" />
      </span>
      {isOpenInput ? (
        <span>{title}</span>
      ) : (
        <input type="text" placeholder={title} onChange={(e) => filtration(e)} />
      )}
      <div className="sort">
        <span onClick={sortUp} className="up-arrow">
          {' '}
        </span>
        <span onClick={sortDown} className="down-arrow">
          {' '}
        </span>
      </div>
    </div>
  );
};

ThInputBox.propTypes = {
  type: PropTypes.string,
  users: PropTypes.array,
  title: PropTypes.string,
  cleanFilter: PropTypes.number,
  cleanFilterFunc: PropTypes.func
};

ThInputBox.defaultProps = {
  type: '',
  users: [],
  title: '',
  cleanFilter: 1,
  cleanFilterFunc: () => {}
};

export default ThInputBox;
