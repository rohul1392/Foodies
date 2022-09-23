import axios, { Axios } from "axios";
import { useSelector, useDispatch } from "react-redux";


const Paybutton = (items) =>{
    const userstate = useSelector((state) => state.loginUserReducer);
    const { currentUser } = userstate;

    const handleCheckout = () => {
        axios.post(`/api/stripe/create-checkout-session`,{
            items,
            userId: currentUser._id ? currentUser._id : Math.random().toString(36).substring(2,7)
        })
        .then((res)=>{
            if (res.data.url) {
                window.location.href = res.data.url
            }
        })
        .catch((err) => console.log(err.message))
    };
    return (
        <>
            <button className="m-10 w-100" onClick={()=>handleCheckout()} variant='primary' style={{borderRadius: '50px', padding:'2px'}}>
                Checkout
            </button>
        </>
    )
}

export default Paybutton;