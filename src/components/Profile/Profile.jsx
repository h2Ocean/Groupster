/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import biography from './dummydata.js';
import './Profile.css';

const Profile = () => {
  const [name, setName] = useState('Travis Wheaton');
  const [username] = useState('twheaton53');
  const [bio, setBio] = useState(biography);

  return (
    <Container className="Profile">
      <Row>
        <h1>Profile Page</h1>
      </Row>
      <Container>
        <Row className="Profile-name">
          <h4>
            Full Name:&nbsp;
            {name}
          </h4>
          <Button>Edit Name</Button>
          <p>
            Username:&nbsp;
            {username}
          </p>
        </Row>
        <Row id="bio-title">
          <h2>Biography</h2>
        </Row>
        <Row className="Profile-bio">
          <p>{bio}</p>
          <Button variant="primary" size="lg" aria-label="edit biography">
            Edit Biography
          </Button>
        </Row>
      </Container>
    </Container>
  );
};

export default Profile;
