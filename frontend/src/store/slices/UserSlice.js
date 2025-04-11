import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    user:null,
    vehicles:null
}
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload  
        },
        deleteUser :(state)=>{
            state.user=null
        },
        setVehicles :(state,action)=>{
            state.vehicles = action.payload;
        },
        deleteVehicles:(state)=>{
            state.vehicles=[]
        },
        updateVehicles:(state,action)=>{
            state.vehicles.push(action.payload)
        }
    }
})

export const {setUser,deleteUser,deleteVehicles,setVehicles,updateVehicles} = userSlice.actions

export default userSlice.reducer