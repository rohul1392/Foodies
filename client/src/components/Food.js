import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "../actions/cartActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from '../components/Success';
import Alert from 'react-bootstrap/Alert'
import AOS from 'aos';
import 'aos/dist/aos.css';
export default function Food({ food }) {

  AOS.init({})

  const [quantity, setquantity] = useState(1);
  const [varient, setvarient] = useState("medium");
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch(false);
  function addtocart() {
    dispatch(addToCart(food, quantity, varient));
    setAlert(true);
    setTimeout(() => {
      setAlert(false)
  }, 2000);
  }
  
  console.log('food.image',food.image);

  return (
    <div data-aos='zoom-in'
      className="shadow-lg p-3 mb-5 bg-white rounded">
      <div onClick={handleShow}>
        <h1 className="text-center">{food.name}</h1>
        <img
          src={food.image}
          alt=""
          className="img-fluid rounded mx-auto d-block"
          style={{ height: "250px", width: "300px" }}
        />
      </div>

      <div className="flex-container">
        <div className="w-100 m-1">
          <p>Varients</p>
          <select
            className="form-control  "
            value={varient}
            onChange={(e) => {
              setvarient(e.target.value);
            }}
          >
            {food.varients.map((varients) => {
              var options = []
              if (food.prices[0][varients]) {
                options.push(varients)
              }
              return <option value={options}>{options}</option>;
            })}
          </select>
        </div>
        <div className="w-100 m-1">
          <p>Quantity</p>
          <select
            className="form-control"
            value={quantity}
            onChange={(e) => {
              setquantity(e.target.value);
            }}
          >
            {[...Array(10).keys()].map((x, i) => {
              return <option value={i + 1}>{i + 1}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="flex-container">
        <div className="m-2 w-100">
          <h1 className="mt-1">
            {/* price: {food.prices[0][varient] * quantity}円 */}
            price: {food.prices[0]['medium'] * quantity}円

          </h1>
        </div>
        <div className="m-1 w-100" >
          <button style={{height: 'auto'}} className="btn m-0 w-100" onClick={addtocart}> ADD TO CART</button>
        </div>
      </div>
      {alert && (<Success success='Added to Cart' />)}
      <Modal show={show}>
        <Modal.Header >
          <Modal.Title>{food.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img className="img-fluid" src={food.image} alt="" style={{ height: '400px' }} />
          <p>{food.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className='btn' onClick={handleClose} >CLOSE</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

