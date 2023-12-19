import { createSlice } from '@reduxjs/toolkit';

const initState = {
    url: null
}


const exportcompanySlice = createSlice({
    name: "exportcompany",
    initialState: initState,
    reducers: {
        setUrl: (state, action) => {
            state.url = action.payload
        }
    }

})

export const { setUrl } = exportcompanySlice.actions
export default exportcompanySlice