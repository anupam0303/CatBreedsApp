import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Spinner,
    Pagination,
    PaginationItem,
    PaginationLink,
    Form,
    Input,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { connect } from 'react-redux';

import { getBreeds } from '../../actions/breedActions';

import BreedCard from '../../components/UI/BreedCard/BreedCard';
import PropTypes from 'prop-types';

import Guest from '../../components/UI/Guest/Guest';


class Breeds extends Component {

    state = {
        currentPage: 1,
        breedsPerPage: 8,
        searchString: null,
        dropdownOpen: false,
        dropDownValue: 'Select Origin'
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

    handleSelected = (e) => {
        this.setState({
            currentPage: e.target.id
        });

    };

    onSearch = (e) => {
        this.setState({
            searchString: e.target.value
        });
    }

    onDropDownClick = (e) => {
        if (e.currentTarget.textContent === '') {
            this.setState({
                dropDownValue: 'Select Origin'
            });
        }
        else {
            this.setState({
                dropDownValue: e.currentTarget.textContent
            });
        }
    }

    filterSearchResults = (breeds) => {
        // Filtering for search
        let searchedBreeds = breeds;
        if (this.state.searchString) {
            searchedBreeds = breeds.filter((catBreed) => {
                return catBreed.name.toLowerCase().indexOf(this.state.searchString.toLowerCase()) !== -1;
            });
        }
        return searchedBreeds;
    };

    filterDropdownResults = (breeds) => {
        // Filtering for dropdown selection
        let filteredBreeds = breeds;
        if (this.state.dropDownValue !== 'Select Origin') {
            filteredBreeds = breeds.filter((catBreed) => {
                return catBreed.origin.toLowerCase().indexOf(this.state.dropDownValue.toLowerCase()) !== -1;
            });
        }
        return filteredBreeds
    }

    componentDidMount() {
        this.props.getBreeds();
    }

    render() {
        const { breeds } = this.props.breed;
        const { isAuthenticated } = this.props.auth;

        // Filter search results
        let searchedBreeds = this.filterSearchResults(breeds);;

        // Get Origins from searched records
        const origins = [];
        searchedBreeds.map((breed) => {
            origins.push(breed.origin);
        }
        );
        const uniqueOrigins = [...new Set(origins)];

        // Filter dropdown records
        let filteredBreeds = this.filterDropdownResults(searchedBreeds);


        //Paging calculation
        const currentPage = this.state.currentPage;
        const breedsPerPage = this.state.breedsPerPage;
        const indexOfLastBreed = currentPage * breedsPerPage;
        const indexOfFirstBreed = indexOfLastBreed - breedsPerPage;
        const currentBreeds = filteredBreeds.slice(indexOfFirstBreed, indexOfLastBreed);
        const pageNumbers = [];


        // Logic for displaying page numbers
        for (let i = 1; i <= Math.ceil(filteredBreeds.length / breedsPerPage); i++) {
            pageNumbers.push(i);
        }

        const authDisplay = (
            <div>
                <Row>
                    <Col className="col-sm-auto">
                        <Form inline >
                            <Input type="text" placeholder="Search Cat Breed" className="mr-sm-2" onChange={this.onSearch} />
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} >
                                <DropdownToggle caret>
                                    {this.state.dropDownValue}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem key='blank' onClick={this.onDropDownClick}>Select Origin</DropdownItem >
                                    {this.renderOriginList(uniqueOrigins)}
                                </DropdownMenu>
                            </Dropdown>
                        </Form>

                    </Col>
                </Row>
                <Row>
                    {this.props.breed.loading ? <Spinner color="danger" /> : null}
                    {currentBreeds.map((breed) =>
                        <Col sm="auto" key={breed._id}>
                            <BreedCard name={breed.name} origin={breed.origin} description={breed.description} catBreedImgURL={breed.catBreedImgURL} />
                        </Col>)}
                </Row>
                <Pagination aria-label="Page navigation">
                    {this.renderPageNumbers(pageNumbers)}
                </Pagination>

            </div>
        );
        const guestDisplay = (
            <Guest />
        );
        return (
            <Container fluid>
                {isAuthenticated ? authDisplay : guestDisplay}

            </Container>
        );

    };

    renderPageNumbers = (pageNumbers) => pageNumbers.map(number => {
        return (
            <PaginationItem key={number}>
                <PaginationLink id={number} onClick={this.handleSelected}>
                    {number}
                </PaginationLink>
            </PaginationItem>
        );
    });

    renderOriginList = (uniqueOrigins) => uniqueOrigins.map(origin => {
        return (
            <DropdownItem key={origin} onClick={this.onDropDownClick}>{origin}</DropdownItem>
        );
    });


}




Breeds.propTypes = {
    getBreeds: PropTypes.func.isRequired,
    breed: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    breed: state.breed,
    auth: state.auth

});

export default connect(mapStateToProps, { getBreeds })(Breeds);