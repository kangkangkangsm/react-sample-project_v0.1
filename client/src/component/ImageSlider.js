import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box } from '@mui/material';

const ImageSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // 좌우 화살표 활성화
    autoplay: true, // 자동 재생
    autoplaySpeed: 3000, // 자동 재생 속도
  };

  return (
    <Box>
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={img}>
            <img src={img} alt={`Slide ${index}`} style={{ width: '100%', height: 'auto' }} />
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default ImageSlider;
