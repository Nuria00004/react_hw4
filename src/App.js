import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import "./App.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const deleteUser = useCallback((id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    setCounter((prevCounter) => prevCounter + 1);
  }, []);

  const addUser = useCallback(() => {
    if (newUser) {
      const id = Math.floor(Math.random() * 1000);
      setUsers((prevUsers) => [...prevUsers, { id, name: newUser }]);
      setNewUser("");
      setCounter((prevCounter) => prevCounter + 1);
    }
  }, [newUser]);

  const userListMemo = useMemo(
    () =>
      users.map((user) => (
        <div className="every-user" key={user.id}>
          {user.name}
          <button onClick={() => deleteUser(user.id)}>Удалить</button>
        </div>
      )),
    [users, counter]
  );

  return (
    <div className="all-list">
      <h2>Список пользователей</h2>
      {userListMemo}
      <input
        type="text"
        placeholder="Имя пользователя"
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
      />
      <button className="add" onClick={addUser}>Добавить</button>
    </div>
  );
};

export default UserList;
