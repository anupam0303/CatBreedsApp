import React from 'react';
import { Jumbotron, Container } from 'reactstrap';

const Guest = (props) => {
  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Welcome to the Cat Breed App</h1>
          <p className="lead">Please register if you are new to this site, else login to enter the world of cat breeds</p>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Guest;