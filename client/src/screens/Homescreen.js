import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFoods } from "../actions/foodActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Food from "../components/Food";
import Filter from "../components/Filter";
import Carousel from 'react-bootstrap/Carousel';
import Fab from "@mui/material/Fab";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import Menu from "../components/Menu";


// Import any actions required for transformations.
import {fill} from "@cloudinary/url-gen/actions/resize";

export default function Homescreen() {
  const dispatch = useDispatch();
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dcq1c5yys'
    }
  });
  // const sliderimg_1 = cld.image('docs/models'); 
  const foodsstate = useSelector((state) => state.getAllFoodsReducer);
  const cartstate = useSelector((state) => state.cartReducer);
  const { foods, error, loading } = foodsstate;

  function cart(params) {
    window.location.href = '/cart'
  }

  useEffect(() => {
    dispatch(getAllFoods());
  }, []);

  return (

    <div className="row justify-content-center">
      <div style={{ display: 'block', width: '100%', height: '100%', marginBottom: 50, marginTop: 2}}>
        {/* <h4 className="justify-content-center">React-Bootstrap Carousel Component</h4> */}
        <Carousel>
          <Carousel.Item interval={2500}>
            <img
              className="w-100"
              src="https://res.cloudinary.com/dcq1c5yys/image/upload/v1643546776/HomeSlider1.jpg"
              alt="Image One"
            />
            {/* <Image publicId="lady.jpg" >
              <Transformation gravity="face" height="400" width="400" crop="crop" />
              <Transformation radius="max" />
              <Transformation width="200" crop="scale" />
            </Image> */}

            <Carousel.Caption>
              <h1>BIMI KITCHEN</h1>
              <p>Bangladeshi Home Style Food with Japanese Quality!!!</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="w-100"
              src="https://res.cloudinary.com/dcq1c5yys/image/upload/v1643546621/HomeSlider2.jpg"
              alt="Image Two"
            />
            <Carousel.Caption>
              <h1>Get your food Delivered in Time</h1>
              <p>Order from home</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <Filter />
      <div className="row justify-content-center " style={{marginTop: 50}}>
        {loading ? (
          <Loading />
        ) : error ? (
          <Error error='Something went wrong' />
        ) : (
          foods.map((food) => {
            return (
              <div className="col-md-3 m-3" key={food._id}>
                <div>
                  <Food food={food} />
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* <Menu /> */}
      <Fab
        sx={{
          position: "fixed",
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
          // visibility: 'hidden'

        }}
        color="primary"
      >
        <ShoppingCartIcon onClick={cart} /> {cartstate.cartItems.length}
      </Fab>
    </div>


  );
};
