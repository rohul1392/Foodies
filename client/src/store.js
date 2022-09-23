import {combineReducers} from 'redux' 

import {createStore , applyMiddleware} from 'redux'

import thunk from 'redux-thunk'


import { composeWithDevTools } from 'redux-devtools-extension'
import { getAllFoodsReducer, addFoodReducer, getFoodByIdReducer, editFoodReducer } from './reducers/foodReducers'
import { cartReducer } from './reducers/cartReducers'
import { getAllUsersReducer, loginUserReducer, registerUserReducer } from './reducers/userReducer'
import { placeOrderReducer, getUserOrdersReducer, getAllOrdersReducer, takeoutOrderReducer } from './reducers/orderReducer'



const finalreducer = combineReducers({
    getAllFoodsReducer : getAllFoodsReducer,
    cartReducer: cartReducer,
    registerUserReducer: registerUserReducer,
    loginUserReducer: loginUserReducer,
    placeOrderReducer:placeOrderReducer,
    getUserOrdersReducer:getUserOrdersReducer,
    addFoodReducer: addFoodReducer,
    getFoodByIdReducer: getFoodByIdReducer,
    editFoodReducer: editFoodReducer,
    getAllOrdersReducer:getAllOrdersReducer,
    getAllUsersReducer:getAllUsersReducer,
    takeoutOrderReducer:takeoutOrderReducer

})
const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : []

const initialState = {
    cartReducer : {
        cartItems: cartItems
    },
    loginUserReducer: {
        currentUser: currentUser
    }
    
}
const composeEnhancers = composeWithDevTools({})
const store = createStore(finalreducer, initialState, composeEnhancers(applyMiddleware(thunk)))

export default store