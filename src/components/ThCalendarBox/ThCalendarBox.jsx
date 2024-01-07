import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import calendar from '../../assets/calendar.svg';
import rotate from '../../assets/rotate.svg';
import store from '../../store';
import _ from 'lodash';
import { setUsers, setFilteredUsers } from '../../actions/actionCreator';
import './ThCalendarBox.scss';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ThCalendarBox = ({ type, users, title, cleanFilter, cleanFilterFunc }) => {
  const [isOpenCalendar, setOpenCalendar] = useState(true);
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    setOpenCalendar(true);
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

  const openCalendar = () => {
    cleanFilterFunc();
    setTimeout(() => {
      if (isOpenCalendar) {
        setOpenCalendar(false);
      } else {
        setOpenCalendar(true);
        store.dispatch(setFilteredUsers(users));
      }
    }, 10);
  };

  const filtration = (e) => {
    setValue(new Date(e));
    const filterUser = users.filter((user) => {
      return user[type] < new Date(e).valueOf();
    });
    store.dispatch(setFilteredUsers(filterUser));
  };

  const closeCalendar = () => {
    setOpenCalendar(true);
  };
  const updateCalendar = () => {
    store.dispatch(setFilteredUsers(users));
    setValue(new Date());
  };

  return (
    <div className="calendar-th-box">
      <span className="calendar" onClick={() => openCalendar()}>
        <img src={calendar} alt="img" />
      </span>
      <span>{title}</span>
      {isOpenCalendar ? (
        ''
      ) : (
        <div className="calendar-box">
          <div className="background" onClick={closeCalendar}></div>
          <div>
            <span className="close" onClick={closeCalendar}></span>
            <span className="update" onClick={updateCalendar}>
              <img src={rotate} alt="img" title="Сбросить" />
            </span>
            <div>
              <h2>Фильтровать до даты:</h2>
              <Calendar onChange={filtration} value={value} />
            </div>
          </div>
        </div>
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

ThCalendarBox.propTypes = {
  type: PropTypes.string,
  users: PropTypes.array,
  title: PropTypes.string,
  cleanFilter: PropTypes.number,
  cleanFilterFunc: PropTypes.func
};

ThCalendarBox.defaultProps = {
  type: '',
  users: [],
  title: '',
  cleanFilter: 1,
  cleanFilterFunc: () => {}
};

export default ThCalendarBox;
