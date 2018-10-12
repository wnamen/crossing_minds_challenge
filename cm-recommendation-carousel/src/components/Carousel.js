import React, { Component } from 'react'
import {
    CardPanel,
    Divider,
    Modal,
    Row
} from 'react-materialize';
import CarouselCard from './CarouselCard';
import CarouselButton from './CarouselButton';
import './Carousel.css';

class Carousel extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeIndexes: [0, 1, 2, 3]
        }

        this.goToNextSlide = this.goToNextSlide.bind(this);
        this.goToPrevSlide = this.goToPrevSlide.bind(this);
    }

    goToPrevSlide(e) {
        e.preventDefault();

        let indexes = this.state.activeIndexes,
            { items } = this.props,
            slidesLength = items.length - 1,
            start = 0,
            remainder = 0,
            newIndexes = [];

        if (indexes[0] < 1) {
            remainder = (slidesLength % 4) || 3;
            start = slidesLength - remainder;
        } else {
            start = indexes[0] - 4
        }

        items.forEach((el, idx) => {
            if (idx <= start + 3 && idx >= start) {
                newIndexes.push(idx);
            }
        })

        this.setState({
            activeIndexes: newIndexes
        });
    }

    goToNextSlide(e) {
        e.preventDefault();

        let indexes = this.state.activeIndexes,
            { items } = this.props,
            slidesLength = items.length - 1,
            start = 0,
            newIndexes = [];

        if (indexes[0] < slidesLength - 3) {
            start = indexes[0] + 4
        }

        items.forEach((el, idx) => {
            if (idx <= start + 3 && idx >= start) {
                newIndexes.push(idx);
            }
        })

        this.setState({
            activeIndexes: newIndexes
        });
    }

    render = () => {
        return (
            <Row className="carousel-container">
                <CarouselButton className='carousel-arrow carousel-arrow-left' onClick={this.goToPrevSlide}>
                    <i className="material-icons">arrow_back_ios</i>
                </CarouselButton>
                { this.props.items.map((item, index) => {
                    return (
                        <CarouselCard key={index} index={index} activeIndexes={this.state.activeIndexes}>
                            <CardPanel className='carousel-card-panel'>
                                <a className='carousel-card-button' onClick={() => this.props.rateItem(item.id)}><i className="material-icons">favorite</i></a>
                                <img src={item.image} height='283px' width='224px'/>
                            </CardPanel>
                            <h6>{item.name}</h6>
                            <p>{item.definingInfo}</p>
                            <Modal
                                header={item.name}
                                trigger={<button className='carousel-modal-button'>More</button>}>
                                <div>
                                    <h6>Description</h6>
                                    <p>{item.text}</p>
                                    <Divider />
                                    <h6>Videos</h6>

                                    {
                                        item.trailers && item.trailers.map((trailer, idx) => {
                                            return (
                                                <a key={idx} href={`https://www.youtube.com/watch?v=${trailer.key}`} target='_blank'>{trailer.name}</a>
                                            )
                                        })
                                    }
                                </div>

                            </Modal>
                        </CarouselCard>
                    )
                })}
                <CarouselButton className='carousel-arrow carousel-arrow-right' onClick={this.goToNextSlide}>
                    <i className="material-icons">arrow_forward_ios</i>
                </CarouselButton>
            </Row>

    )
    }
}

export default Carousel;