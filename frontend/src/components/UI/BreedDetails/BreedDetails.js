import React, { Component } from 'react';
import {
    CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    ModalBody
} from 'reactstrap';


class BreedDetails extends Component {



    render() {
        var catBreedImgURL = /*backend +*/ this.props.catBreedImgURL;
        var temperatamantValues = null;
        if(this.props.temperament){
            var temperamentArray = this.props.temperament[0];
            temperatamantValues= temperamentArray.toString().replace('[','').replace(']','');
        }
        return (
            <div>
                <ModalBody >
                    <div className="overflow " >
                        <CardImg top width="100%" src={catBreedImgURL} alt="Card image" />
                    </div>
                    <CardBody className="text-center">
                        <CardTitle ><h4>{this.props.name}</h4></CardTitle>
                        <CardSubtitle>Origin: {this.props.origin}</CardSubtitle>
                        <br />
                        <CardSubtitle>Temperament: {temperatamantValues}</CardSubtitle>
                        <br />
                        <CardText className="mb-2 text-muted">{this.props.description}</CardText>
                        <Button onClick={this.props.closeModal}>OK</Button>
                    </CardBody>
                </ModalBody>
            </div>
        )
    };



};

export default BreedDetails;