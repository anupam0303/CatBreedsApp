import React, { Component } from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,  Modal
} from 'reactstrap';
import './BreedCard.css';
import BreedDetails from '../../UI/BreedDetails/BreedDetails';



class BreedCard extends Component {

  state = {
    renderModal: false
  }
  
  convertShortDec = (param) => {
    return param.toString().substring(0, 140) + '...';
  };


  detailClickHandler = () => {
    this.setState(
        { renderModal: true }
    );
  }

  closeModalHandler = () => {
    this.setState(
      { renderModal: false }
  );
  }

  render() {
    var catBreedImgURL = /*backend +*/ this.props.catBreedImgURL;
    var shortDesc = this.convertShortDec(this.props.description);

    var breedDetail= null;
    if (this.state.renderModal) {
      breedDetail = <Modal isOpen={true}>
        <BreedDetails 
          name= {this.props.name}
          origin= {this.props.origin}
          description= {this.props.description}
          catBreedImgURL= {this.props.catBreedImgURL}
          temperament = {this.props.temperament}
          closeModal = {this.closeModalHandler} 
          />
      </Modal>
    }

    return (
      <div className="top-margin">
        {breedDetail}
        <Card body outline color="primary">
          <div className="overflow ">
            <CardImg top width="100%" src={catBreedImgURL} alt="Card image" />
          </div>
          <CardBody className="text-center">
            <CardTitle ><h4>{this.props.name}</h4></CardTitle>
            <CardSubtitle>{this.props.origin}</CardSubtitle>
            <CardText className="mb-2 text-muted">{shortDesc}</CardText>
            <Button onClick = {this.detailClickHandler}> Details </Button>
          </CardBody>
        </Card>
      </div>
    );
  }






};

export default BreedCard;
