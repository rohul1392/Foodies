import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../actions/orderActions'
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from '../components/Success'
import Table from 'react-bootstrap/Table'
import AOS from 'aos'
import 'aos/dist/aos.css';
export default function Ordersscreen() {

    AOS.init()
    const dispatch = useDispatch()
    const orderstate = useSelector(state => state.getUserOrdersReducer)
    const userstate = useSelector((state) => state.loginUserReducer);
    const { currentUser } = userstate;
    const { orders, error, loading } = orderstate

    useEffect(() => {
        if (!currentUser.name) {
            return;
        }
        else {
            console.log(currentUser);
            dispatch(getUserOrders())
        }
    }, [])

    return (
        <div>
            <h2 className="text-center m-2" style={{ fontSize: '35px' }}>My Orders</h2>
            <hr />
            <div className="row justify-content-center">
                {loading && (<Loading />)}
                {error && (<Error error='Something went wrong' />)}
                {orders && orders.map(order => {
                    return <div className="col-md-10 m-2 p-1 font-weight-bold " data-aos="fade-down" style={{ color: '#000' }}>
                        <div className="flex-container">
                            <div className='text-left w-100 m-1'>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Items</th>
                                            <th>Order Amount</th>
                                            <th>Date</th>
                                            <th>Order Id</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {order.orderItems.map(item => {
                                                    return <div>
                                                        <p>{item.name} [{item.varient}] * {item.quantity} = {item.price}</p>
                                                    </div>
                                                })
                                                }
                                            </td>
                                            <td>{order.orderAmount} 円</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>{order._id}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>

                    </div>
                })}
            </div>
        </div>
    )
}