import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import {
  get_product_request,
  product_filter,
  product_search,
} from "../Redux/productActions";
import "../Styles/styles.css";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import Error from "../components/Error";

const HomePage = () => {
  const dispatch = useDispatch();

  const { fetchedData, filterData, loading, error } = useSelector(
    (store) => store.productSlice
  );
  const mappingData = filterData.length ? filterData : fetchedData;
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleCategory = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedCategory([...selectedCategory, value]);
    } else {
      setSelectedCategory([...selectedCategory.filter((e) => e != value)]);
    }
  };

  const handleSearchData = () => {
    dispatch(product_search(searchInput.split(" ")));
  };
  const searchOnKeyPress = (e) => {
    if (e.key == "Enter") {
      dispatch(product_search(searchInput.split(" ")));
    }
  };

  useEffect(() => {
    dispatch(product_filter(selectedCategory));
  }, [selectedCategory]);

  useEffect(() => {
    dispatch(get_product_request());
  }, []);
  return (
    <>
      <Navbar />

      <div className='searchDiv'>
        <input
          type='text'
          placeholder='Search (try Black Polo)'
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          onKeyDown={searchOnKeyPress}
        />
        <div className='searchIconDiv' onClick={handleSearchData}>
          <SearchIcon />
        </div>
      </div>

      <div className='contentDiv'>
        <div className='filter_div'>
          <h3>Filters</h3>
          {/* color filter box */}

          <div className='checkBoxDiv'>
            <h4>Color</h4>
            <div className='check_box'>
              <input
                type='checkbox'
                name=''
                onChange={handleCategory}
                value={"Red"}
              />{" "}
              <label htmlFor=''>Red</label>
            </div>
            <div className='check_box'>
              <input
                type='checkbox'
                name=''
                onChange={handleCategory}
                value={"Blue"}
              />{" "}
              <label htmlFor=''>Blue</label>
            </div>
            <div className='check_box'>
              <input
                type='checkbox'
                name=''
                onChange={handleCategory}
                value={"Green"}
              />{" "}
              <label htmlFor=''>Green</label>
            </div>
          </div>
          {/* gender filter box */}
          <div className='checkBoxDiv'>
            <h4>Gender</h4>
            <div className='check_box'>
              <input
                type='checkbox'
                name=''
                onChange={handleCategory}
                value={"Men"}
              />{" "}
              <label htmlFor=''>Men</label>
            </div>
            <div className='check_box'>
              <input
                type='checkbox'
                name=''
                onChange={handleCategory}
                value={"Women"}
              />{" "}
              <label htmlFor=''>Women</label>
            </div>
          </div>
          {/* price filter box */}
          <div className='checkBoxDiv'>
            <h4>Price</h4>
            <div className='check_box'>
              <input
                type='checkbox'
                name=''
                onChange={handleCategory}
                value={"250"}
              />{" "}
              <label htmlFor=''>0-250</label>
            </div>
            <div className='check_box'>
              <input
                type='checkbox'
                name=''
                onChange={handleCategory}
                value={"251"}
              />{" "}
              <label htmlFor=''>251-450</label>
            </div>
            <div className='check_box'>
              <input
                type='checkbox'
                name=''
                onChange={handleCategory}
                value={"450"}
              />{" "}
              <label htmlFor=''>450</label>
            </div>
          </div>
          {/* type filter div */}
          <div className='checkBoxDiv'>
            <h4>Type</h4>
            <div className='check_box'>
              <input
                type='checkbox'
                name=''
                onChange={handleCategory}
                value={"Polo"}
              />{" "}
              <label htmlFor=''>Polo</label>
            </div>
            <div className='check_box'>
              <input
                type='checkbox'
                name=''
                onChange={handleCategory}
                value={"Hoodie"}
              />{" "}
              <label htmlFor=''>Hoodie</label>
            </div>
            <div className='check_box'>
              <input
                type='checkbox'
                name=''
                onChange={handleCategory}
                value={"Basic"}
              />{" "}
              <label htmlFor=''>Basic</label>
            </div>
          </div>
        </div>
        <div className='product_list_div'>
          {/* Check for Loading first and then Conditional Rendering is done */}
          {loading ? (
            <Loading />
          ) : error ? (
            <Error />
          ) : (
            mappingData.map((item) => {
              return <ProductCard item={item} key={item.id} />;
            })
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
