export const placeOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case 'PLACE_ORDER_REQUEST': return {
            loading: true,
        }
        case 'PLACE_ORDER_SUCCESS': return {
            loading: false,
            success: true
        }
        case 'PLACE_ORDER_FAILED': return {
            loading: false,
            error: action.payload
        }
        default : return state
    }
}

export const takeoutOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case 'TAKEOUT_ORDER_REQUEST': return {
            loading: true,
        }
        case 'TAKEOUT_ORDER_SUCCESS': return {
            loading: false,
            success: true
        }
        case 'TAKEOUT_ORDER_FAILED': return {
            loading: false,
            error: action.payload
        }
        default : return state
    }
}

export const getUserOrdersReducer = (state = { orders: []} , action) => {
    
    switch(action.type) {
        case 'GET_USERORDERS_REQUEST' : return{
            loading: true,
            ...state
        }
        case 'GET_USERORDERS_SUCCESS' : return{
            loading: false,
            orders: action.payload
        }
        case 'GET_USERORDERS_FAILURE' : return{
            error: action.payload,
            loading: false
        }
        default : return state
    }
}

export const getAllOrdersReducer=(state={orders : []} , action)=>{

    switch(action.type)
    {
        case 'GET_ALLORDERS_REQUEST' : return{
            loading : true,
            ...state
        }
        case 'GET_ALLORDERS_SUCCESS' : return{
            loading : false ,
            orders : action.payload.data,
            currentPage : action.payload.currentPage,
            numberOfPages : action.payload.numberOfPages
        }
        case 'GET_ALLORDERS_FAILED' : return{
            error : action.payload ,
            loading : false
        }
        default : return state
    }

}