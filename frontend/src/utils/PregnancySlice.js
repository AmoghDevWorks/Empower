import { createSlice } from "@reduxjs/toolkit";

const  PregnancySlice = createSlice({
    name:'pregnancyData',
    initialState:null,
    reducers:{
        AddPregnancyData:(state,action)=>{
            return action.payload
        },
        removePregnancyData:(state)=>{
            return null
        }
    }
})


export const {AddPregnancyData,removePregnancyData} = PregnancySlice.actions;
export default PregnancySlice.reducer;