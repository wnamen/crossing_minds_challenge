import React from 'react';
import {
    Col
} from 'react-materialize';
import './Carousel.css';

const matchIndex = (list, index) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i] === index) return true;
    }

    return false;
}

const CarouselCard = (props) => (
    <Col className={matchIndex(props.activeIndexes, props.index)
        ? "carousel-slide carousel-slide-active"
        : "carousel-slide"} l={3} m={6} s={12}>
        { props.children }
    </Col>
)

export default CarouselCard;
