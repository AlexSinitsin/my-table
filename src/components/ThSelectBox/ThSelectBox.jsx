import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import m from '../../assets/m.svg';
import store from '../../store';
import _ from 'lodash';
import { setUsers, setFilteredUsers } from '../../actions/actionCreator';
import './ThSelectBox.scss';

const ThSelectBox = ({ users, title, cleanFilter, cleanFilterFunc }) => {
  const [isOpenSelect, setOpenSelect] = useState(true);

  useEffect(() => {
    setOpenSelect(true);
  }, [cleanFilter]);

  const sortDown = () => {
    const sortUser = _.orderBy(users, ['status'], ['asc']);
    store.dispatch(setUsers(sortUser));
    store.dispatch(setFilteredUsers(sortUser));
  };

  const sortUp = () => {
    const sortUser = _.orderBy(users, ['status'], ['desc']);
    store.dispatch(setUsers(sortUser));
    store.dispatch(setFilteredUsers(sortUser));
  };

  const openSelect = () => {
    cleanFilterFunc();
    setTimeout(() => {
      if (isOpenSelect) {
        setOpenSelect(false);
        store.dispatch(setFilteredUsers(users));
      } else {
        setOpenSelect(true);
        store.dispatch(setFilteredUsers(users));
      }
    }, 10);
  };

  const filtration = (e) => {
    const filterUser = users.filter((user) => String(user.status) === e.target.value);
    store.dispatch(setFilteredUsers(filterUser));
  };

  return (
    <div className="select-th-box">
      <span className="arrow" onClick={() => openSelect()}>
        <img src={m} alt="img" />
      </span>
      {isOpenSelect ? (
        <span>{title}</span>
      ) : (
        <select name="status" onChange={(e) => filtration(e)}>
          <option>{title}</option>
          <option value={true}>Заблокирован</option>
          <option value={false}>Не заблокирован</option>
        </select>
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

ThSelectBox.propTypes = {
  users: PropTypes.array,
  title: PropTypes.string,
  cleanFilter: PropTypes.number,
  cleanFilterFunc: PropTypes.func
};

ThSelectBox.defaultProps = {
  users: [],
  title: '',
  cleanFilter: 1,
  cleanFilterFunc: () => {}
};

export default ThSelectBox;
