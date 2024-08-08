import React from 'react';
import { useNavigate } from 'react-router-dom';
import searchBarImage from '../Assets/SearchBarImg.png'
import './SearchBar.css';

const SearchBar = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/home');
  };

  return (
    <div className="home-search-bar">
    <h2>Search Medicines Hasslefree</h2>
    <img
    src={searchBarImage}
    alt="Search Bar"
    className="search-bar-image"
    onClick={handleSearch}
  />
    </div>
  );
};

export default SearchBar;
