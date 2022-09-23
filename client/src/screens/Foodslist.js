import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFood, getAllFoods } from "../actions/foodActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Filter from "../components/Filter";
import { Link } from "react-router-dom";


export default function Foodslist  ()  {
    const dispatch = useDispatch();

    const foodsstate = useSelector((state) => state.getAllFoodsReducer);
  
    const { foods, error, loading } = foodsstate;
  
    useEffect(() => {
      dispatch(getAllFoods());
    }, []);
    return (
        <div>
            
            {loading && (<Loading />)}
            {error && (<Error error='Somethin went wrong!!'/>)}
            <h2 style={{textAlign: 'center'}}>Foods List</h2>
            <table className='table table-striped table-bordered p-3 table-responsive-sm'>
            <thead className='thead-dark'>
                <tr>
                    <th>Name</th>
                    <th>Prices</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>   
            <tbody>
                {foods && foods.map(food => {
                    return <tr>
                            <td>{food.name}</td>
                            <td>

                                Small : {food.prices[0]['small']} <br/>
                                Medium : {food.prices[0]['medium']} <br/>
                                Large : {food.prices[0]['large']}
                                
                            </td>
                                <td>{food.category}</td>
                            <td>
                                <i className='fa fa-trash m-1' onClick={()=>{dispatch(deleteFood(food._id))}}></i>
                                <Link to={`/admin/editfood/${food._id}`}>
                                    <i className='fa fa-edit m-1' ></i>
                                </Link>
                            </td>
                        </tr>
                })}
            </tbody>
            </table>
        </div>
    );
}

