import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CashOnDelivery = (items) => {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState(0);
  const [values, setValues] = useState({
    name: '',
    email: '',
    address1: '',
    address2: '',
    zipCode: '',
    building: '',
    phone: ''
  })
 
  const [validations, setValidations] = useState({
    name: '',
    email: '',
    address1: '',
    address2: '',
    zipCode: '',
    building: '',
    phone: ''
  })

  const handleClose = () => {
    setShow(false);
  };
  const navigate = useNavigate();

  useEffect(() => {
    let price = 0;
    items.items.forEach((item) => {
      price += item.price;
    });
    setPrice(price);
  }, [items]);


  const handleCheckout = () => {
    setShow(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({...values, [name]: value })
  }
  const validateAll = () => {
    const { name, email, phone,address1,zipCode,building } = values
    const validations = { name: '', email: '', phone: '' }
    let isValid = true
    
    if (!name) {
      validations.name = 'Name is required'
      isValid = false
    }
    
    if ((name && name.length < 3) || name.length > 50) {
      validations.name = 'Name must contain between 3 and 50 characters'
      isValid 
      = false
    }
    if (!address1) {
      validations.address1 = 'Address is required'
      isValid = false
    }
    
    if ((address1 && address1.length < 3)) {
      validations.address1 = 'Invalid Address'
      isValid = false
    }
    if (!zipCode) {
      validations.zipCode = 'Zip Code is required'
      isValid = false
    }
    
    if ((zipCode && zipCode.length < 8)) {
      validations.zipCode = 'Invalid ZipCode'
      isValid = false
    }
    if (!building) {
      validations.building = 'Building number is required'
      isValid = false
    }
    
    if ((building && building.length < 3)) {
      validations.building = 'Invalid ZipCode'
      isValid = false
    }
    if (!phone) {
      validations.phone = 'Phone is required'
      isValid = false
    }
    if (phone && phone.length < 8) {
      validations.phone = 'Phone must greater than 8'
      isValid 
      = false
    }
    if (!email) {
      validations.email = 'Email is required'
      isValid = false
    }
    
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      validations.email = 'Email format must be as example@mail.com'
      isValid = false
    }
        
    if (!isValid) {
      setValidations(validations)
    }
    
    return isValid
  }
  const handleConfirm = () => {
    const isValid = validateAll()
    if (!isValid) {
      return false
    } else
    {
    axios
        .post(`/api/orders/cashondelivery`, {
          cartItems: items.items,
          userId: currentUser._id
            ? currentUser._id
            : Math.random().toString(36).substring(2, 7),
          name: name,
          email: email,
          phone: phone,
          subtotal: price,
          address:address1+', '+address2,
          zipCode,
          building
        })
        .then((res) => {
          if (res.status === 200) {
            navigate("/CheckoutSuccess");
          } else {
            navigate("/CheckoutCancelled");
          }
        })
        .catch((err) => navigate("/CheckoutCancelled"));
      }
  };
  const { name, email,phone , address1,address2, building,zipCode} = values

  const { 
    name: nameVal, 
    email: emailVal, 
    address1: address1Val, 
    building: buildingVal, 
    zipCode: zipCodeVal, 
    phone: phoneVal 
  } = validations

  return (
    <>
      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header style={{padding:'0px'}}>
          <Modal.Title>Confirm your order</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{padding:'0px'}}> 
          <Form style={{paddingTop:'0px'}}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label style={{marginBottom:'0px'}}>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                autoFocus
                name="name"
                value={name} 
                onChange={handleChange}
              />
              {nameVal && <Form.Label style={{color:'red'}}>{nameVal}</Form.Label>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{marginBottom:'0px'}}>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                name="email"
                value={email} 
                onChange={handleChange}
                />
               {emailVal &&  <Form.Label style={{color:'red'}}>{emailVal}</Form.Label>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{marginBottom:'0px'}}>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone"
                autoFocus
                name="phone"
                value={phone} 
                onChange={handleChange}
                />
                {phoneVal && <Form.Label style={{color:'red'}}>{phoneVal}</Form.Label>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{marginBottom:'0px'}}>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address 1"
                autoFocus
                name="address1"
                value={address1} 
                onChange={handleChange}
                />
                {address1Val && <Form.Label style={{color:'red'}}>{address1Val}</Form.Label>}
              <Form.Control
                type="text"
                placeholder="Address 2"
                autoFocus
                name="address2"
                value={address2} 
                onChange={handleChange}
                />
              <Form.Control
                type="text"
                placeholder="Zip Code"
                autoFocus
                value={zipCode}
                name="zipCode"
                onChange={handleChange}
                />
                {zipCodeVal && <Form.Label style={{color:'red'}}>{zipCodeVal}</Form.Label>}
              <Form.Control
                type="text"
                placeholder="Building Number"
                autoFocus
                name="building"
                value={building} 
                onChange={handleChange}
                />
                {buildingVal && <Form.Label style={{color:'red'}}>{buildingVal}</Form.Label>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <button
        className="m-10 w-100"
        onClick={() => handleCheckout()}
        variant="primary"
        style={{ borderRadius: "50px" }}
      >
        Cash On Delivery
      </button>
    </>
  );
};

export default CashOnDelivery;
