import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editFood, getFoodById } from "../actions/foodActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";
import { useParams } from 'react-router-dom';

export default function  Editfood (){
    const params = useParams();
    const dispatch = useDispatch();
    const [name, setname] = useState("");
    const [smallprice, setsmallprice] = useState();
    const [mediumprice, setmediumprice] = useState();
    const [largeprice, setlargeprice] = useState();
    const [image, setimage] = useState("");
    const [description, setdescription] = useState("");
    const [category, setcategory] = useState("");

    const getfoodbyidstate = useSelector((state) => state.getFoodByIdReducer);

    const { food, error, loading } = getfoodbyidstate;

    const editfoodstate = useSelector((state) => state.editFoodReducer)
    
    const { editloading, editerror, editsuccess } = editfoodstate;



    useEffect(() => {
        // console.log(food);
        if(food)
        {
            if(food._id==params.foodid)
            {
                setname(food.name)
                setdescription(food.description)
                setcategory(food.category)
                setsmallprice(food.prices[0]['small'])
                setmediumprice(food.prices[0]['medium'])
                setlargeprice(food.prices[0]['large'])
                setimage(food.image)
            }
            else{
                dispatch(getFoodById(params.foodid))
            }
            
        }
        else{
            dispatch(getFoodById(params.foodid))
            // console.log('food not found',params.foodid);
        }
    },[food , dispatch])

    function formHandler(e) {
        
        e.preventDefault();

        const editedfood = {
            _id: params.foodid,
            name,
            image,
            description,
            category,
            prices: {
                small: smallprice,
                medium: mediumprice,
                large: largeprice,
            },
        };

        dispatch(editFood(editedfood))
    }
    
    return (
        <div>
            <div className="text-left shadow-lg p-3 mb-5 bg-white rounded">
            <h1>Edit food</h1>

            <h1>Food Id = {params.foodid}</h1>

            {loading && <Loading />}
            {error && <Error error="Something went wrong" />}
            
            {editsuccess && (<Success success='Food details edited successfully'/>)}
            {editloading && (<Loading />)}

            <form onSubmit={formHandler}>
                <input
                    className="form-control"
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => {
                        setname(e.target.value);
                    }}
                />
                <input
                    className="form-control"
                    type="text"
                    placeholder="small varient price"
                    value={smallprice}
                    onChange={(e) => {
                        setsmallprice(e.target.value);
                    }}
                />
                <input
                    className="form-control"
                    type="text"
                    placeholder="medium varient price"
                    value={mediumprice}
                    onChange={(e) => {
                        setmediumprice(e.target.value);
                    }}
                />
                <input
                    className="form-control"
                    type="text"
                    placeholder="large varient price"
                    value={largeprice}
                    onChange={(e) => {
                        setlargeprice(e.target.value);
                    }}
                />
                <input
                    className="form-control"
                    type="text"
                    placeholder="category"
                    value={category}
                    onChange={(e) => {
                        setcategory(e.target.value);
                    }}
                />
                <input
                    className="form-control"
                    type="text"
                    placeholder="description"
                    value={description}
                    onChange={(e) => {
                        setdescription(e.target.value);
                    }}
                />
                <input
                    className="form-control"
                    type="text"
                    placeholder="image url"
                    value={image}
                    onChange={(e) => {
                        setimage(e.target.value);
                    }}
                />
                <button className="btn mt-3" type="submit">
                    Edit Food
                </button>
            </form>
        </div>
    </div>
    );
}


