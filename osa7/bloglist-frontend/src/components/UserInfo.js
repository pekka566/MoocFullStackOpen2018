import React from 'react';
import { Button } from 'reactstrap';

const UserInfo = props => {
  return (
    <div>
      {props.username} logged in <Button onClick={props.logout}>logout</Button>
    </div>
  );
};

export default UserInfo;
