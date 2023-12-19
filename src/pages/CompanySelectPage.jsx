import React from "react";

import { Avatar } from "@mui/material";

// react router dom
import { useNavigate } from "react-router-dom";

//react-slidy
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import CompanyAvatar from "../components/CompanyAvatar";

export default function CompanySelectPage() {
  const navigate = useNavigate();

  return (
    <div className="mt-44 mx-auto p-10">
     <Slide   slidesToScroll={1} slidesToShow={3} indicators={true} >
         
    <CompanyAvatar handleClick={()=>{
      localStorage.setItem("url", process.env.REACT_APP_COMPANY2_URL);
      localStorage.setItem(
        "img",
        "https://assets.materialup.com/uploads/3ec8a09d-a55c-400d-8dad-827836b116de/preview.jpg"
      );
      navigate("/auth/login")
      }}
    
    src={"https://assets.materialup.com/uploads/3ec8a09d-a55c-400d-8dad-827836b116de/preview.jpg"}
    alt={"Company 1"}
    className={"hover:shadow-lg hover:shadow-gray-500 hover:w-52 hover:h-52"}
    />


<CompanyAvatar handleClick={()=>{
      localStorage.setItem("url", process.env.REACT_APP_SIRMA_URL);
      localStorage.setItem(
        "img",
        "https://www.sirmametal.com/wp-content/uploads/2019/12/sirmalogo.png"
      );
      navigate("/auth/login")

    }}
    
    src={"https://media.licdn.com/dms/image/C4E0BAQGP3MLKjGmVFg/company-logo_200_200/0/1614094842842?e=2147483647&v=beta&t=3cgoFrdhuZi-GvB7yxz89z_LgubnWQi8n5lt-yEd5U4"}
    alt={"Sirma Metal"}
    className={"hover:shadow-lg hover:shadow-gray-500 hover:w-52 hover:h-52"}
    />
      


      
<CompanyAvatar handleClick={()=>{
      localStorage.setItem("url", process.env.REACT_APP_DEMO_URL);
      localStorage.setItem(
        "img",
        "https://queencity3d.com/wp-content/uploads/2020/05/demo-logo.jpg"
      );
      navigate("/auth/login")

    }}
    
    src={"https://queencity3d.com/wp-content/uploads/2020/05/demo-logo.jpg"}
    alt={"Demo Company"}
    className={"hover:shadow-lg hover:shadow-gray-500 hover:w-52 hover:h-52"}
    />


        
        </Slide>
        </div>
  );
}
