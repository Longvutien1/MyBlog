import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';

export const getListPost:any = createAsyncThunk(
  "post/getListPost",
   async (index:number) => {
     try {
      const {data} = await axios.get(`http://localhost:3000/api/post?skip=${index}`);
      return data
     } catch (error) {
      console.log(error);
      
     }
  }
)
// export const getListPostBySearchTitle:any = createAsyncThunk(
//   "post/getListPostBySearchTitle",
//    async (search:number) => {
//      try {
//       const {data} = await axios.get(`http://localhost:3000/api/post?title=${search}`);
//       return data
//      } catch (error) {
//       console.log(error);
      
//      }
//   }
// )

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
    "post/add",
    async (product:any) => {
        
    }
)

export const postSlide = createSlice({
  name: 'post',
  initialState:{
    value:[]
  },
  reducers: {
 
  },
  extraReducers: (builer) =>{ 

    builer.addCase(getListPost.fulfilled, (state, action) => {
        state.value = action.payload;
    })
//     builer.addCase(getListPostBySearchTitle.fulfilled, (state, action) => {
//       state.value = action.payload;
//   }),
//   builer.addCase(getListPostByCategoryPost.fulfilled, (state, action) => {
//     state.value = action.payload;
// })
  
  }
})


export default postSlide.reducer