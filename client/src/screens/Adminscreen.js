

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

import Orderslist from "./Orderslist";
import Userslist from "./Userslist";
import Foodslist from "./Foodslist";
import Addfood from "./Addfood";
import Editfood from "./Editfood";


export default function Adminscreen() {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser.isAdmin) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      <div className="row justify-content-center p-3">
        <div className="col-md-10">
          <h2 style={{ fontSize: "35px", textAlign: "center" }}>Admin Panel</h2>

          <ul className="adminfunctions">
            <li>
              <Link to={'/admin/userslist'} style={{color: 'white'}}>Users List</Link>
            </li>
            <li>
            <Link to={'/admin/foodslist'} style={{color: 'white'}}>Food List</Link>
            </li>
            <li>
            <Link to={'/admin/addfood'} style={{color: 'white'}}>Add Food</Link>
            </li>
            <li>
            <Link to={'/admin/orderslist'} style={{color: 'white'}}>Orders List</Link>
            </li>
          </ul>


          <Routes>
              <Route path="/" element={<Userslist />}/>
              <Route path="/userslist" element={<Userslist />}/>
              <Route path="/orderslist" element={<Orderslist />}/>
              <Route path="/foodslist" element={<Foodslist />}/>
              <Route path="/addfood" element={<Addfood />}/>
              <Route path="/editfood/:foodid" element={<Editfood />}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}
           
          

