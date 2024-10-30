import { Middleware, combineSlices, configureStore } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./burger-ingredients";
import { constructorIngredientsSlice } from "./burger-constructor";
import { ingredientDetailsSlice } from "./ingredient-details";
import { orderDetailsSlice } from "./order-details";
import { authSlice } from "./auth";
import { feedSlice, wsFeedError, wsFeedMessage, } from "./feed/feed-slice";
import { socketFeedMiddleware } from "./feed/socket-feed-middleware";
import { wsFeedConnect, wsFeedDisconnect } from "./feed/actions";
import {  profileFeedSlice, wsProfileFeedError, wsProfileFeedMessage } from "./profile-feed/profile-feed-slice";
import {wsProfileFeedConnect, wsProfileFeedDisconnect } from "./profile-feed/actions";
import { socketProfileFeedMiddleware } from "./profile-feed/socket-profile-feed-middleware";

const rootReducer = combineSlices(
   ingredientsSlice,
   constructorIngredientsSlice,
   ingredientDetailsSlice,
   orderDetailsSlice,
   authSlice,
   feedSlice,
   profileFeedSlice,
);

const feedMiddleware: Middleware = socketFeedMiddleware({
   connect: wsFeedConnect,
   disconnect: wsFeedDisconnect,
   onError: wsFeedError,
   onMessage: wsFeedMessage
})

const ordersMiddleware: Middleware = socketProfileFeedMiddleware({
   connect: wsProfileFeedConnect,
   disconnect: wsProfileFeedDisconnect,
   onError: wsProfileFeedError,
   onMessage: wsProfileFeedMessage,
}, true)

export const store = configureStore({
   reducer: { root: rootReducer },
   middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat(feedMiddleware, ordersMiddleware)
   },
});