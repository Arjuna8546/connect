import { createSlice } from "@reduxjs/toolkit"

const initialState={
    admin:null
}

const AdminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{
        setAdmin:(state,action)=>{
            state.admin=action.payload
        },
        deleteAdmin:(state)=>{
            state.admin=null
        },
    }
})

export const {setAdmin,deleteAdmin} = AdminSlice.actions

export default AdminSlice.reducer