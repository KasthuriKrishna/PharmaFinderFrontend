import React from 'react';
import Slider from 'react-slick';
import './Banners.css';

// Import slick-carousel styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PromotionalBanners = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 3, // Show 3 banners at a time
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500, // 2 seconds
        arrows: true, // Show arrows
        centerMode: true, // Center the active slide
        centerPadding: '10px', // Add padding around centered slide
      };
      

  const banners = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaNQcSfewSVFlv0tlashl_kdNCVWTLKsLj0g&s",
    "https://www.shutterstock.com/image-vector/creative-minimal-probiotics-supplement-ad-600nw-2175235019.jpg",
    "https://www.imodium.com/sites/imodium_us/files/styles/product_image/public/product-images/imo_ad_oral_solution_caplets_04.jpeg",
    "https://gumlet-images.assettype.com/afaqs%2F2022-02%2F2315ac7c-7f30-46f4-a60a-8b116958f848%2Fcrocin650.jpg?auto=format%2Ccompress&w=400&dpr=2.6",
    "https://mercury.akamaized.net/i/c0e6738434bfe1df4f9de25dd20146f2_277054_0.jpg",
    "https://dcassetcdn.com/design_img/2412975/546229/546229_12756115_2412975_d2d764c3_image.png",
  ];

  return (
    <div className="promotional-banners">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="banner">
            <img src={banner} alt={`Banner ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PromotionalBanners;
