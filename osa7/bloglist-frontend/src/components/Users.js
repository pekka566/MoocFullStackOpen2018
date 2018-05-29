import React from 'react';

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
          {props.users.map(user => (
            <tr>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Users;
