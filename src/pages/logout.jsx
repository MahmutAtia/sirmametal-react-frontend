import React from "react";
import { useDispatch } from "react-redux";
import { login_failed } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="w-[700px] h-[700px] justify-center items-center mx-44">
      <img src="https://t4.ftcdn.net/jpg/01/43/95/15/360_F_143951504_fQjhL1o8iFzsfrAb9d3tGcUYKWiuefv9.jpg" />
      <h1>Are you sure you want to logout?</h1>
      <Button
        onClick={() => {
          dispatch(login_failed());
          navigate("/auth/company");
        }}
      >
      
        Yes
      </Button>

      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        No
      </Button>
    </div>
  );
}
