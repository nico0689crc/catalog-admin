import { useState, useRef } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Button from "../../FormElements/Button/Button";
import Card from "../Card/Card";
import "./Carousel.css";

const Carousel = ({ items }) => {
  const imagesRefs = useRef([]);
  const bulletsRefs = useRef([]);
  const [imageActiveIndex, setImageActiveIndex] = useState(0);
  const totalItems = useState(items.length)[0];

  const showPreviousImageHandler = () => {
    imagesRefs.current[imageActiveIndex].classList.remove("active");
    bulletsRefs.current[imageActiveIndex].classList.remove("active");
    setImageActiveIndex(prev => prev - 1);
    imagesRefs.current[imageActiveIndex].classList.add("active");
    bulletsRefs.current[imageActiveIndex].classList.add("active");
  };

  const showNextImageHandler = () => {
    imagesRefs.current[imageActiveIndex].classList.remove("active");
    bulletsRefs.current[imageActiveIndex].classList.remove("active");
    setImageActiveIndex(prev => prev + 1);
    imagesRefs.current[imageActiveIndex].classList.add("active");
    bulletsRefs.current[imageActiveIndex].classList.add("active");
  };

  return (
    <Card className="carousel">
      <div className="carousel__images">
        {items.map((image, index) => (
          <div
            key={index}
            ref={el => (imagesRefs.current[index] = el)}
            style={{ backgroundImage: `url("${image}")` }}
            alt=""
            className={`carousel__image ${
              index === imageActiveIndex ? "active" : ""
            }`}
          ></div>
        ))}
      </div>
      <div className="carousel__bullets">
        {items.map((image, index) => (
          <div
            key={index}
            ref={el => (bulletsRefs.current[index] = el)}
            className={`carousel__bullet ${
              index === imageActiveIndex ? "active" : ""
            }`}
          ></div>
        ))}
      </div>
      {imageActiveIndex > 0 && (
        <Button
          className="carousel__button carousel__button--previous"
          type="primary"
          shape="round"
          onClick={showPreviousImageHandler}
          icon={<FiArrowLeft />}
        />
      )}
      {imageActiveIndex < totalItems - 1 && (
        <Button
          className="carousel__button carousel__button--next"
          type="primary"
          shape="round"
          onClick={showNextImageHandler}
          icon={<FiArrowRight />}
        />
      )}
    </Card>
  );
};

export default Carousel;
