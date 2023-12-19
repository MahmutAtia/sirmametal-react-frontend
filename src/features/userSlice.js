import { Build } from '@mui/icons-material';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'


const initState = {
    access: localStorage.getItem("access"),
    refresh: localStorage.getItem("refresh"),
    isAuthenticated: "NA",
    user: null,
    error: null
}

export const login = createAsyncThunk("user/login", async (data) => {
    const url = "http://127.0.0.1:8000/auth/";
    const config = { headers: { "Content-Type": "application/json" } }
    const body = JSON.stringify(data);




 
        const res = await axios.post(`${url}jwt/create/`, body, config)
        console.log(res.data)

        return res.data

  

})

export const loadUser = createAsyncThunk("user/loadUser", async (data) => {
    if (localStorage.getItem("access")) {
        console.log("i am working")
        const url = "http://127.0.0.1:8000/auth/";
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "JWT " + localStorage.getItem("access"),
                "Accept": "application/json"
            }
        }

        try {
            const res = await axios.get(`${url}users/me/`, config)
            console.log(res.data)

            return res.data

        } catch (err) {
            console.log(err)
        }



    }


})


export const checkAuthenticated = createAsyncThunk("user/checkAuthenticated", async (data) => {
    
    if (localStorage.getItem("access")) {


        const url = "http://127.0.0.1:8000/auth/";
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
        const body = JSON.stringify({ token: localStorage.getItem("access") })
        const res = await axios.post(`${url}jwt/verify/`, body, config)


        if (res.data.code !== "token_not_valid") {
            console.log("token_valid")
            return true
        } else {
            return false
        }
        console.log(res.data)

    }

})





const userSlice = createSlice({
    name: "user",
    initialState: initState,
    reducers: {
        login_success: (state, action) => {
            localStorage.setItem("access", action.payload.access)
            localStorage.setItem("refresh", action.payload.refresh)
            state.isAuthenticated = true
            state.access = action.payload.access
            state.refresh = action.payload.refresh

        }, // assignment not returning
        login_failed: (state, action) => {
            localStorage.removeItem("access")
            localStorage.removeItem("refresh")
            state.isAuthenticated = false
            state.access = null
            state.refresh = null
            state.user = null

        },
        load_user_success: (state, action) => {
            state.user = action.payload
        },
        load_user_failed: state => {
            state.user = null
        },
        auth_faild: state => { state.isAuthenticated = false },
        auth_suc: state => { state.isAuthenticated = true }
    },
    extraReducers: bulider => {
        bulider.addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("access", action.payload.access)
            localStorage.setItem("refresh", action.payload.refresh)
            state.isAuthenticated = true
            state.access = action.payload.access
            state.refresh = action.payload.refresh


        })
        bulider.addCase(login.rejected, (state, action) => {

            localStorage.removeItem("access")
            localStorage.removeItem("refresh")
            state.isAuthenticated = "not working"
            state.access = null
            state.refresh = null
            state.user = null
            state.error= action.payload
            alert("invalid email or password")

        })
      

        bulider.addCase(loadUser.fulfilled, (state, action) => {
            state.user = action.payload
        })

        bulider.addCase(loadUser.rejected, (state) => {
            state.user = null
        })

        bulider.addCase(checkAuthenticated.fulfilled, (state, action) => {
            state.isAuthenticated = action.payload
        })

        bulider.addCase(checkAuthenticated.rejected, (state) => {
            state.isAuthenticated = false
        })

    }
})

export default userSlice
export const { login_success, login_failed, load_user_failed, load_user_success, auth_faild, auth_suc } = userSlice.actions;