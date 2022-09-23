import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder, getAllOrders } from "../actions/orderActions";
import Error from "../components/Error";
import Filter from "../components/Filter";
import Loading from "../components/Loading";
import { Modal, Button, Toast, Row, Col, Table } from "react-bootstrap";
import { Pagination } from "react-bootstrap";
import "../../src/App.css";

export default function Orderslist() {
  const dispatch = useDispatch();
  const getordersstate = useSelector((state) => state.getAllOrdersReducer);
  const { loading, error, orders, currentPage, numberOfPages } = getordersstate;
  const [orderDetails, setOrderDetails] = useState(orders ? orders[0] : null);
  const [show, setShow] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  const handleClose = () => setShow(false);
  const [toastShow, setToastShow] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState(false);
  useEffect(() => {
    dispatch(getAllOrders(pageNumber)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);
  const handleDetails = (order) => {
    setShow(true);
    setOrderDetails(order);
  };
  const handleDeliver = async (orderid) => {
    const response = await axios.post("/api/orders/deliverorder", { orderid });
    if (response.status === 200) {
      setDeliveryStatus(response.data);
      dispatch(getAllOrders(pageNumber));
      setToastShow(true);
      setShow(false);
    }
  };
  const cancellDeliver = async (orderid) => {
    const response = await axios.post("/api/orders/cancellorder", { orderid });
    if (response.status === 200) {
      setDeliveryStatus(response.data);
      dispatch(getAllOrders(pageNumber));
      setToastShow(true);
      setShow(false);
    }
  };
  const changePage = (number) => {
    console.log("changePage", number);
    setPageNumber(number);
    //setPageNumber(Math.max(0, pageNumber - 1));
  };
  // const gotoPrevious = () => {
  //   setPageNumber(Math.max(0, pageNumber - 1));
  // };

  // const gotoNext = () => {
  //   setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  // };
  const getShippingAddress = (shippingAddress) => {
    return shippingAddress.address?.country +',' + shippingAddress.address?.city;
  };
  const getDeliveryStatus = (value) => {
    if (value === 1) {
      return <h1 style={{ color: "green" }}>Delivered</h1>;
    } else if (value === 2) {
      return <h1 style={{ color: "red" }}>Cancelled</h1>;
    } else {
      return <h1>Not Delivered</h1>;
    }
  };
  const getTakeoutStatus = (value) => {
    if (value === 1) {
      return <th>Phone Number</th>;
    } else if (value === 2) {
      return(<>
        <th>Phone Number</th>
        <th>Address</th>
        <th>Zip Code</th>
        <th>Building</th>
        </>)
    } else {
      return <th>Shipping Address</th>;
    }
  };
  const getTakeoutValues = (value,orderDetails) => {
    if (value === 1) {
      return <td>{orderDetails.phone}</td>;
    } else if (value === 2) {
      return(<>
        <td>{orderDetails.phone}</td>
        <td>{orderDetails.address}</td>
        <td>{orderDetails.zipCode}</td>
        <td>{orderDetails.building}</td>
        </>)
    } else {
      return <td>{getShippingAddress(orderDetails.shippingAddress)}</td>
    }
  };
  const getDeliveryType = (value) => {
    if (value === 1) {
      return <h1>Take Out</h1>;
    } else if (value === 2) {
      return <h1>Cash On</h1>;
    } else {
      return <h1>Delivery</h1>;
    }
  };
  return (
    <div>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      <Row>
        <Col xs={6}></Col>
        <Col xs={6}>
          <Toast
            onClose={() => setToastShow(false)}
            show={toastShow}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Delivery Status</strong>
            </Toast.Header>
            <Toast.Body>{deliveryStatus}</Toast.Body>
          </Toast>
        </Col>
      </Row>
      <table className="table table-striped table-bordered p-3 table-responsive-sm">
        <thead className="thead-dark">
          <tr>
            <th>Order Id</th>
            <th>Email</th>
            <th>User</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Order Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders &&
            orders.map((order) => {
              return (
                <tr key={order._id}>
                  <td
                    style={{ color: "green", cursor: "pointer" }}
                    onClick={() => handleDetails(order)}
                  >
                    {order._id}
                  </td>
                  <td>{order.email}</td>
                  <td>{order.name}</td>
                  <td>{order.orderAmount}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{getDeliveryType(order.isTakeout)}</td>
                  <td>
                    {getDeliveryStatus(order.isDelivered)}
                    {/* {order.isDelivered ? (
                      <h1 style={{color:'green'}}>Delivered</h1>
                    ) : (
                      <h1 style={{color:'red'}}>Not Delivered</h1>
                       <button className="btn" style={{width:'100%',height:'70%'}} onClick={()=>{dispatch(deliverOrder(order._id))}}>Deliver</button>
                       <button className="btn" style={{width:'100%',height:'70%'}} onClick={()=>handleDeliver(order._id)}>Deliver</button>
                    )} */}
                  </td>
                  <td>
                    <i
                      class="fa fa-check m-1"
                      onClick={() => handleDeliver(order._id)}
                    ></i>
                    <i
                      className="fa fa-times m-1"
                      onClick={() => cancellDeliver(order._id)}
                    ></i>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="container p-2">
        <Pagination size="lg">
          {pages.map((pageIndex) => (
            <Pagination.Item
              active={pageNumber === Number(pageIndex + 1)}
              key={pageIndex}
              onClick={() => changePage(Number(pageIndex + 1))}
            >
              {pageIndex + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      {orderDetails && (
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header>
            <Modal.Title>Delivery Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Items</th>
                  {getTakeoutStatus(orderDetails.isTakeout)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {orderDetails?.orderItems.length > 0
                      ? orderDetails?.orderItems.map((item) => {
                          return (
                            <div>
                              <p>
                                {item.name} [{item.varient}] * {item.quantity} ={" "}
                                {item.price}
                              </p>
                            </div>
                          );
                        })
                      : ""}
                  </td>
                  {getTakeoutValues(orderDetails.isTakeout,orderDetails)}
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={() => handleDeliver(orderDetails?._id)}>
     Deliver 
   </Button> */}
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
