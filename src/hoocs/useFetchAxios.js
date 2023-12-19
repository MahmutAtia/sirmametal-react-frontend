import React, { useState , useEffect} from 'react'
import axios from 'axios';



//redux
import { useSelector } from 'react-redux';


export default function useFetchAxios(endpoint) {
    const [data, setData] = useState([])
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(true)

    const jwt = useSelector(state => state.user.access) // it wiil be a problem if jwt access is expired



    useEffect(() => {

        const url = "http://127.0.0.1:8000/api/companies/" + endpoint;

        axios.get(url, {headers: {Authorization: `JWT ${jwt}`}}).then((res) => {
            setData(res.data.results || [])
        }).catch(err => {
            setErr(err)
        })

        setLoading(false)




    }, [])

    


    return [data, err, loading]


}



export const usePostAxios = (endpoint,obj)=> {
    
    const [err, setErr] = useState("")


    const url = "http://127.0.0.1:8000/api/companies/" + endpoint;


    axios.post(url, obj)
    .then(res => { 
        console.log(res) 

    }).catch(err => {
        setErr(err.response.data)
    })



    return [err]


}
