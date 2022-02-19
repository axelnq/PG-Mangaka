import React from "react";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postCheckout,getUserInfo } from "../Actions";

export default function CheckoutForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);
  const { id } = useParams();

  const [input,setInput] = useState({
    coins:Number,
    id:Number,
    cbu:'',
    alias:'',
  })
  
}

//cambio
            
             


