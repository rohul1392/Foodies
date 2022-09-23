import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Table from 'react-bootstrap/Table'
import { placeOrder, takeOutOrder } from '../actions/orderActions'
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from '../components/Success'

export default function Checkout({ subtotal }) {

    const orderstate = useSelector((state) => state.placeOrderReducer)
    const { loading, error, success } = orderstate
    const dispatch = useDispatch()
    function tokenHander(token) {
        // console.log(token);
        dispatch(placeOrder(token, subtotal))
    }


    return (
        <div>

            {loading && (<Loading />)}
            {error && (<Error error='Something went wrong' />)}
            {success && (<Success success='Your Order Placed Successfully' />)}

            <StripeCheckout
                name='BIMI KITCHEN'
                image="https://res.cloudinary.com/dcq1c5yys/image/upload/v1642074845/01_y4r7ay.jpg" // the pop-in header image (default none)
                amount={subtotal}
                shippingAddress
                billingAddress={false}
                token={tokenHander}
                stripeKey='pk_test_51Jw3bUJYxHFKrvkMXZwtxtFDjtoVGiD25rUvXmIVCL9he0V0idTeGc6XSNrhOnhSzOt2KLfqagFbpY6IEmdUOk8i00N0cxvf2J'
                currency='JPY'
            >
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Total</th>
                            <th>Delivery Charges</th>
                            <th>Grand Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            
                            <td>{subtotal == 0 ? '' : subtotal + '円'} </td>
                            <td>{subtotal == 0 ? '' : 100 + '円'} </td>
                            <td>{subtotal == 0 ? '' : subtotal+100 + '円'} </td>
                        </tr>
                    </tbody>
                </Table>
                
                <button className='btn'>Place Order</button>
                <button className='btn_blue btn m-3 '>Cash on Delivery</button>
            </StripeCheckout>
            <hr />
            {/* <button className='btn' onClick={()=>{dispatch(takeOutOrder(subtotal))}}>Take Out</button> */}

        </div>
    )
}