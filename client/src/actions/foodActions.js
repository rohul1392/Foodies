import axios from "axios";
export const getAllFoods = () => async dispatch => {

    dispatch({ type: 'GET_FOODS_REQUEST' })

    try {
        const response = await axios.get('/api/foods/getallfoods')
        console.log(response)
        dispatch({type: 'GET_FOODS_SUCCESS' , payload: response.data})
    } catch (error) {
        dispatch({type: 'GET_FOODS_FAILED' , payload: error})
    }
}

export const getFoodById = (foodid) => async dispatch => {

    dispatch({ type: 'GET_FOODBYID_REQUEST'})
    try {
        const response = await axios.post('/api/foods/getfoodbyid', {foodid})
        console.log(response)
        dispatch({type: 'GET_FOODBYID_SUCCESS' , payload: response.data})
    } catch (error) {
        dispatch({type: 'GET_FOODBYID_FAILED' , payload: error})
    }
}

export const filterFoods = (searchkey, category) => async dispatch => {
    var filteredfoods ;
    dispatch({ type: 'GET_FOODS_REQUEST' })
    try {
        const response = await axios.get('/api/foods/getallfoods')
        filteredfoods = response.data.filter(food => food.name.toLowerCase().includes(searchkey))
        console.log(response)
        dispatch({type: 'GET_FOODS_SUCCESS' , payload: filteredfoods})
    } catch (error) {
        dispatch({type: 'GET_FOODS_FAILED' , payload: error})
    }
}

export const addFood = (food) => async dispatch => {
    dispatch({ type: 'ADD_FOOD_REQUEST'})
    try {
        const response = await axios.post('/api/foods/addfood',{food})
        // console.log(response);
        dispatch({type: 'ADD_FOOD_SUCCESS'})
        window.location.href='/admin/addfood'
    } catch (error) {
        dispatch({type: 'ADD_FOOD_FAILED' , payload: error})
    }
}

export const editFood=(editedfood)=>async dispatch=>{
    dispatch({type:'EDIT_FOOD_REQUEST'})
    try {
        const response= await axios.post('/api/foods/editfood' , {editedfood})
        console.log(response);
        dispatch({type:'EDIT_FOOD_SUCCESS'})
        window.location.href='/admin/foodslist'
    } catch (error) {
        dispatch({type:'EDIT_FOOD_FAILED' , payload : error})
    }
}

export const deleteFood=(foodid)=>async dispatch=>{

    try {
        const response =await axios.post('/api/foods/deletefood' , {foodid})
        alert('Food Deleted Successfully')
        console.log(response);
        window.location.reload()
    } catch (error) {
        alert('Something went wrong')
        console.log(error);
    }
}
