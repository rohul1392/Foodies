import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../actions/orderActions";
import Error from "../components/Error";
import Filter from "../components/Filter";
import Loading from "../components/Loading";
import { deleteUser, getAllUsers } from '../actions/userActions'
export default function Userslist() {
    const dispatch = useDispatch()
    const usersstate = useSelector(state => state.getAllUsersReducer)
    const { error, loading, users } = usersstate
    useEffect(() => {

        dispatch(getAllUsers())

    }, [])
    return (
        <div>

            {loading && (<Loading />)}
            {error && (<Error error='Somethin went wrong!!' />)}
            <h2 style={{ textAlign: 'center' }}>Users List</h2>
            <table className='table table-striped table-bordered table-responsive-sm'>
                <thead className='thead-dark'>
                    <tr>
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {users && users.map(user => {
                        return <tr>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td><i className='fa fa-trash' onClick={() => { dispatch(deleteUser(user._id)) }}></i></td>
                        </tr>
                    })}
                </tbody>

            </table>

        </div>
    )
}