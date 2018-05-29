import React from 'react';

const UserInfo = props => {
  return (
    <div>
      {props.username} logged in <button onClick={props.logout}>logout</button>
    </div>
  );
};

export default UserInfo;
