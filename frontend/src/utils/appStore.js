import {configureStore} from "@reduxjs/toolkit"
import UserReducer from './UserSlice'
import PregnancySlice from './PregnancySlice'

const appStore = configureStore(
    {
        reducer:{
            user:UserReducer,
            pregnancy:PregnancySlice
        }
    }
)

export default appStore