import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import './BreedCard.css';


const backend = 'http://localhost:5000/';


const BreedCard = (props) => {
  var catBreedImgURL = backend + props.catBreedImgURL;
  var shortDesc= convertShortDec(props.description);
  return (
    <div className="top-margin">
      <Card body outline color="primary">
        <div className="overflow ">
          <CardImg top width="100%" src={catBreedImgURL} alt="Card image" />
        </div>
        <CardBody className="text-center">
          <CardTitle ><h4>{props.name}</h4></CardTitle>
          <CardSubtitle>{props.origin}</CardSubtitle>
          <CardText className="mb-2 text-muted">{shortDesc}</CardText>
          <Button>Details</Button>
        </CardBody>
      </Card>
    </div>
  );
};

const convertShortDec= (param) => {

  return param.toString().substring(0,140)+ '...';
};

export default BreedCard;
