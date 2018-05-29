import React from 'react';
import { Link } from 'react-router-dom';

const Users = props => {
  if (!props.user) {
    return null;
  }

  return (
    <div>
      <h2>Users</h2>

      <div>
        <table>
          <th />
          <th>blogs added</th>
          {props.users.map(user => {
            return (
              <tr>
                <td>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Users;
