import React from 'react';
import NewNavBar from '../Components/NewNav';
import SearchBar from './SearchBar';
import PromotionalBanners from './Banners';
import ProductSection from './ProductSection';
import CategorySection from './CategorySection';
import './NewCusHome.css';
import Options from './Options';

const HomePage = () => {
  return (
    <div className="home-page">
      <NewNavBar />
      <SearchBar />
      <Options/>
      <PromotionalBanners />
      {/*<ProductSection />
      <CategorySection />*/}
    </div>
  );
};

export default HomePage;
