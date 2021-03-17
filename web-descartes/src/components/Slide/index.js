import React from 'react';
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";

import banner1 from "../../assets/banner/banner-map.png";
import banner2 from "../../assets/banner/banner1.png";
import banner3 from "../../assets/banner/banner2.png";

import "./styles.css";


function Slide() {
  return (
    <div className='Carousel'>
      <Carousel
        showArrows={true}
        key={banner3}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        className="carousel-styles"
        >
          <div>
            <img src={banner1} alt="Banner 01" />
          </div>
          <div>
            <img src={banner2} alt="Banner 01" />
          </div>
          <div>
            <img src={banner3} alt="Banner 01" />
          </div>
        </Carousel>
        
    </div>
  );
}

export default Slide;
