import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';

export const getUser:any = createAsyncThunk(
  "user/getUser",
   async () => {
     try {
      const { data } = await axios.get(`http://localhost:3000/api/auth/signin`)
      return data
     } catch (error) {
      console.log(error);
      
     }
  }
)
export const login:any = createAsyncThunk(
  "user/login",
   async (user:any) => {
     try {
      const {data} = await axios.post(`http://localhost:3000/api/auth/signin`,user);
      return data
     } catch (error) {
      console.log(error);
      
     }
  }
)

// export const getListPostByCategoryPost:any = createAsyncThunk(
//   "post/getListPostByCategoryPost",
//    async (categoryPost:string) => {
//      try {
//       const {data} = await axios.get(`http://localhost:3000/api/post?categoryPost=${categoryPost}`);
//       return data
//      } catch (error) {
//       console.log(error);
      
//      }
//   }
// )


export const addProduct:any = createAsyncThunk(
    "user/add",
    async (product:any) => {
        
    }
)

export const userSlice = createSlice({
  name: 'user',
  initialState:{
    value:[]
  },
  reducers: {
 
  },
  extraReducers: (builer) =>{ 

    builer.addCase(getUser.fulfilled, (state, action) => {
        state.value = action.payload;
    })
    builer.addCase(login.fulfilled, (state:any, action) => {
        state.value = [...state.value, action.payload]
  })
//   builer.addCase(getListPostByCategoryPost.fulfilled, (state, action) => {
//     state.value = action.payload;
// })
  
  }
})


export default userSlice.reducer