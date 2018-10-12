import react from 'react';

const CarouselCardIndicator = (props) => (
    <li>
        <a
            className={
                props.index == props.activeIndex
                    ? "carousel__indicator carousel__indicator--active"
                    : "carousel__indicator"
            }
            onClick={props.onClick}
        />
    </li>
)

export default CarouselCardIndicator;