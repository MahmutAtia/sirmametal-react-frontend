import React, { useEffect } from "react";
import axios from "axios";
import { Link, Navigate, useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import useFetchAxios from "../hoocs/useFetchAxios";

// importing lazy components
import { Suspense, lazy } from "react";

const Table = React.lazy(() => import("../components/myTable"));

export default function Home() {
  const [companies, setCompaies] = useState([]);
  const [countries, setCountries] = useState([]);
  const [contactTypes, setContactTypes] = useState([]);
  const [contactResults, setContactResults] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  // navigate
  const navigate = useNavigate();
  //redux
  const jwt = useSelector((state) => state.user.access); // it wiil be a problem if jwt access is expired

 //set image url
  const imgUrl = localStorage.getItem("img"); // logo

  useEffect(() => {
    // get all companies

    // set data base url
    const url = localStorage.getItem("url"); // logo


    // if url is null navigate to auth
    if (url === null) {navigate("/auth/company")}
  

    const endpoint = url + "api/companies/";

    axios
      .get(endpoint, { headers: { Authorization: `JWT ${jwt}` } })
      .then((res) => {
        setCompaies(res.data.results || []);
      })
      .catch((err) => {
        console.log(err);
      });

    // get all companies

    const resultEndpoint = url + "api/companies/contact_result";

    axios
      .get(resultEndpoint, { headers: { Authorization: `JWT ${jwt}` } })
      .then((res) => {
        setContactResults(res.data.results || []);
      })
      .catch((err) => {
        console.log(err);
      });

    const countryEndpoint = url + "api/companies/country";

    axios
      .get(countryEndpoint, { headers: { Authorization: `JWT ${jwt}` } })
      .then((res) => {
        setCountries(res.data.results || []);
      })
      .catch((err) => {
        console.log(err);
      });

    const contactEndpoint = url + "api/companies/contact_type";

    axios
      .get(contactEndpoint, { headers: { Authorization: `JWT ${jwt}` } })
      .then((res) => {
        setContactTypes(res.data.results || []);
      })
      .catch((err) => {
        console.log(err);
      });

    // loading
    setIsLoading(false);
  }, []);

  return (
    <Suspense
      fallback={
        <div className=" w-[100%] h-[700px] flex flex-column justify-center  items-center ">
          <img
            className="  w-[50%] m-auto  p-20 shadow-sm shadow-blue-100"
            src={imgUrl}
          />
        </div>
      }
    >
      <Table
        tableData={companies}
        setTableData={setCompaies}
        states={countries}
        contactType={contactTypes}
        contactResult={contactResults}
      />
    </Suspense>
  );
}

// export const companyLouder = async ()=>{

//   // get all companies
//   try {
//     const url = "http://127.0.0.1:8000/api/companies/";
//     const res = await axios.get(url, {headers: {Authorization: `JWT ${jwt}`}}) // it wiil be a problem if jwt access is expired

//   // get all contries
//   const countryUrl = "http://127.0.0.1:8000/api/companies/country";
//   const countryRes = await axios.get(countryUrl)

//    // get all contact_type
//    const contactTypeUrl = "http://127.0.0.1:8000/api/companies/contact_type";
//    const contactType = await axios.get(contactTypeUrl)

//     // get all contactResult
//   const contactResultUrl = "http://127.0.0.1:8000/api/companies/contact_result";
//   const contactResult = await axios.get(contactResultUrl)

//   return [res.data.results || [],  countryRes.data.results || [],contactType.data.results || [] ,contactResult.data.results || [] ]

//   } catch (error) {
//     alert(error)
//     return [ [],   [], [] , [] ]
//   }
// }
