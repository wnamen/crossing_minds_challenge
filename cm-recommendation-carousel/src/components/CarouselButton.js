import React from 'react'

const CarouselButton = (props) => (
    <a
        className={props.className}
        onClick={props.onClick}
    >
        { props.children }
    </a>
)

export default CarouselButton;