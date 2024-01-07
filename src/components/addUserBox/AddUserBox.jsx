import React, { useState } from 'react';
import store from '../../store.js';
import PropTypes from 'prop-types';
import { addUser } from '../../actions/actionCreator.js';
import _ from 'lodash';

import './AddUserBox.scss';

const AddUserBox = ({ users }) => {
  const [valueName, setValueName] = useState('');
  const [valuePatronymic, setValuePatronymic] = useState('');
  const [valueSurname, setValueSurname] = useState('');
  const [valueLogin, setValueLogin] = useState('');

  const onChangeName = (value) => {
    setValueName(value);
  };

  const onChangePatronymic = (value) => {
    setValuePatronymic(value);
  };

  const onChangeSurname = (value) => {
    setValueSurname(value);
  };

  const onChangeLogin = (value) => {
    setValueLogin(value);
  };

  const addUserFunc = () => {
    if (!!valueName && !!valuePatronymic && !!valueSurname && !!valueLogin) {
      const sortUsers = _.sortBy(users, 'id', 'asc');

      const user = {
        id: sortUsers.length > 0 ? sortUsers[users.length - 1].id + 1 : 0,
        name: valueName,
        patronymic: valuePatronymic,
        surname: valueSurname,
        login: valueLogin,
        status: false,
        dateReg: new Date().valueOf(),
        dateLastEnt: new Date().valueOf()
      };
      setValueName('');
      setValuePatronymic('');
      setValueSurname('');
      setValueLogin('');

      store.dispatch(addUser(user));
    }
  };

  return (
    <div className="add-user-box">
      <input
        type="text"
        value={valueName}
        placeholder="Имя"
        onChange={(e) => onChangeName(e.target.value)}
      />
      <input
        type="text"
        value={valuePatronymic}
        placeholder="Отчество"
        onChange={(e) => onChangePatronymic(e.target.value)}
      />
      <input
        type="text"
        value={valueSurname}
        placeholder="Фамилия"
        onChange={(e) => onChangeSurname(e.target.value)}
      />
      <input
        type="text"
        value={valueLogin}
        placeholder="Логин"
        onChange={(e) => onChangeLogin(e.target.value)}
      />
      <button onClick={addUserFunc}>Добавить пользователя</button>
    </div>
  );
};

AddUserBox.propTypes = {
  users: PropTypes.array
};

AddUserBox.defaultProps = {
  users: []
};

export default AddUserBox;
