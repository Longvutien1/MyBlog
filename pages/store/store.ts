import { configureStore } from '@reduxjs/toolkit'
import  postSlide  from '../features/product/productSlide'
// import PostSlide from '../features/product/productSlide'

export const store = configureStore({
  reducer: {
    post: postSlide,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch