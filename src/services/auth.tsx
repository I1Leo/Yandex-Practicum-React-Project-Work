import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { login, logout, setUser, updateUser } from "./api"

type initialStateType = {
   user: UserType | null
   isAuthChecked: boolean
}

export type UserType = {
   name: string
   email: string
}


const initialState: initialStateType = {
   user: null,
   isAuthChecked: false
}


export const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
         state.isAuthChecked = action.payload
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(setUser, (state, action) => {
            const user = action.payload as UserType;
            state.user = user;
            
         })
         .addCase(updateUser.fulfilled, (state, action) => {
            const user = action.payload.user as UserType;
               state.user = user;

         })
         .addCase(login.fulfilled, (state, action) => {
            const user = action.payload.user as UserType;
            state.user = user;
            state.isAuthChecked = true;
         })
         .addCase(logout.fulfilled, (state) => {
            state.user = null;
         })
   },
})

export const { setIsAuthChecked } = authSlice.actions;