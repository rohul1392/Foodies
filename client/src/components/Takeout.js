import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Table from 'react-bootstrap/Table'
import { Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form'

import { placeOrder, takeOutOrder } from '../actions/orderActions'
import takeoutOrderReducer from '../reducers/orderReducer'
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from '../components/Success'

export default function Takekout({ subtotal }) {

    const orderstate = useSelector((state) => state.placeOrderReducer)
    const takeoutstate = useSelector((state) => state.takeoutOrderReducer)
    const userstate = useSelector((state) => state.loginUserReducer.currentUser)
    const { loading, error, success } = takeoutstate
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);

    const [uname, setUname] = useState("");
    const [uphone, setUphone] = useState("");
    const [umail, setUmail] = useState("");

    const handleClose = () => {setShow(false)};
    const handleShow = () => setShow(true);

    function formHandler(e) {
        e.preventDefault();
        const _user = {
            name : userstate.name ? userstate.name : uname ,
            email : userstate.email ? userstate.email : umail,
            phone : uphone
        };
        console.log(_user);
        dispatch(takeOutOrder(subtotal, _user))
    }
    

    function tokenHander(token) {
        dispatch(placeOrder(token, subtotal))
    }



    return (
        <div>
            {loading && (<Loading />)}
            {error && (<Error error='Something went wrong' />)}
            {success && (<Success success='Your Order Placed Successfully' />)}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Total</th>
                        <th>{subtotal} 円</th>
                    </tr>
                </thead>
            </Table>
            <button className='btn' onClick={handleShow}>Place Order</button>
            {/* <button className='btn' onClick={()=>{dispatch(takeOutOrder(subtotal))}}>Place Order</button> */}
            <hr />
            <Modal show={show}>
                <Modal.Header >
                    <Modal.Title className='text-center '>Confirm Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form onSubmit={formHandler}>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="name"
                            value={uname}
                            onChange={(e) => {
                                setUname(e.target.value);
                            }}
                        />
                        <input
                            className="form-control"
                            type="email"
                            placeholder="Mail"
                            value={umail}
                            onChange={(e) => {
                                setUmail(e.target.value);
                            }}
                        />
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Phone Number"
                            value={uphone}
                            onChange={(e) => {
                                setUphone(e.target.value);
                            }}
                        />

                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <button className='btn' onClick={handleClose} >CLOSE</button>
                    <button className='btn m-2' disabled={!uname || !umail} onClick={formHandler} >Confirm</button>
                    {/* {success && (<Success success='Your Order Placed Successfully' />)} */}
                </Modal.Footer>
            </Modal>
        </div>

    )
}

