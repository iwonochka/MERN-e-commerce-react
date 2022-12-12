import ReactSlider from "react-slider";
import { useState } from "react";
import './Slider.css'

const Slider = ({minPrice, maxPrice, setFilterData, filterData}) => {
  const [min, setMin] = useState(minPrice);
  const [max, setMax] = useState(maxPrice);

  return (
    <div className="slider-container">
    <ReactSlider
          defaultValue={[minPrice, maxPrice]}
          className="slider"
          value={[min, max]}
          trackClassName="tracker"
          min={minPrice}
          max={maxPrice}
          minDistance={50}
          withTracks={true}
          pearling={true}
          renderThumb={(props) => {
            return <div {...props} className="thumb"></div>;
          }}
          renderTrack={(props) => {
            return <div {...props} className="track"></div>;
          }}
          onChange={([min, max]) => {
            setMin(min);
            setMax(max);
            setFilterData({ ...filterData, minPrice: min, maxPrice: max });
          }}
        />
        <div className="values-wrapper">
          <p><span>{min}</span></p>
          <p><span>{max}</span></p>
        </div>
      </div>
  )
}

export default Slider
