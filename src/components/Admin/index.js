import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../Firebase";

const AdminPage = () => {
  const firebase = useContext(FirebaseContext);

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    const listener = firebase.users().onSnapshot(snapShot => {
      setUsers(
        snapShot.docs.map(doc => {
          return { uid: doc.id, ...doc.data() };
        })
      );
      setLoading(false);
    });
    return () => listener();
  }, [firebase]);

  return (
    <div>
      <h1>Admin</h1>
      {loading && <div>Loading ...</div>}

      <UserList users={users} />
    </div>
  );
};

const UserList = ({ users }) => (
  <ul>
    {users.map(({ uid, email, username }) => (
      <li key={uid}>
        <span>
          <strong>ID: </strong> {uid}
        </span>
        <br />
        <span>
          <strong>E-Mail: </strong> {email}
        </span>
        <br />
        <span>
          <strong>Username: </strong> {username}
        </span>
      </li>
    ))}
  </ul>
);

export default AdminPage;
