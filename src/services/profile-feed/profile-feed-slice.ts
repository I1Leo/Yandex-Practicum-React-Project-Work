import { Action, PayloadAction, createSlice } from "@reduxjs/toolkit"
import { TFeed, TFeedOrder, TFeedResponse } from "../../components/types/feed";
import { getOrderByNumber } from "../api";



type TInitialState = {
   orders: TFeedResponse | null,
   connectionError: string | null,
   currentOrder: TFeedOrder | null,
   orderByNumberRequest: boolean,
	orderByNumberFailed: boolean,
}

export const initialState: TInitialState = {
   orders: null,
   connectionError: null,
   currentOrder: null,
   orderByNumberRequest: false,
	orderByNumberFailed: false,
}

export const profileFeedSlice = createSlice({
   name: "profileFeed",
   initialState,
   reducers: {
      wsProfileFeedError: (state, action: PayloadAction<string>) => {
         state.connectionError = action.payload;
      },
      wsProfileFeedMessage: (state, action: PayloadAction<TFeedResponse>) => {
         state.orders= action.payload;
      },
      setCurrentOrder: (state, action: PayloadAction<TFeedOrder>) => {
         state.currentOrder = action.payload
      }
   },
   extraReducers: (builder) => {
		builder
			.addCase(getOrderByNumber.pending, (state) => {
				state.orderByNumberRequest = true;
				state.orderByNumberFailed = false;
			})
			.addCase(
				getOrderByNumber.fulfilled,
				(state, action ) => {
               const order = action.payload.orders[0] as TFeedOrder;
               console.log(order)
               state.orderByNumberRequest = false;
					state.currentOrder = order;
				}
			)
			.addCase(getOrderByNumber.rejected, (state) => {
				state.orderByNumberRequest = false;
				state.orderByNumberFailed= true;
			});
	},
   selectors: {
      getOrders: state => state.orders
   }
})

export const { wsProfileFeedError, wsProfileFeedMessage, setCurrentOrder } = profileFeedSlice.actions;
export const { getOrders } = profileFeedSlice.selectors;