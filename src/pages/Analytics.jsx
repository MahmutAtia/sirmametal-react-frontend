import React, { useEffect, useState } from "react";
import axios from "axios";

//Charts
import { RenderBarChart } from "../components/charts/barchart";
import { RenderLineChart } from "../components/charts/linechart";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { CustomPieChart } from "../components/charts/peichart";
import { RenderBarChartY } from "../components/charts/barchartY";

export default function Analytics() {
  //states

  // analytics data
  const [data, setData] = useState({});

  // users data
  const [users, setUsers] = useState([]);

  // Louding
  const [isLoading, setIsLoading] = useState(true);

  // days to subtract
  const [daysToSubtract, setdaysToSubtract] = useState(7);

  // get user id
  const [user_id, setuser_id] = useState(0);

  //redux jwt
  const jwt = useSelector((state) => state.user.access);

  // set image url
  const imgUrl = localStorage.getItem("img");

  // IS USER STAFF
  const is_staff = useSelector((state) => state.user.user?.is_staff);

  // use Effect when page is loaded
  useEffect(() => {
    //local storge url
    const url = localStorage.getItem("url");

    // define url
    const endpoint =
      url + "api/companies/analitics/" + daysToSubtract + "/" + user_id;

    // get data from server
    axios
      .get(endpoint, { headers: { Authorization: `JWT ${jwt}` } })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) =>
        alert("Error when fetching users data " + err.response.data)
      );

    // get users if staff
    if (is_staff) {
      const usersEndpoint = url + "auth/users/";
      axios
        .get(usersEndpoint, { headers: { Authorization: `JWT ${jwt}` } })
        .then((res) => {
          setUsers(res.data.results);
        })
        .catch((err) =>
          alert("Error when fetching Analytics data " + err.response.data)
        );
    }

    // set loading to false
    setIsLoading(false);
  }, [daysToSubtract, is_staff, user_id]);

  // colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return isLoading ? (
    <div className=" w-[100%] h-[700px] flex flex-column justify-center  items-center">
      <img
        className="  w-[50%] m-auto  p-20 shadow-sm shadow-blue-100"
        src={imgUrl}
      />
    </div>
  ) : (


    <div className="  w-[100%] h-[100%] items-center justify-evenly ">
      <h1 className="text-left text-6xl text-bold text-gray-500 p-5">Analytics</h1>
      <h1 className="text-left"></h1>


      {/* buttons row */}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <Button onClick={() => setdaysToSubtract(1)}>Today</Button>
          <Button
            onClick={() => {
              setdaysToSubtract(7);
            }}
          >
            last week
          </Button>
          <Button onClick={() => setdaysToSubtract(31)}>last month</Button>
          <Button onClick={() => setdaysToSubtract(90)}>last 3 monthes</Button>
          <Button onClick={() => setdaysToSubtract(0)}>All Time</Button>
        </div>

        {is_staff && (
          <div>
            <Button onClick={() => setuser_id(0)}>ALL</Button>
            {users?.map((user) => (
              <Button key={user.id} onClick={() => setuser_id(user.id)}>{user.name}</Button>
            ))}
          </div>
        )}
      </div>
      {/* First Row  */}

      <div className="flex flex-col justify-evenly">
        {/* column  */}
        <div className="flex flex-row">
          <Card className="m-5">
            <CardHeader
              title="Total Number Of Companies"
              subheader={
                daysToSubtract === 0
                  ? "All Time Contacted Company"
                  : daysToSubtract === 1
                  ? "Today Contacted Company"
                  : "Contacted Company Last " + daysToSubtract + " days"
              }
            />

            <Divider variant="middle" />

            <CardContent>
              <Typography fontSize={40} className="text-center text-gray-500 ">
                {data.NumOfCompanies}
              </Typography>
            </CardContent>
          </Card>

          <Card className="m-5 ">
            <CardHeader
              title="Total Number Of Contacts"
              subheader={
                daysToSubtract === 0
                  ? "All Time Number Of Contacts"
                  : daysToSubtract === 1
                  ? "Today Number Of Contacts"
                  : " Number Of Contacts Last " + daysToSubtract + " days"
              }
            />

            <Divider variant="middle" />

            <CardContent>
              <Typography fontSize={40} className="text-center text-gray-500 ">
                {data.NumOfContacts}
              </Typography>
            </CardContent>
          </Card>

          
        </div>

        {/* second column */}
        <div className="flex flex-row">

        {is_staff && user_id === 0 && (
            <Card className="m-5 ">
              <CardHeader
                title="Total Number Of Contacts"
                subheader={
                  daysToSubtract === 0
                    ? "All Time Number Of Contacts"
                    : daysToSubtract === 1
                    ? "Today Number Of Contacts"
                    : " Number Of Contacts Last " + daysToSubtract + " days"
                }
              />

              <Divider variant="middle" />

              <CardContent>
                {/* <CustomPieChart
                  data={data.ContactsByUser}
                  nameKey={"User"}
                  dataKey={"Contacts Count"}
                  w={550}
                  h={750}
                  inR={80}
                  outR={100}
                /> */}

                <RenderBarChart
                  data={data.ContactsByUser}
                  labels={"User"}
                  values={"Contacts Count"}
                  w={300}
                  h={300}
                />
              </CardContent>
            </Card>
          )}
          

        <Card className="m-5">
          <CardHeader
            title="Contacts' Results"
            subheader={
              daysToSubtract === 0
                ? "All Time Contacts' Results"
                : daysToSubtract === 1
                ? "Today Contacts' Results"
                : "Contacts' Results Last " + daysToSubtract + " days"
            }
          />

          <Divider variant="middle" />

          <CardContent className="">
          <RenderBarChart
          data={data.ContactResultCount}
          labels={"result"}
          values={"result_count"}
          w={900}
          h={700}
        />
          </CardContent>
        </Card>
        </div>
      </div>

      <div className="flex flex-row justify-stretch">
        <Card className="m-5">
          <CardHeader
            title="Contact Methods"
            subheader={
              daysToSubtract === 0
                ? "All Time Contact Methods"
                : daysToSubtract === 1
                ? "Today Contact Methods"
                : "Contact Methods Last " + daysToSubtract + " days"
            }
          />

          <Divider variant="middle" />

          <CardContent>
            <RenderBarChart
              data={data.ContactTypeCount}
              labels={"contact_type"}
              values={"contact_count"}
              w={350}
            />
          </CardContent>
        </Card>

        <Card className="m-5">
          <CardHeader
            title="Contact Counts By Date"
            subheader={
              daysToSubtract === 0
                ? "All Time Contact Counts By Date"
                : daysToSubtract === 1
                ? "Today Contact Counts By Date"
                : "Contact Counts By Date Last " + daysToSubtract + " days"
            }
          />

          <Divider variant="middle" />

          <CardContent>
            <RenderLineChart
              data={data.ContactCountDataSeries}
              labels={"Date"}
              values={"Number Of Contacts"}
              w={650}
            />
          </CardContent>
        </Card>
      </div>

      {/* third row  */}
      <div className="flex flex-row justify-evenly">
        <Card className="m-5">
          <CardHeader
            title="Contacted Companies By Country
          "
            subheader={
              daysToSubtract === 0
                ? "All Time Contacted Companies By Country"
                : daysToSubtract === 1
                ? "Today Contacted Companies By Country"
                : "Contacted Companies By Country Last " +
                  daysToSubtract +
                  " days"
            }
          />

          <Divider variant="middle" />

          <CardContent>
            {/* <RenderBarChartY
              data={data.CountryToConmpny}
              labels={"country"}
              values={"company_count"}
              w={750}
              h={750}
            /> */}

            <RenderBarChart
              data={data.CountryToConmpny}
              labels={"country"}
              values={"company_count"}
              w={1150}
            />
          </CardContent>
        </Card>
      </div>
      {/*
      
       <RenderBarChartY
              data={data.CountryToConmpny}
              labels={"country"}
              values={"company_count"}
              w={900}
              h={400}
            />
      
      
      
      <RenderBarChart
          data={data.CountryToConmpny}
          labels={"country"}
          values={"company_count"}
          w={700}
        />
        <RenderBarChart
          data={data.ContactTypeCount}
          labels={"contact_type"}
          values={"contact_count"}
          w={700}
        />
        <RenderBarChart
          data={data.ContactResultCount}
          labels={"result"}
          values={"result_count"}
          w={900}
        />

        <RenderLineChart
          data={data.ContactCountDataSeries}
          labels={"Date"}
          values={"Number Of Contacts"}
          w={900}
        /> */}
    </div>
  );
}
