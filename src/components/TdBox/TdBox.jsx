import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import store from '../../store';
import {
  deleteUser,
  deleteFilteredUser,
  setUsers,
  setFilteredUsers
} from '../../actions/actionCreator';
import './TdBox.scss';

const TdBox = ({ users, filteredUsers, user }) => {
  const [isOpenInput, setOpenInput] = useState(false);
  const [valueName, setValueName] = useState(user.name);
  const [valuePatronymic, setValuePatronymic] = useState(user.patronymic);
  const [valueSurname, setValueSurname] = useState(user.surname);
  const [valueLogin, setValueLogin] = useState(user.login);

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

  const deleteFunc = (index) => {
    store.dispatch(deleteUser(index));
    store.dispatch(deleteFilteredUser(index));
  };

  const edit = () => {
    setOpenInput(true);
  };
  const closeEditBox = () => {
    setOpenInput(false);
  };

  const editUserFunc = () => {
    const editUsers = users.map((u) => {
      if (user.id === u.id) {
        const o = {
          id: u.id,
          name: valueName,
          patronymic: valuePatronymic,
          surname: valueSurname,
          login: valueLogin,
          status: u.status,
          dateReg: u.dateReg,
          dateLastEnt: new Date().valueOf()
        };
        return o;
      } else {
        return u;
      }
    });
    const editFilteredUsers = filteredUsers.map((u) => {
      if (user.id === u.id) {
        const o = {
          id: u.id,
          name: valueName,
          patronymic: valuePatronymic,
          surname: valueSurname,
          login: valueLogin,
          status: u.status,
          dateReg: u.dateReg,
          dateLastEnt: new Date().valueOf()
        };
        return o;
      } else {
        return u;
      }
    });

    store.dispatch(setUsers(editUsers));
    store.dispatch(setFilteredUsers(editFilteredUsers));
    setOpenInput(false);
  };

  return (
    <>
      <tr>
        <td>{user.name}</td>
        <td>{user.patronymic}</td>
        <td>{user.surname}</td>
        <td>{user.login}</td>
        <td className={user.status ? 'status-true' : 'status-false'}>
          {user.status ? 'Заблокирован' : 'Не заблокирован'}
        </td>
        <td>{moment(user.dateReg).format('DD-MM-YYYY')}</td>
        <td>{moment(user.dateLastEnt).format('DD-MM-YYYY')}</td>
        <td>
          <button onClick={() => edit()}>Редактировать</button>
        </td>
        <td>
          <button onClick={() => deleteFunc(user.id)}>Удалить</button>
        </td>
        <td className={isOpenInput ? 'modal-edit open' : 'modal-edit close'}>
          <div className="background" onClick={closeEditBox}></div>
          <div>
            <span className="close" onClick={closeEditBox}></span>
            <label htmlFor="">Имя</label>
            <input
              type="text"
              value={valueName}
              placeholder="Имя"
              onChange={(e) => onChangeName(e.target.value)}
            />
            <label htmlFor="">Отчество</label>
            <input
              type="text"
              value={valuePatronymic}
              placeholder="Отчество"
              onChange={(e) => onChangePatronymic(e.target.value)}
            />
            <label htmlFor="">Фамилия</label>
            <input
              type="text"
              value={valueSurname}
              placeholder="Фамилия"
              onChange={(e) => onChangeSurname(e.target.value)}
            />
            <label htmlFor="">Логин</label>
            <input
              type="text"
              value={valueLogin}
              placeholder="Логин"
              onChange={(e) => onChangeLogin(e.target.value)}
            />
            <button onClick={editUserFunc}>Редактировать пользователя</button>
          </div>
        </td>
      </tr>
    </>
  );
};

TdBox.propTypes = {
  users: PropTypes.array,
  filterdUsers: PropTypes.array,
  user: PropTypes.object
};

TdBox.defaultProps = {
  users: [],
  filterdUsers: [],
  user: {}
};

export default TdBox;
