import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { setSortUsers, resetFilteredParam } from '../actions/actionCreator';
import AddUserBox from '../../components/addUserBox/AddUserBox';
import ThInputBox from '../../components/ThInputBox/ThInputBox';
import ThSelectBox from '../../components/ThSelectBox/ThSelectBox';
import ThCalendarBox from '../../components/ThCalendarBox/ThCalendarBox';
import TdBox from '../../components/TdBox/TdBox';

import './Table.scss';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = { cleanSort: 1, cleanFilter: 1 };
  }

  cleanArrow = () => {
    this.setState({ cleanArrowsSort: this.state.cleanArrowsSort + 1 });
  };

  cleanFilterFunc = () => {
    this.setState({ cleanFilter: this.state.cleanFilter + 1 });
  };

  render() {
    const { users, filteredUsers } = this.props;

    return (
      <div className="table">
        <h1>Таблица пользователей</h1>
        <AddUserBox users={users} />

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th className="fio">
                  <ThInputBox
                    type="name"
                    users={users}
                    filteredUsers={this.filteredUsers}
                    title="Имя"
                    cleanFilter={this.state.cleanFilter}
                    cleanFilterFunc={this.cleanFilterFunc}
                  />
                </th>
                <th className="fio">
                  <ThInputBox
                    type="patronymic"
                    users={users}
                    filteredUsers={this.filteredUsers}
                    title="Отчество"
                    cleanFilter={this.state.cleanFilter}
                    cleanFilterFunc={this.cleanFilterFunc}
                  />
                </th>
                <th className="fio">
                  <ThInputBox
                    type="surname"
                    users={users}
                    filteredUsers={this.filteredUsers}
                    title="Фамилия"
                    cleanFilter={this.state.cleanFilter}
                    cleanFilterFunc={this.cleanFilterFunc}
                  />
                </th>
                <th className="fio">
                  <ThInputBox
                    type="login"
                    users={users}
                    filteredUsers={this.filteredUsers}
                    title="Логин"
                    cleanFilter={this.state.cleanFilter}
                    cleanFilterFunc={this.cleanFilterFunc}
                  />
                </th>
                <th className="status">
                  <ThSelectBox users={users} filteredUsers={this.filteredUsers} title="Статус" />
                </th>
                <th className="date">
                  <ThCalendarBox
                    type={'dateReg'}
                    users={users}
                    filteredUsers={this.filteredUsers}
                    title="Дата регистрации"
                  />
                </th>
                <th className="date">
                  <ThCalendarBox
                    type={'dateLastEnt'}
                    users={users}
                    filteredUsers={this.filteredUsers}
                    title="Дата последнего входа"
                  />
                </th>
                <th className="func">Редактировать</th>
                <th className="func">Удаление</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                return (
                  <TdBox key={user.id} users={users} filteredUsers={filteredUsers} user={user} />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect(({ users, filteredUsers }) => ({
  users,
  filteredUsers
}))(Table);
