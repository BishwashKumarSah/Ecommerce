import React, { useCallback, useEffect, useState } from "react";
import "./BannerImage.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { BsCircleFill } from "react-icons/bs";

const BannerImage = () => {
  const [imgIndex, setImgIndex] = useState(0);

  const Images = [
    "/images/bannerImage1.jpg",
    "/images/bannerImage3.jpg",
    "/images/bannerImage4.jpg",
    "/images/bannerImage5.jpg",
    "/images/bannerImage6.jpg",
    "/images/bannerImage7.jpg",
  ];

  const showPrevImages = () => {
    setImgIndex((prev) => {
      if (prev === 0) {
        return Images.length - 1;
      }
      return prev - 1;
    });
  };

  const showNextImages = useCallback(() => {
    setImgIndex((prev) => {
      if (prev === Images.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  }, [Images.length]);

  useEffect(() => {
    const interval = setInterval(showNextImages, 3000); // Change image every 3 seconds

    return () => {
      clearInterval(interval); // Clear interval on component unmount
    };
  }, [showNextImages]);

  return (
    <section className="image-slider">
      <div className="banner_image">       
        {Images.map((img, ind) => (
          <img
            key={ind}
            src={img}
            alt="img"
            className="img-slider-img"
            style={{ translate: `${-100 * imgIndex}%` }}
          />
        ))}
      </div>
      <button onClick={showPrevImages} className="btn-backward">
        <IoIosArrowBack className="btn-backward-icon" />
      </button>
      <button onClick={showNextImages} className="btn-forward">
        <IoIosArrowForward />
      </button>
      <div className="circle-slider">
        {Images.map((_, index) => (
          <button
            key={index}
            className="circle-icon-btn"
            onClick={() => setImgIndex(index)}
          >
            {index === imgIndex ? (
              <BsCircleFill className="icon-circle" color="white" />
            ) : (
              <BsCircleFill className="icon-circle" color="grey" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

export default BannerImage;
