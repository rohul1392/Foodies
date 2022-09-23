import axios from "axios";
import React, { useState ,useEffect} from "react";
import { useSelector } from "react-redux";
import { Modal,Form,Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';



const TakeButton = (items) =>{

    const userstate = useSelector((state) => state.loginUserReducer);
    const { currentUser } = userstate;
    const [show, setShow] = useState(false);
    const [price, setPrice] = useState(0);
    const [values, setValues] = useState({
      name: '',
      email: '',
      phone: ''
    })
   
    const [validations, setValidations] = useState({
      name: '',
      email: '',
      phone: ''
    })
  
    const validateAll = () => {
      const { name, email, phone } = values
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
    const handleChange = (e) => {
      const { name, value } = e.target
      setValues({...values, [name]: value })
    }
  
    const handleClose = () => {
      setShow(false)
    };
    const navigate = useNavigate();

    useEffect(() => {
      let price = 0;
      items.items.forEach((item) => {
        price += item.price;
      });
      setPrice(price)
    }, [items]);

    const handleCheckout = () => {
        setShow(true)
    };
    const handleConfirm = () => {
      const isValid = validateAll()
      if (!isValid) {
        return false
      } else
        {
            axios.post(`/api/orders/takeout`,{
                cartItems : items.items,
                userId:  currentUser._id ? currentUser._id : Math.random().toString(36).substring(2,7),
                name :  name ,
                email :  email,
                phone : phone,
                subtotal:price   
            })
            .then((res)=>{
                if(res.status === 200){
                    navigate("/CheckoutSuccess");
                }
                else{
                    navigate("/CheckoutCancelled");
                }
            })
            .catch((err) => 
            navigate("/CheckoutCancelled")
            )    
        }
    };
    const { name, email,phone } = values

    const { 
      name: nameVal, 
      email: emailVal, 
      phone: phoneVal 
    } = validations
  
    return (
        <>
              <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Confirm your order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                autoFocus
                // onChange={(e) => setName(e.target.value)}
                name="name"
                value={name} 
                onChange={handleChange}
              />
              {nameVal && <Form.Label style={{color:'red'}}>{nameVal}</Form.Label>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                name="email"
                value={email} 
                onChange={handleChange}
                />
                {emailVal &&<Form.Label style={{color:'red'}}>{emailVal}</Form.Label>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone Number</Form.Label>
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
            {/* {error && <Form.Label style={{color:'red'}}>Please provide valid Name,Email and Phone number</Form.Label>} */}

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
            <button className="m-10 w-100" onClick={()=>handleCheckout()} variant='primary' style={{borderRadius: '50px'}}>
                Takeout
            </button>
        </>
    )
}

export default TakeButton;