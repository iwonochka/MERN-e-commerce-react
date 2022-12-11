import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./CarouselDetails.css"


const CarouselDetails = (props) => {

  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      <Carousel variant="dark" activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src={props.product.images[0]}
          alt={props.product.model}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src={props.product.images[1]}
          alt={props.product.model}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src={props.product.images[2]}
          alt={props.product.model}
        />
      </Carousel.Item>
    </Carousel>

    </div>
  )
}

export default CarouselDetails
