import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Image, Video, Transformation, AdvancedImage,lazyload,responsive,accessibility,placeholder } from 'cloudinary-react';

import { addFood } from "../actions/foodActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from '../components/Success'
import Axios from "axios";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const Addfood = () => {

    const [name, setname] = useState("");
    const [smallprice, setsmallprice] = useState();
    const [mediumprice, setmediumprice] = useState();
    const [largeprice, setlargeprice] = useState();
    const [image, setimage] = useState("");
    const [description, setdescription] = useState("");
    const [category, setcategory] = useState("");
    const [imageSelected, setimageSelected] = useState("");
    const [err, seterr] = useState("");
    const [imgLoding, setimgLoding] = useState(false);

    const onSubmit = (data, e) => {};
    const dispatch = useDispatch()

    const addFoodstate = useSelector(state => state.addFoodReducer)
    const { success, error, loading } = addFoodstate

    function formHandler(e) {
        e.preventDefault();
        const food = {
            name,
            image,
            description,
            category,
            prices: {
                small: smallprice,
                medium: mediumprice,
                large: largeprice
            }
        }
        
        dispatch(addFood(food));
        
    }

    const uploadImage = (files) => {
        setimgLoding(true);
        const formData = new FormData();
        formData.append("file", imageSelected)
        formData.append("upload_preset", "ml_default")
        Axios.post(
            "https://api.cloudinary.com/v1_1/dcq1c5yys/image/upload",
            formData
        ).then((response) => {
            
            setimage(response.data.url);
            setimgLoding(false);
        }
        )
        .catch((err) => {
            seterr('err');                
        })

    }


    return (

        <div className="text-left shadow-lg p-3 mb-5 bg-white rounded">
            <h1>Addfood</h1>
            {loading && (<Loading />)}
            {error && (<Error error='Something went wrong' />)}
            {success && (<Success success='New Food added successfully' />)}
            <Row>
                <Col>
                    <form onSubmit = {formHandler}>
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
                            type="file"
                            placeholder="image url"
                            // value={imageName}1`
                            onChange={(e) => {
                                setimageSelected(e.target.files[0]);
                                setimage(e.target.files[0])
                                console.log('image selected', e.target.files[0]);
                            }}
                        />
                        {

                        }
                        <button className='btn mt-3' type='button' onClick={uploadImage}>upload Image</button>
                        {err ? err : ''}
                        <hr />
                        <button className='btn mt-3' type='submit' >Add Food</button>
                    </form>

                </Col>
                <Col>
                    
                    {imgLoding && (<Loading />)}
                    {err ?
                        (
                            <Error error="Image file is too large" />
                        ) :
                        
                        <img
                            className="w-100"
                            src={image}
                            
                        />
                    }

                </Col>
            </Row>

        </div>
    );
}

export default Addfood;
