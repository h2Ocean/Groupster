import React, { useState } from 'react';

const Profile = (props) => {
  const [{ username }] = useState(props);
  const [bio, setBio] = useState('');
  const [{ name }, setName] = useState(props);
  const [{ email }, setEmail] = useState(props);
  const [{ age }, setAge] = useState(props);
  const [groups, setGroups] = useState(props);

  return (
    <div>
      <p>Hello World!</p>
    </div>
  );
};

export default Profile;
