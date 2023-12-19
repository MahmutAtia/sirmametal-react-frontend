import axios from 'axios'
import React from 'react'
import { useLoaderData, useNavigate, useNavigation, useParams } from 'react-router-dom'

export default function Company() {
    // hooks
    const data = useLoaderData()
    const{ id} = useParams()
    const navigate = useNavigation()
    console.log(navigate.state )
    if (navigate.state === "loading") return (<h1> loading ...</h1>)
  return (
    <div>
       { 
       data.map((obj,index)=>{
        return(<h1>{obj.contact_type}</h1>)
       }) }
    <h1>{id}</h1>
    </div>
  )
}


export const detailLoader = async({params})=>{
    
    const {id} = params
    const url = "http://127.0.0.1:7000/api/companies/company/"+ id
    const res = await axios.get(url)
    
    return res.data.results
}